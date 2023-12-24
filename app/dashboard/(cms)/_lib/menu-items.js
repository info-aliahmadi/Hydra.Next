// assets
import { Article, Menu, Slideshow, Description, Topic, Link } from '@mui/icons-material';
// icons
const icons = {
  Article,
  Description,
  Menu,
  Slideshow,
  Topic,
  Link
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'contents',
  title: 'Contents',
  type: 'group',
  permission: 'AUTH.GET_PERMISSION_LIST',
  children: [
    {
      id: 'article',
      title: 'Articles',
      type: 'item',
      url: '/dashboard/article/list',
      icon: icons.Article,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'page',
      title: 'Pages',
      type: 'item',
      url: '/dashboard/page/list',
      icon: icons.Description,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'topic',
      title: 'Topics',
      type: 'item',
      url: '/dashboard/topic/list',
      icon: icons.Topic,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'menus',
      title: 'Menus',
      type: 'item',
      url: '/dashboard/menu/list',
      icon: icons.Menu,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'slideshow',
      title: 'Slideshow',
      type: 'item',
      url: '/dashboard/slideshow/list',
      icon: icons.Slideshow,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'links',
      title: 'Links',
      type: 'item',
      url: '/dashboard/link/list',
      icon: icons.Link,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    }
  ]
};

export default pages;
