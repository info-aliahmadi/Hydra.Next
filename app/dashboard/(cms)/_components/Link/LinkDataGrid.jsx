// material-ui
import { Avatar, Box, Button, Grid, IconButton, Stack, Tooltip } from '@mui/material';

// project import
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete, Edit, ImageNotSupported, Save } from '@mui/icons-material';
import LinkIcon from '@mui/icons-material/Link';

import DeleteLink from './DeleteLink';
import Notify from '@dashboard/_components/@extended/Notify';
import AddOrEditLink from './AddOrEditLink';
import CONFIG from '/config';
import LinkService from '@dashboard/(cms)/_service/LinkService';
import { useSession } from 'next-auth/react';

let mediaExtensions = CONFIG.IMAGES_EXTENSIONS.concat(CONFIG.VIDEOS_EXTENSIONS);
// ===============================|| COLOR BOX ||=============================== //
const ImagePreviewRow = ({ renderedCellValue, row }) => {
  let src = renderedCellValue?.fileName
    ? mediaExtensions.some((extension) => extension == _.toLower(renderedCellValue?.extension))
      ? CONFIG.UPLOAD_BASEPATH + renderedCellValue.directory + renderedCellValue?.thumbnail
      : undefined
    : undefined;

  return (
    <Box
      key={'prev-' + row}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      {src != undefined ? (
        <img alt="ImagePreview" src={src} height={'80px'} />
      ) : (
        <Avatar variant="rounded">
          <ImageNotSupported />
        </Avatar>
      )}
    </Box>
  );
};
function LinkDataGrid({ linkSection }) {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  let linkService = new LinkService(jwt);
  
  const [data, setData] = useState(() => linkSection.original.links);
  const [openDelete, setOpenDelete] = useState(false);
  const [notify, setNotify] = useState(false);
  const [refetch, setRefetch] = useState();
  const [isNew, setIsNew] = useState();
  const [row, setRow] = useState();
  const [open, setOpen] = useState(false);
  const [showSaveOrderBtn, setShowSaveOrderBtn] = useState(false);


  const columns = useMemo(
    () => [
      {
        accessorKey: 'imagePreview',
        header: t('fields.link.imagePreview'),
        type: 'string',
        Cell: ({ renderedCellValue, row }) => <ImagePreviewRow renderedCellValue={renderedCellValue} row={row} />
      },
      {
        accessorKey: 'title',
        header: t('fields.link.title'),
        enableClickToCopy: true,
        type: 'string'
        // filterVariant: 'text' | 'select' | 'multi-select' | 'range' | 'range-slider' | 'checkbox',
      },
      {
        accessorKey: 'url',
        header: t('fields.link.url'),
        type: 'string'
      },
      {
        accessorKey: 'description',
        header: t('fields.link.description'),
        type: 'string'
      },
      {
        accessorKey: 'userName',
        header: t('fields.link.userName'),
        type: 'string'
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
  const handleSaveOrder = (data) => {
    linkService
      .updateLinkOrders(data)
      .then((result) => {
        setNotify({ open: true });
        setShowSaveOrderBtn(false);
        handleRefetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const AddOrOrderRow = useCallback(
    (showSaveBtn, data) => (
      <Stack spacing={2} direction="row">
        <Button color="primary" onClick={() => handleNewRow(null)} variant="contained" startIcon={<LinkIcon />}>
          {t('buttons.link.add')}
        </Button>
        {showSaveBtn && (
          <Button color="info" onClick={() => handleSaveOrder(data)} variant="contained" startIcon={<Save />}>
            {t('buttons.link.saveOrder')}
          </Button>
        )}
      </Stack>
    ),
    []
  );
  const DeleteOrEdit = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.link.delete')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.link.edit')}>
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
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <Grid container spacing={3} direction="row">
        <Grid item xd={12} sm={12} md={12}>
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataSet={data}
            enablePagination={false}
            enableSorting={false}
            enableBottomToolbar={false}
            enableColumnFilters={false}
            enableColumnFilterModes={false}
            enableColumnOrdering={false}
            enablePinning={false}
            enableDensityToggle={false}
            enableFullScreenToggle={false}
            enableGlobalFilterModes={false}
            enableRowActions
            renderRowActions={DeleteOrEdit}
            renderTopToolbarCustomActions={() => AddOrOrderRow(showSaveOrderBtn, data)}
            enableRowOrdering={true}
            autoResetPageIndex={false}
            muiTableBodyRowDragHandleProps={({ table }) => ({
              onDragEnd: () => {
                const { draggingRow, hoveredRow } = table.getState();
                if (hoveredRow && draggingRow) {
                  data.splice(hoveredRow.index, 0, data.splice(draggingRow.index, 1)[0]);
                  setData([...data]);
                  linkSection.original.links = [...data];
                  handleRefetch();
                  setShowSaveOrderBtn(true);
                }
              }
            })}
          />
        </Grid>
      </Grid>
      <AddOrEditLink
        row={row}
        isNew={isNew}
        linkSection={linkSection}
        open={open}
        setOpen={setOpen}
        data={data}
        setData={setData}
        refetch={handleRefetch}
      />
      <DeleteLink
        row={row}
        linkSection={linkSection}
        open={openDelete}
        setOpen={setOpenDelete}
        data={data}
        setData={setData}
        refetch={handleRefetch}
      />
    </>
  );
}

export default LinkDataGrid;
