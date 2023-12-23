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
      url: '/ArticlesList',
      icon: icons.Article,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'page',
      title: 'Pages',
      type: 'item',
      url: '/PagesList',
      icon: icons.Description,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'topic',
      title: 'Topics',
      type: 'item',
      url: '/TopicsList',
      icon: icons.Topic,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'menus',
      title: 'Menus',
      type: 'item',
      url: '/MenusList',
      icon: icons.Menu,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'slideshow',
      title: 'Slideshow',
      type: 'item',
      url: '/SlideshowsList',
      icon: icons.Slideshow,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    },
    {
      id: 'links',
      title: 'Links',
      type: 'item',
      url: '/dashboard/Link/List',
      icon: icons.Link,
      breadcrumbs: false,
      permission: 'AUTH.GET_PERMISSION_LIST'
    }
  ]
};

export default pages;
