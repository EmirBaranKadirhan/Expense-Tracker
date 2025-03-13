import { useState } from 'react'
import './App.css'
import Home from '../src/pages/Home'
import GelirGiderEkle from './pages/GelirGiderEkle'
import RouterConfig from './config/RouterConfig'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { IoHomeSharp } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaChartPie } from "react-icons/fa";
import { TbTransfer } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import IncomesAndExpenses from './pages/IncomesAndExpenses'


function App() {

  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const handleDrawerOpen = () => {                 // drawer kontrolunu burada yaptik
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const icons = [<IoHomeSharp />, <FaMoneyBillTransfer />, <FaChartPie />, <TbTransfer />]    // iconlari burada tanimladik asagida map fonksiyonu ile donup eslestirdik

  const paths = ["/", "gelirGiderEkle", "balanceChart", "incomesAndExpenses"]   // url yollarini listede topladik asagida ilgili yerde kullandik

  return (
    <>
      <RouterConfig />

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                open && { display: 'none' },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Menu
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: 250,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Anasayfa', 'Gelir Gider Ekle', 'Bilanco Grafik', 'Hesap Hareketleri'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={NavLink} to={paths[index]}>      {/* NavLink tum ozelliklerini buraya vermis olduk */}
                  <ListItemIcon>
                    {icons[index]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box >
    </>
  );
}

export default App
