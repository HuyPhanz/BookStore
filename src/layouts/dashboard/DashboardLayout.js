import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Footer from "../../pages/Footer";
import {useAuth} from "../../hooks/useRoute";
import Nav from "./nav";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const {user} = auth;
  return (
    <StyledRoot>
      {user.userName === 'admin' ? (
        <Nav openNav={open} onCloseNav={() => setOpen(false)}/>
      ) : (
        <Header onOpenNav={() => setOpen(true)}/>
      )}

      <Main>
        <Outlet />
        {user.userName === 'admin' ? (
          null
          ) : (
            <Footer/>
        )}
      </Main>
    </StyledRoot>
  );
}
