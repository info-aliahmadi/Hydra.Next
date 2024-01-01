// material-ui
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemIcon,
  MenuItem,
  OutlinedInput} from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import UsersService from '@dashboard/(auth)/_service/UsersService';
import { AccountCircle, Send, PersonAdd } from '@mui/icons-material';
import CONFIG from '/config';
import { Stack } from '@mui/system';
import moment from 'moment';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import SelectRole from '../Role/SelectRole';
import TableCard from '@dashboard/_components/TableCard';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

function UsersDataGrid() {
  const [t, i18n] = useTranslation();
  
  const { data: session } = useSession();

  const jwt = session?.user?.accessToken;

  const service = new UsersService(jwt);
  const router = useRouter();

  const [fieldsName, buttonName] = ['fields.user.', 'buttons.user.'];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t(fieldsName + 'name'),
        enableClickToCopy: true,
        type: 'string',
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <Avatar
              loading="lazy"
              alt="profile user"
              src={row.original.avatar ? CONFIG.AVATAR_BASEPATH + row.original.avatar : '/images/users/anonymous.png'}
              sx={{ width: 40, height: 40 }}
            ></Avatar>
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
          </Box>
        )
        // filterVariant: 'text' | 'select' | 'multi-select' | 'range' | 'range-slider' | 'checkbox',
      },
      {
        accessorKey: 'userName',
        header: t(fieldsName + 'userName'),
        enableClickToCopy: true,
        type: 'string',
        enableResizing: true
      },
      {
        accessorKey: 'email',
        header: t(fieldsName + 'email'),
        enableClickToCopy: true,
        type: 'string',
        enableResizing: true
      },
      {
        accessorKey: 'emailConfirmed',
        header: t(fieldsName + 'emailConfirmed'),
        type: 'boolean',
        enableResizing: true
      },
      {
        accessorKey: 'phoneNumber',
        header: t(fieldsName + 'phoneNumber'),
        type: 'string',
        enableResizing: true
      },
      {
        accessorKey: 'phoneNumberConfirmed',
        header: t(fieldsName + 'phoneNumberConfirmed'),
        type: 'boolean'
      },
      {
        accessorKey: 'registerDate',
        header: t(fieldsName + 'registerDate'),
        type: 'dateTime'
      }
    ],
    []
  );

  const handleUserList = useCallback(async (filters) => {
    return await service.getUserList(filters);
  }, []);
  const AddRow = useCallback(
    () => (
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          router.push('/dashboard/user/add/0');
        }}
        startIcon={<PersonAdd />}
      >
        {t(buttonName + 'add')}
      </Button>
    ),
    []
  );
  const RowActionMenuItems = useCallback(
    ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          router.push('/dashboard/user/edit/' + row.original.id);
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Profile
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>
    ],
    []
  );
  const UserDetail = ({ row }) => {
    return (
      <Grid container spacing={3} direction="row">
        <Grid container item spacing={3} xd={12} sm={6} md={3} lg={3} direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12} md={12}>
            <Stack>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  margin: '10px'
                }}
              >
                <Avatar
                  loading="lazy"
                  alt="profile user"
                  src={row.original.avatar ? CONFIG.AVATAR_BASEPATH + row.original.avatar : '/images/users/anonymous.png'}
                  sx={{ width: 100, height: 100 }}
                ></Avatar>
                <span>{row.original.name}</span>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Grid container item spacing={3} xd={12} sm={6} md={6} lg={6}>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="name">{t(fieldsName + 'name')}</InputLabel>
              <OutlinedInput id="name" type="text" value={row.original.name} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="userName">{t(fieldsName + 'userName')}</InputLabel>
              <OutlinedInput id="userName" type="text" value={row.original.userName} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">{t(fieldsName + 'email')}</InputLabel>
              <OutlinedInput id="email" type="text" value={row.original.email} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="emailConfirmed">{t(fieldsName + 'emailConfirmed')}</InputLabel>
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    id="emailConfirmed"
                    checked={row.original.emailConfirmed ? true : false}
                    title={row.original.emailConfirmed ? 'Yes' : 'No'}
                    color="default"
                    disabled
                  />
                }
                label={t(fieldsName + 'emailConfirmed')}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phoneNumber">{t(fieldsName + 'phoneNumber')}</InputLabel>
              <OutlinedInput id="phoneNumber" type="text" value={row.original.phoneNumber} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phoneNumberConfirmed">{t(fieldsName + 'phoneNumberConfirmed')}</InputLabel>{' '}
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    id="phoneNumberConfirmed"
                    checked={row.original.phoneNumberConfirmed ? true : false}
                    title={row.original.phoneNumberConfirmed ? 'Yes' : 'No'}
                    color="default"
                    disabled
                  />
                }
                label={t(fieldsName + 'phoneNumberConfirmed')}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="registerDate">{t(fieldsName + 'registerDate')}</InputLabel>
              <OutlinedInput
                id="registerDate"
                type="text"
                value={new Intl.DateTimeFormat(i18n.language, {
                  dateStyle: 'long',
                  timeStyle: [CONFIG.TIME_STYLE],
                  hour12: false
                }).format(moment(row.original.registerDate))}
                fullWidth
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="lockoutEnabled">{t(fieldsName + 'lockoutEnabled')}</InputLabel>
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    id="lockoutEnabled"
                    checked={row.original.lockoutEnabled ? true : false}
                    title={row.original.lockoutEnabled ? 'Yes' : 'No'}
                    color="default"
                    disabled
                  />
                }
                label={t(fieldsName + 'lockoutEnabled')}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="lockoutEnd">{t(fieldsName + 'lockoutEnd')}</InputLabel>
              <OutlinedInput id="lockoutEnd" type="text" value={row.original.lockoutEnd} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="accessFailedCount">{t(fieldsName + 'accessFailedCount')}</InputLabel>
              <OutlinedInput id="accessFailedCount" type="text" value={row.original.accessFailedCount} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="defaultLanguage">{t(fieldsName + 'defaultLanguage')}</InputLabel>
              <OutlinedInput id="defaultLanguage" type="text" value={row.original.defaultLanguage} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="roles">{t('pages.roles')}</InputLabel>
              <SelectRole disabled defaultValues={row.original.roleIds} />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <MainCard title={<AddRow />}>
        <TableCard>
          <MaterialTable
            columns={columns}
            dataApi={handleUserList}
            enableRowActions
            // renderTopToolbarCustomActions={AddRow}
            renderRowActionMenuItems={RowActionMenuItems}
            renderDetailPanel={({ row }) => <UserDetail row={row} />}
          />
        </TableCard>
      </MainCard>
    </>
  );
}

export default UsersDataGrid;
