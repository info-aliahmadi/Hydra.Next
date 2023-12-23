import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';

import MainCard from '@dashboard/_components/MainCard';
import TableCard from 'components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from 'components/MaterialTable/MaterialTable';
import TagService from 'modules/cms/services/TagsService';
import { Edit, Tag, Add, Delete } from '@mui/icons-material';
import AddOrEditTag from '../AddOrEditTag';
import DeleteTag from '../DeleteTag';


function TagDataGrid() {
  const [t] = useTranslation();
  const service = new TagService();
  const [isNew, setIsNew] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: t('fields.tag.title'),
        enableClickToCopy: true,
        type: 'string'
        // filterVariant: 'text' | 'select' | 'multi-select' | 'range' | 'range-slider' | 'checkbox',
      }
    ],
    []
  );

  const handleNewRow = (row) => {
    setIsNew(true);
    setRow(row);
    setOpen(true);
  };
  const handleEditRow = (row) => {
    setIsNew(false);
    setRow(row);
    setOpen(true);
  };
  const handleDeleteRow = (row) => {
    setRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handleTagList = useCallback(async (filters) => {
    return await service.getTagList(filters);
  }, []);

  const AddRow = useCallback(
    () => (
      <Button color="primary" onClick={() => handleNewRow(null)} variant="contained" startIcon={<Tag />}>
        {t('buttons.tag.add')}
      </Button>
    ),
    []
  );
  const DeleteOrEdit = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.tag.delete')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.tag.edit')}>
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
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataApi={handleTagList}
            enableRowActions
            renderRowActions={DeleteOrEdit}
            // renderTopToolbarCustomActions={AddRow}
          />
        </TableCard>
      </MainCard>
      <AddOrEditTag isNew={isNew} row={row} open={open} setOpen={setOpen} refetch={handleRefetch} />
      <DeleteTag row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}

export default TagDataGrid;
