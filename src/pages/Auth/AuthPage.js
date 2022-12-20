// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// hooks
import {useParams} from "react-router-dom";
// sections
import axios from "axios";
import {ChangePasswordForm, LoginForm, RegisterForm} from '../../sections/auth/login';
import {useAuth} from "../../hooks/useRoute";
import {AUTH_PATH} from "../../const/API";

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  background: 'white',
  margin: theme.spacing(20, 0),
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2, 2),
  borderRadius: '10px'
}));

// ----------------------------------------------------------------------

export default function AuthPage() {
  const {type} = useParams();
  const auth = useAuth();
  const accessKey = 'x-access-token'
  if(type === 'logout') {
    axios.post(AUTH_PATH.LOGOUT_PATH,{},{
      headers:{
        [accessKey]: auth.user?.accessToken
      }
    })
    auth.logout()
  }
  return (
    <>
      <StyledRoot style={{backgroundImage: "url('/assets/image2.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <Container maxWidth="sm" style={{height: '100vh'}}>
          <StyledContent>
            {type === 'register' ? (
              <RegisterForm/>
            ) : type === 'change-password' ? (
              <ChangePasswordForm/>
            ) : (
              <LoginForm />
            )}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
