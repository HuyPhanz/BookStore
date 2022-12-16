// component
import {LogoutOutlined} from "@ant-design/icons";
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = {
  main: [
  {
    title: 'Tài khoản',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Cửa hàng',
    path: '/admin/store',
    icon: icon('ic_cart'),
  },
  {
    title: 'Loại sản phẩm',
    path: '/admin/product-type',
    icon: icon('ic_blog'),
  },
  {
    title: 'Sản phẩm',
    path: '/admin/products',
    icon: icon('ic_blog'),
  }],
  footer: [
    {
      title: 'Đăng xuất',
      path: '/auth/logout',
      icon: <LogoutOutlined/>,
    },
  ]
};

export default navConfig
