// assets
import { Article, Menu, Slideshow, Description, Topic, Link, Flag, ShoppingCart } from '@mui/icons-material';
// icons
const icons = {
  Article,
  Description,
  Menu,
  Slideshow,
  Topic,
  Link,
  Flag,
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
      id: 'order',
      title: 'Orders',
      type: 'item',
      url: '/dashboard/order/list',
      icon: icons.ShoppingCart,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'manufacturer',
      title: 'Manufacturers',
      type: 'item',
      url: '/dashboard/manufacturer/list',
      icon: icons.ShoppingCart,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    }
  ]
};

export default pages;
