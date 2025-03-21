import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { collection, getDocs, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { MdDelete } from "react-icons/md";
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteFromFirebase } from '../redux/slices/transactionsSlice'
import { useAuthState } from 'react-firebase-hooks/auth';

function TableOfIncomesAndExpenses() {


    // Tablolardaki filtreleme mantigi su sekilde, asagidaki field icerisindeki yazili kisim ile data'dan gelen key'ler eslesiyorsa filtreleme gerceklesir, yani field:'type' ve data'dan gelen veri type:'Gelir' buradaki key ==> "type" tir. 

    const columns = [
        { field: 'type', headerName: 'Tür', width: 200, editable: true },       // editable:true ==> hucrelerin guncellenebilir olmasini saglar
        { field: 'category', headerName: 'Kategori', width: 200, editable: true },
        { field: 'amount', headerName: 'Miktar', width: 200, editable: true },
        { field: 'date', headerName: 'Tarih', width: 200, editable: true },
        { field: 'description', headerName: 'Açıklama', width: 300, editable: true },
        {
            field: 'delete',
            headerName: 'Silme',
            width: 150,                          // renderCell yerine "getActions" da kullanilabilir !!!
            renderCell: (params) => (           // renderCell ==> Bir fonksiyon olarak tanımlanır ve bu fonksiyon, her bir hücre için çağrılır ayrica hucre ile ilgili bilgileri iceren "params" nesnesi alir. Her bir hucre icin ozel icerik olusturmamizi saglar. Ornegin bir hucrede bir buton, ikon veya React bileseni gostermek istedigimizde kullaniriz.
                <IconButton color="error" onClick={() => handleDelete(params.id)}>          {/* parametre olan "params" secili hucreye ait bilgileri alir */}
                    <MdDelete />
                </IconButton>
            )

        }
    ];

    // const rows = [
    //     { id: 1, type: 'Gelir', amount: 1000, date: '2025-07-03', description: 'Maas' },
    //     { id: 2, type: 'Gider', amount: 400, date: '2025-02-02', description: 'Giyim' },
    //     { id: 3, type: 'Gelir', amount: 1850, date: '2025-10-01', description: 'Proje yatirim' },
    //     { id: 4, type: 'Gider', amount: 750, date: '2025-10-05', description: 'Ulasim' },
    //     { id: 5, type: 'Gelir', amount: 1000, date: '2025-06-08', description: 'Maas' },
    //     { id: 6, type: 'Gelir', amount: 4500, date: '2025-04-02', description: 'Satis' },
    //     { id: 7, type: 'Gelir', amount: 400, date: '2025-02-01', description: 'Kiyafet Satis' },
    //     { id: 8, type: 'Gider', amount: 2200, date: '2025-09-05', description: 'Kira' }
    // ]

    const [data, setData] = useState([]);

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const [user] = useAuthState(auth);      // useAuthState ==> bu hook, oturum açmış olan kullanıcının durumunu izler. Kullanici oturum acip,kapattiginda veya oturum durumu degistiginde bu hook otomatik guncellenir

    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        try {

            await dispatch(deleteFromFirebase(id)).unwrap();
            setData((currentData) => currentData.filter((row) => row.id !== id));

            setSnackbar({ children: 'Row successfully deleted', severity: 'success' })
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const incomesRef = collection(db, 'users', user.uid, 'incomes');
                const expensesRef = collection(db, 'users', user.uid, 'expenses');

                const incomesSnapshot = await getDocs(incomesRef);     // firestore'dan bilgileri cektik
                const expensesSnapshot = await getDocs(expensesRef);

                const incomesData = incomesSnapshot.docs.map(doc => ({
                    id: doc.id, ...doc.data(), type: 'Gelir'
                }));

                const expensesData = expensesSnapshot.docs.map(doc => ({
                    id: doc.id, ...doc.data(), type: 'Gider'
                }));

                setData([...incomesData, ...expensesData]);
            }

        }

        fetchData();
    }, [user])

    // satir guncellendiginde calisacak kisim
    const handleProcessRowUpdate = async (newRow, oldRow) => {      // yandaki callback fonksiyon 2 parametre aliyor, ilki guncellenmis deger ikincisi de orjinal degeri. Amaci ise sonrasinda verileri karsilastirmamiza yarar 
        try {
            console.log("Güncellenen veri:", newRow);

            const collectionName = newRow.type === 'Gelir' ? 'incomes' : 'expenses';
            const docRef = doc(db, 'users', user.uid, collectionName, newRow.id);      // doc ==> ile belirli bir koleksiyon icindeki belli bir dokumani hedef aliriz.

            // Firestore'da böyle bir belgenin kontrolunu yapariz
            const docSnap = await getDoc(docRef);                   // getDoc ==> Firestore'da belirli bir belgeyi (document) almak için kullaniriz.
            if (!docSnap.exists()) {            // belge varsa "true" yoksa "false" doner 
                throw new Error(`Firestore'da ID'si ${newRow.id} olan belge bulunamadı!`);
            }

            await updateDoc(docRef, {
                type: newRow.type || '',        // type degeri varsa onu yoksa bos string dondur
                amount: Number(newRow.amount) || 0,
                date: newRow.date || '',
                category: newRow.category || '',
                description: newRow.description || ''
            });

            setSnackbar({ children: 'User successfully saved', severity: 'success' });      // kullaniciyiya islemin basari turune gore mesaj dondurecek
            console.log("Firestore güncellendi:", newRow);

            return { ...newRow };
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    };


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box style={{ height: '400', width: '80%', }}>
                    <DataGrid rows={data} columns={columns} slots={{ toolbar: GridToolbar }} processRowUpdate={handleProcessRowUpdate} onProcessRowUpdateError={(error) => console.error("MUI X Error:", error)}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,


                            },

                        }}
                    />

                    {!!snackbar && (
                        <Snackbar
                            open
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            onClose={handleCloseSnackbar}
                            autoHideDuration={3000}
                        >
                            <Alert {...snackbar} onClose={handleCloseSnackbar} />
                        </Snackbar>
                    )}
                </Box>
            </div>

        </>
    )
}

export default TableOfIncomesAndExpenses