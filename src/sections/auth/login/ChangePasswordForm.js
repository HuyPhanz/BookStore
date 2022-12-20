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

export default function ChangePasswordForm() {
  const auth = useAuth();
  const accessKey = 'x-access-token'
  const headers = {
    [accessKey]: auth.user?.accessToken
  }

  const navigate = useNavigate()
  const [user, setUser] = useState({oldPassword: null, newPassword: null, confirmPassword: null})
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = () => {
    if (user.newPassword === user.confirmPassword) {
      axios.post(AUTH_PATH.CHANGE_PASSWORD_PATH, {password: user.oldPassword, newPassword: user.newPassword}, {headers})
        .then(response => {
          if (response) {
            navigate('/auth/login')
          } else {
            toast.error('Sai mật khẩu!')
          }
        }).catch((e) => {
          if (e.response) {
            toast.error('Sai mật khẩu!')
          }
        })
    } else if (user.newPassword === user.oldPassword){
      toast.error('Mật khẩu mới trùng!')
    } else {
      toast.error('Nhập lại mật khẩu không khớp!')
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <div style={{display: 'flex', justifyContent: "center"}}>
          <img style={{width:'200px', height: '100px'}} src={'/assets/logo.png'} alt={'logo'}/>
        </div>

        <h1 style={{textAlign: 'center'}}>
          Đổi mật khẩu
        </h1>

        <TextField
          name="oldPassword"
          label="Mật khẩu cũ"
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
          onChange={e => setUser({...user, oldPassword: e.target.value})}
        />

        <TextField
          name="newPassword"
          label="Mật khẩu mới"
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
          onChange={e => setUser({...user, newPassword: e.target.value})}
        />
        <TextField
          name="confirmPassword"
          label="Xác nhận mật khẩu"
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
          onChange={e => setUser({...user, confirmPassword: e.target.value})}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleChangePassword}>
          Đổi mật khẩu
        </LoadingButton>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        <Link style={{cursor: 'pointer'}} variant="subtitle2" underline="hover" onClick={() => navigate('/auth/login')}>
          Đăng nhập
        </Link>
      </Stack>
    </>
  );
}
