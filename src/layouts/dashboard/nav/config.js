// component
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
      title: 'Đổi mật khẩu',
      path: '/admin/change-password',
      icon: icon('ic_lock'),
    },
    {
      title: 'Đăng xuất',
      path: '/auth/logout',
      icon: icon('ic_cart'),
    },
  ]
};

export default navConfig
