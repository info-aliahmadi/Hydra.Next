import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from '../MainCard';

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, ...others }: {navigation : any, title: boolean}) => {
  
  const [main, setMain] = useState<{ type?: string; title?: boolean } | null>(null);
  const [item, setItem] = useState<{ type?: string; title?: string; breadcrumbs?: boolean } | null>(null);
  const path = usePathname();

  // set active item state
  const getCollapse = (menu : any) => {
    if (menu.children) {
      menu.children.filter((collapse  : any) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item') {
          if (path === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    
    navigation?.items?.map((menu : any) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
      return false;
    });
  });

  // only used for component demo breadcrumbs
  // if (usePathname === '/breadcrumbs') {
  //   usePathname = '/dashboard/analytics';
  // }

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';

  // collapse item
  if (main && main.type === 'collapse') {
    mainContent = (
      <Typography component="a" href={path} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === 'item') {
    itemTitle = item.title ?? '';
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography component="a" href="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                  Home
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
            </Grid>
            {title && (
              <Grid item sx={{ mt: 2 }}>
                <Typography variant="h5">{item.title}</Typography>
              </Grid>
            )}
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool
};

export default Breadcrumbs;
