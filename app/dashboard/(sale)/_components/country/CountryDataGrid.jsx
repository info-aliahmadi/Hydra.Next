// material-ui
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete } from '@mui/icons-material';
import { Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { useSession } from 'next-auth/react';
import CountryService from '../../_service/CountryService';
import DeleteCountry from './DeleteCountry';

// ===============================|| COLOR BOX ||=============================== //

function CountryDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  const service = new CountryService(jwt);
  const [isNew, setIsNew] = useState(true);
  const [rowId, setRowId] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const [fieldsName, buttonName] = ['fields.country.', 'buttons.country.'];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Name',
        header: t(fieldsName + 'Name'),
        enableClickToCopy: true,
        type: 'string'
      },
      {
        accessorKey: 'TwoLetterIsoCode',
        header: t(fieldsName + 'TwoLetterIsoCode'),
        enableClickToCopy: true,
        type: 'string'
      },
      {
        accessorKey: 'ThreeLetterIsoCode',
        header: t(fieldsName + 'ThreeLetterIsoCode'),
        enableClickToCopy: true,
        type: 'string'
      },
      {
        accessorKey: 'AllowsBilling',
        header: t(fieldsName + 'AllowsBilling'),
        enableClickToCopy: true,
        type: 'boolean'
      },
      {
        accessorKey: 'AllowsShipping',
        header: t(fieldsName + 'AllowsShipping'),
        enableClickToCopy: true,
        type: 'boolean'
      },
      {
        accessorKey: 'NumericIsoCode',
        header: t(fieldsName + 'NumericIsoCode'),
        enableClickToCopy: true,
        type: 'number'
      },
      {
        accessorKey: 'SubjectToVat',
        header: t(fieldsName + 'SubjectToVat'),
        enableClickToCopy: true,
        type: 'boolean'
      },
      {
        accessorKey: 'Published',
        header: t(fieldsName + 'Published'),
        enableClickToCopy: true,
        type: 'boolean'
      },
      {
        accessorKey: 'DisplayOrder',
        header: t(fieldsName + 'DisplayOrder'),
        enableClickToCopy: true,
        type: 'number'
      },
      {
        accessorKey: 'LimitedToStores',
        header: t(fieldsName + 'LimitedToStores'),
        enableClickToCopy: true,
        type: 'boolean'
      }
    ],
    []
  );

  const handleNewRow = () => {
    setIsNew(true);
    setRowId(0);
    setOpen(true);
  };
  const handleEditRow = (row) => {
    let CountryId = row.original.id;
    setIsNew(false);
    setRowId(CountryId);
    setOpen(true);
  };
  const handleDeleteRow = (row) => {
    setRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handleCountryList = useCallback(async (x) => {
    return await service.getCountryList(x);
  }, []);
  const AddRow = useCallback(
    () => (
      <Button color="primary" onClick={handleNewRow} variant="contained" startIcon={<AddIcon />}>
        {t(buttonName + 'add')}
      </Button>
    ),
    []
  );

  const DeleteOrEdit = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="top-start" title={t(buttonName + 'delete')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t(buttonName + 'edit')}>
          <IconButton onClick={() => handleEditRow(row)}>
            <Edit />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );
  return (
    <>
      <MainCard title={<AddRow />}>
        <TableCard>
          <MaterialTable refetch={refetch} columns={columns} dataApi={handleCountryList} enableRowActions renderRowActions={DeleteOrEdit} />
        </TableCard>
      </MainCard>
      {/* service<AddOrEditCountry isNew={isNew} CountryId={rowId} open={open} setOpen={setOpen} refetch={handleRefetch} />  */}
      <DeleteCountry row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}

export default CountryDataGrid;
