import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {Box, Stack, AppBar, Toolbar, IconButton, Typography} from '@mui/material';
// utils
import {Button, Image} from "antd";
import {Link, useNavigate} from "react-router-dom";
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';

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
          <Menu onClick={() => {navigate('/dashboard/home')}}>
            <Typography style={{fontSize: '16pt'}}>
              Trang chủ
            </Typography>
          </Menu>
          <Menu onClick={() => {navigate('/dashboard/product')}}>
            <Typography style={{fontSize: '16pt'}}>
              Sản phẩm
            </Typography>
          </Menu>
          <Menu onClick={() => {navigate('/dashboard/material-source')}}>
            <Typography style={{fontSize: '16pt'}}>
              Vùng nguyên liệu
            </Typography>
          </Menu>
          <Menu onClick={() => {navigate('/dashboard/store')}}>
            <Typography style={{fontSize: '16pt'}}>
              Cửa hàng
            </Typography>
          </Menu>
          <Menu onClick={() => {navigate('/dashboard/feature')}}>
            <Typography style={{fontSize: '16pt'}}>
              Phát triển
            </Typography>
          </Menu>
        </div>

        <Button style={{background: '#2A3B88', color: 'white'}} shape={"round"}>Đăng nhập</Button>
      </StyledNav>
    </StyledRoot>
  );
}
