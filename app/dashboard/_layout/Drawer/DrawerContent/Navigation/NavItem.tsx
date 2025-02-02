'use client';
import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// project import
import { activeItem } from '@root//store/reducers/menu';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //


const NavItem = ({ item, level }: { item: MenuItem, level: number }) => {
  const { t } = useTranslation();
  const nsTranslation = 'navigation.';
  const keyName = nsTranslation + item.id;
  const theme = useTheme();
  const dispatch = useDispatch();
  const primaryColors : PaletteColor = theme.palette.primary;
  const { drawerOpen, openItem } = useSelector((state: any) => state.menu);

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  // eslint-disable-next-line react/display-name
  const LinkComponent = forwardRef<HTMLAnchorElement, any>((props, ref) => (
    <Link ref={ref} {...props} href={item.url || ''} target={itemTarget} />
  ));

  let listItemProps: any = { component: LinkComponent };
  if (item?.external) {
    listItemProps = { component: 'a' as any, href: item.url, target: itemTarget };
  }

  const itemHandler = (id: any) => {
    dispatch(activeItem({ openItem: [id] }));
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

  const isSelected = openItem.findIndex((id: any) => id === item.id) > -1;
  // active menu item on page load
  let path = usePathname();
  useEffect(() => {
    if (path.includes(item.url as string)) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
    // eslint-disable-next-line
  }, [path]);

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      onClick={() => itemHandler(item.id)}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          '&:hover': {
            bgcolor: primaryColors.lighter
          },
          '&.Mui-selected': {
            bgcolor: primaryColors.lighter,
            borderRight: `4px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            '&:hover': {
              color: iconSelectedColor,
              bgcolor: primaryColors.lighter
            }
          }
        }),
        ...(!drawerOpen && {
          '&:hover': {
            bgcolor: 'transparent'
          },
          '&.Mui-selected': {
            '&:hover': {
              bgcolor: 'transparent'
            },
            bgcolor: 'transparent'
          }
        })
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: 'secondary.lighter'
              }
            }),
            ...(!drawerOpen &&
              isSelected && {
              bgcolor: 'primary.lighter',
              '&:hover': {
                bgcolor: 'primary.lighter'
              }
            })
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
              {t(keyName)}
            </Typography>
          }
        />
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
        <Chip
          color={item.chip.color as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
          variant={item.chip.variant as 'filled' | 'outlined'}
          size={item.chip.size as 'small' | 'medium'}
          label={item.chip.label}
          avatar={item.chip.avatar ? <Avatar>{item.chip.avatar}</Avatar> : undefined}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
