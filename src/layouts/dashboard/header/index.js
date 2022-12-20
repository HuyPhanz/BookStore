import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {AppBar, IconButton, Link, Toolbar, Typography} from '@mui/material';
// utils
import {Button, Dropdown, Space} from "antd";
import {generatePath, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {useState} from "react";
import {DownOutlined} from "@ant-design/icons";
import {bgBlur, Text} from '../../../utils/cssStyles';
// components
//
import {useAuth} from "../../../hooks/useRoute";
import {AUTH_PATH} from "../../../const/API";
import Iconify from "../../../components/iconify";

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
  const [currentPage, setCurrentPage] = useState('home')
  const navigate = useNavigate();
  const auth = useAuth();
  const { user } = auth;

  const accessKey = 'x-access-token'
  const headers = {
    [accessKey]: auth.user?.accessToken
  }

  const onClick = ({ key }) => key === 'logout' ? handleLogout() : navigate('/auth/change-password')

  const items = [
    {
      label: 'Đổi mật khẩu',
      key: 'change-password',
    },
    {
      label: 'Đăng xuất',
      key: 'logout',
    },
  ];

  const handleLogout = () => {
    auth.logout();
    axios.post(AUTH_PATH.LOGOUT_PATH,{},{headers})
      .then(response => {
        if (response) {
          auth.logout();
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
        <img src={'/assets/logo.png'} alt={'logo'}/>
        <div style={{display: 'flex', gap: '20px'}}>
          <Menu
            style={currentPage === 'home' ? {borderBottom: '1px solid', color: '#2065D1'} : null}
            onClick={() => {
              setCurrentPage('home')
              navigate('/home')
          }}>
            <Typography style={{fontSize: '16pt'}}>
              Trang chủ
            </Typography>
          </Menu>
          <Menu
            style={currentPage === 'product' ? {borderBottom: '1px solid', color: '#2065D1'} : null}
            onClick={() => {
              setCurrentPage('product')
              navigate('/product')
            }}>
            <Typography style={{fontSize: '16pt'}}>
              Sản phẩm
            </Typography>
          </Menu>
          <Menu
            style={currentPage === 'source' ? {borderBottom: '1px solid', color: '#2065D1'} : null}
            onClick={() => {
              setCurrentPage('source')
              navigate('/material-source')
            }}>
            <Typography style={{fontSize: '16pt'}}>
              Vùng nguyên liệu
            </Typography>
          </Menu>
          <Menu
            style={currentPage === 'store' ? {borderBottom: '1px solid', color: '#2065D1'} : null}
            onClick={() => {
              setCurrentPage('store')
              navigate('/store')
            }}>
            <Typography style={{fontSize: '16pt'}}>
              Cửa hàng
            </Typography>
          </Menu>
          <Menu
            style={currentPage === 'feature' ? {borderBottom: '1px solid', color: '#2065D1'} : null}
            onClick={() => {
              setCurrentPage('feature')
              navigate('/feature')
            }}>
            <Typography style={{fontSize: '16pt'}}>
              Phát triển
            </Typography>
          </Menu>
        </div>
        {user?.userName ? (
          <Dropdown
            menu={{
              items,
              onClick,
            }}
            overlayStyle={{zIndex: '10000'}}
          >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <Text style={{fontSize: '16pt', color:'blue', cursor: 'pointer'}}>
              {user.userName}
            </Text>
          </Dropdown>
          ) : (
            <Button style={{background: '#2A3B88', color: 'white'}} shape={"round"} onClick={() => navigate(generatePath('/auth/:type', {type: 'login'}))}>Đăng nhập</Button>
          )}
      </StyledNav>
    </StyledRoot>
  );
}
