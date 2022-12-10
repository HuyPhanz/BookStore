import { useState } from 'react';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Iconify from '../../../components/iconify';
import {useAuth} from "../../../hooks/useRoute";
import {AUTH_PATH} from "../../../const/API";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({username: null, password: null, deviceId: '1111'})
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    axios.post(AUTH_PATH.LOGIN_PATH,user).then(response => {
      if (response.data.accessToken) {
        auth.login({ accessToken: response.data.accessToken});
      } else {
        toast.error('Có lỗi xảy ra!')
      }
    }).catch((e) => {
      if (e.response) {
        toast.error('Có lỗi xảy ra!')
      }
    })
  };

  return (
    <>
      <Stack spacing={5}>
        <div style={{display: 'flex', justifyContent: "center"}}>
          <img style={{width:'200px', height: '100px'}} src={'/assets/logo.png'} alt={'logo'}/>
        </div>

        <h1 style={{textAlign: 'center'}}>
          Đổi
        </h1>

        <TextField
          name="email"
          label="Email address"
          onChange={e => setUser({...user, username: e.target.value})}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={e => setUser({...user, password: e.target.value})}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
          Đổi mật khẩu
        </LoadingButton>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover" onClick={() => navigate('/auth/login')}>
          Đăng nhập
        </Link>
      </Stack>
    </>
  );
}
