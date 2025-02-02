// material-ui
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  InputLabel,
  ListItemIcon,
  MenuItem,
  OutlinedInput
} from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UsersService from '@dashboard/(auth)/_service/UsersService';
import { AccountCircle, Send, PersonAdd } from '@mui/icons-material';
import CONFIG from '@root/config';
import { Stack } from '@mui/system';
import moment from 'moment';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import TableCard from '@dashboard/_components/TableCard';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MRT_Cell, MRT_Row, MRT_RowData, MRT_TableInstance } from 'material-react-table';
import { UserModel } from '../../_types/User/UserModel';
import { MRT_Column } from '@root/app/types/MRT_Column';
// ===============================|| COLOR BOX ||=============================== //

const UserDetail = ({ row, t, fieldsName, language }: { row: MRT_Row<UserModel>, t: any, fieldsName: string, language: string }) => {
  return (
    <Grid2 container spacing={3} direction="row">
      <Grid2 container spacing={3} size={{ xs: 12, sm: 6, md: 3, lg: 3, xl: 3 }} direction="row" sx={{ justifyContent: 'center', alignItems: "center" }}>
        <Grid2 size={{ xs: 12, md: 12 }}>
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
                alt="profile user"
                src={row.original.avatar ? CONFIG.AVATAR_BASEPATH + row.original.avatar : '/images/users/anonymous.png'}
                sx={{ width: 200, height: 200 }}
              ></Avatar>
              <span>{row.original.name}</span>
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={3} size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }} >
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="name">{t(fieldsName + 'name')}</InputLabel>
            <OutlinedInput id="name" type="text" value={row.original.name ? row.original.name : ''} fullWidth disabled />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="userName">{t(fieldsName + 'userName')}</InputLabel>
            <OutlinedInput id="userName" type="text" value={row.original.userName ? row.original.userName : ''} fullWidth disabled />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email">{t(fieldsName + 'email')}</InputLabel>
            <OutlinedInput id="email" type="text" value={row.original.email ? row.original.email : ''} fullWidth disabled />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="emailConfirmed">{t(fieldsName + 'emailConfirmed')}</InputLabel>
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  id="emailConfirmed"
                  checked={row.original.emailConfirmed ? row.original.lockoutEnabled : false}
                  title={row.original.emailConfirmed ? 'Yes' : 'No'}
                  color="default"
                  disabled
                />
              }
              label={t(fieldsName + 'emailConfirmed')}
            />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="phoneNumber">{t(fieldsName + 'phoneNumber')}</InputLabel>
            <OutlinedInput id="phoneNumber" type="text" value={row.original.phoneNumber ? row.original.phoneNumber : ''} fullWidth disabled />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="phoneNumberConfirmed">{t(fieldsName + 'phoneNumberConfirmed')}</InputLabel>{' '}
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  id="phoneNumberConfirmed"
                  checked={row.original.phoneNumberConfirmed ? row.original.lockoutEnabled : false}
                  title={row.original.phoneNumberConfirmed ? 'Yes' : 'No'}
                  color="default"
                  disabled
                />
              }
              label={t(fieldsName + 'phoneNumberConfirmed')}
            />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="registerDate">{t(fieldsName + 'registerDate')}</InputLabel>
            <OutlinedInput
              id="registerDate"
              type="text"
              value={row.original.registerDate
                ? new Intl.DateTimeFormat(language, {
                  dateStyle: 'long',
                  timeStyle: CONFIG.TIME_STYLE as "short" | "full" | "long" | "medium" | undefined,
                  hour12: false
                }).format(moment(row.original.registerDate).toDate()) : ''}
              fullWidth
              disabled
            />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="lockoutEnabled">{t(fieldsName + 'lockoutEnabled')}</InputLabel>
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  id="lockoutEnabled"
                  checked={row.original.lockoutEnabled ? row.original.lockoutEnabled : false}
                  title={row.original.lockoutEnabled ? 'Yes' : 'No'}
                  color="default"
                  disabled
                />
              }
              label={t(fieldsName + 'lockoutEnabled')}
            />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="lockoutEnd">{t(fieldsName + 'lockoutEnd')}</InputLabel>
            <OutlinedInput id="lockoutEnd" type="text" value={row.original.lockoutEnd ? row.original.lockoutEnd : ''} fullWidth disabled />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="accessFailedCount">{t(fieldsName + 'accessFailedCount')}</InputLabel>
            <OutlinedInput id="accessFailedCount" type="text" value={row.original.accessFailedCount ? row.original.accessFailedCount : 0} fullWidth disabled />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="defaultLanguage">{t(fieldsName + 'defaultLanguage')}</InputLabel>
            <OutlinedInput id="defaultLanguage" type="text" value={row.original.defaultLanguage ? row.original.defaultLanguage : ''} fullWidth disabled />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Stack spacing={1}>
            <InputLabel htmlFor="roles">{t('pages.roles')}</InputLabel>
            {/* <SelectRole disabled defaultValues={row.original.roleIds} /> */}
          </Stack>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

function UsersDataGrid() {
  const [t, i18n] = useTranslation();
  const language = i18n.language;
  const { data: session } = useSession();

  const jwt = session?.accessToken;

  const service = new UsersService(jwt || '');
  const router = useRouter();

  const [fieldsName, buttonName] = ['fields.user.', 'buttons.user.'];
  const [refetch, setRefetch] = useState<number>(0);


  const columns = useMemo<MRT_Column<UserModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t(fieldsName + 'name'),
        enableClickToCopy: true,
        type: 'string',
        Cell: ({ cell, renderedCellValue, row }: { cell: MRT_Cell<UserModel, unknown>; renderedCellValue: ReactNode; row: MRT_Row<UserModel> }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <Avatar
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
        grow: true,
        header: t(fieldsName + 'phoneNumberConfirmed'),
        type: 'boolean'
      },
      {
        accessorKey: 'registerDate',
        header: t(fieldsName + 'registerDate'),
        type: 'dateTime'
      }
    ],
    [language]
  );

  const handleUserList = useCallback(async (filters: GridDataBound) => {
    return (await service.getUserList(filters));
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
    ({ closeMenu, row }: { closeMenu: () => void, row: MRT_Row<MRT_RowData>, staticRowIndex?: number, table: MRT_TableInstance<MRT_RowData>; }) => [
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

  return (
    <MainCard title={<AddRow />}>
      <TableCard>
        <MaterialTable
          columns={columns}
          dataApi={handleUserList}
          enableRowActions
          refetch={refetch}
          // renderTopToolbarCustomActions={AddRow}
          renderRowActionMenuItems={RowActionMenuItems}
          renderDetailPanel={({ row, table }) => <UserDetail row={row} t={t} fieldsName={fieldsName} language={language} />}
        />
      </TableCard>
    </MainCard>
  );
}

export default UsersDataGrid;
