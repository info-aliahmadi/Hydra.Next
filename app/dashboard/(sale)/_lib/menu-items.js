// assets
import { Article, Menu, Slideshow, Description, Topic, Link ,Flag} from '@mui/icons-material';
// icons
const icons = {
  Article,
  Description,
  Menu,
  Slideshow,
  Topic,
  Link,
  Flag 
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'sale',
  title: 'Sale',
  type: 'group',
  permission: 'AUTH.GET_PERMISSION_LIST',
  children: [
    {
      id: 'country',
      title: 'Countries',
      type: 'item',
      url: '/dashboard/country/list',
      icon: icons.Flag,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    }
  ]
};

export default pages;
