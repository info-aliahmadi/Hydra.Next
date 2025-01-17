import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';


// assets
import { CloseOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import  Email  from '@mui/icons-material/Email';
import  Message  from '@mui/icons-material/Message';
import Transitions from '@dashboard/_components/@extended/Transitions';
import MainCard from '@dashboard/_components/MainCard';
// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme:any = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRefMessaage = useRef<HTMLButtonElement>(null);
  const anchorRefEmail = useRef<HTMLButtonElement>(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const handleToggleMessage = () => {
    setOpenMessage((prevOpen) => !prevOpen);
  };

  const handleCloseMessage = (event : any) => {
    if (anchorRefMessaage.current?.contains(event.target)) {
      return;
    }
    setOpenMessage(false);
  };

  const handleToggleEmail = () => {
    setOpenEmail((prevOpen) => !prevOpen);
  };

  const handleCloseEmail = (event : any) => {
    if (anchorRefEmail.current?.contains(event.target)) {
      return;
    }
    setOpenEmail(false);
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: openEmail ? iconBackColorOpen : iconBackColor, mr: 1, ml: 1 }}
        aria-label="Message profile"
        ref={anchorRefEmail}
        aria-controls={openEmail ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggleEmail}
      >
        <Badge badgeContent={2} color="error">
          <Email />
        </Badge>
      </IconButton>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: openMessage ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRefMessaage}
        aria-controls={openMessage ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggleMessage}
      >
        <Badge badgeContent={4} color="primary">
          <Message />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={openMessage}
        anchorEl={anchorRefMessaage.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={openMessage} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleCloseMessage}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggleMessage}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'success.main',
                            bgcolor: 'success.lighter'
                          }}
                        >
                          <GiftOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            It&apos;s{' '}
                            <Typography component="span" variant="subtitle1">
                              Cristina danny&apos;s
                            </Typography>{' '}
                            birthday today.
                          </Typography>
                        }
                        secondary="2 min ago"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          3:00 AM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                          }}
                        >
                          <MessageOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            <Typography component="span" variant="subtitle1">
                              Aida Burg
                            </Typography>{' '}
                            commented your post.
                          </Typography>
                        }
                        secondary="5 August"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          6:00 PM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'error.main',
                            bgcolor: 'error.lighter'
                          }}
                        >
                          <SettingOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            Your Profile is Complete &nbsp;
                            <Typography component="span" variant="subtitle1">
                              60%
                            </Typography>{' '}
                          </Typography>
                        }
                        secondary="7 hours ago"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          2:45 PM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                          }}
                        >
                          C
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            <Typography component="span" variant="subtitle1">
                              Cristina Danny
                            </Typography>{' '}
                            invited to join{' '}
                            <Typography component="span" variant="subtitle1">
                              Meeting.
                            </Typography>
                          </Typography>
                        }
                        secondary="Daily scrum meeting time"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          9:10 PM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton href="/message/Inbox" sx={{ textAlign: 'center', py: `${12}px !important` }}>
                      <Typography variant="h6" color="primary" textAlign="center" display="block" sx={{ width: '100%' }}>
                        View All
                      </Typography>
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={openEmail}
        anchorEl={anchorRefEmail.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={openEmail} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleCloseEmail}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggleEmail}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'success.main',
                            bgcolor: 'success.lighter'
                          }}
                        >
                          <GiftOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            It&apos;s{' '}
                            <Typography component="span" variant="subtitle1">
                              Cristina danny&apos;s
                            </Typography>{' '}
                            birthday today.
                          </Typography>
                        }
                        secondary="2 min ago"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          3:00 AM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                          }}
                        >
                          <MessageOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            <Typography component="span" variant="subtitle1">
                              Aida Burg
                            </Typography>{' '}
                            commented your post.
                          </Typography>
                        }
                        secondary="5 August"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          6:00 PM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'error.main',
                            bgcolor: 'error.lighter'
                          }}
                        >
                          <SettingOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            Your Profile is Complete &nbsp;
                            <Typography component="span" variant="subtitle1">
                              60%
                            </Typography>{' '}
                          </Typography>
                        }
                        secondary="7 hours ago"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          2:45 PM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                          }}
                        >
                          C
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            <Typography component="span" variant="subtitle1">
                              Cristina Danny
                            </Typography>{' '}
                            invited to join{' '}
                            <Typography component="span" variant="subtitle1">
                              Meeting.
                            </Typography>
                          </Typography>
                        }
                        secondary="Daily scrum meeting time"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          9:10 PM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
