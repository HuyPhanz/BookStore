import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {AppBar, Link, Toolbar, Typography} from '@mui/material';
// utils
import {Button, Image} from "antd";
import {generatePath, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {bgBlur, Text} from '../../../utils/cssStyles';
// components
//
import {useAuth} from "../../../hooks/useRoute";
import {AUTH_PATH} from "../../../const/API";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  // },
}));

const StyledNav = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
  display: 'flex',
  justifyContent: 'space-between',
  background: '#EFF6FE'
}));

const Menu = styled('a')`
  text-decoration: none;
  color: black;
  font-weight: bold;
  :hover{
    color: #1C1CE4;
    cursor: pointer;
  }
`

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const { user } = auth;

  const handleLogout = () => {
    axios.post(AUTH_PATH.LOGOUT_PATH,null,{headers: {Authorization: `Bearer ${auth.user.accessToken}`}}).then(response => {
      if (response) {
        auth.logout();
      } else {
        toast.error('Có lỗi xảy ra!')
      }
    }).catch((e) => {
      if (e.response) {
        toast.error('Có lỗi xảy ra!')
      }
    })
  }

  return (
    <StyledRoot>
      <StyledNav>
        <Image src={'/assets/logo.png'} />
        {/* <IconButton */}
        {/*  onClick={onOpenNav} */}
        {/*  sx={{ */}
        {/*    mr: 1, */}
        {/*    color: 'text.primary', */}
        {/*    display: { lg: 'none' }, */}
        {/*  }} */}
        {/* > */}
        {/*  <Iconify icon="eva:menu-2-fill" /> */}
        {/* </IconButton> */}
        <div style={{display: 'flex', gap: '16px'}}>
          <Menu onClick={() => {navigate('/home')}}>
            <Typography style={{fontSize: '16pt'}}>
              Trang chủ
            </Typography>
          </Menu>
          <Menu onClick={() => {navigate('/product')}}>
            <Typography style={{fontSize: '16pt'}}>
              Sản phẩm
            </Typography>
          </Menu>
          <Menu onClick={() => {navigate('/material-source')}}>
            <Typography style={{fontSize: '16pt'}}>
              Vùng nguyên liệu
            </Typography>
          </Menu>
          <Menu onClick={() => {navigate('/store')}}>
            <Typography style={{fontSize: '16pt'}}>
              Cửa hàng
            </Typography>
          </Menu>
          <Menu onClick={() => {navigate('/feature')}}>
            <Typography style={{fontSize: '16pt'}}>
              Phát triển
            </Typography>
          </Menu>
        </div>
        {user.userName ? (
          <div>
            <Text style={{color: 'black'}}>{user.userName}</Text>
            <Link onClick={() => handleLogout()}>Đăng xuất</Link>
          </div>
          ) : (
            <Button style={{background: '#2A3B88', color: 'white'}} shape={"round"} onClick={() => navigate(generatePath('/auth/:type', {type: 'login'}))}>Đăng nhập</Button>
          )}
      </StyledNav>
    </StyledRoot>
  );
}
