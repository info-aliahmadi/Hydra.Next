// assets
import   ShoppingCart  from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
// icons
const icons = {
  CategoryIcon,
  ShoppingCart
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'sale',
  title: 'Sales',
  type: 'group',
  permission: 'AUTH.GET_PERMISSION_LIST',
  children: [
    {
      id: 'product',
      title: 'Products',
      type: 'item',
      url: '/dashboard/product/list',
      icon: icons.CategoryIcon,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },{
      id: 'order',
      title: 'Orders',
      type: 'item',
      url: '/dashboard/order/list',
      icon: icons.ShoppingCart,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    }
    
  ]
};

export default pages;
