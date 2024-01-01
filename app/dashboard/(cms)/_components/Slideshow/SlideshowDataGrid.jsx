import { Avatar, Box, Button, IconButton, Tooltip } from '@mui/material';

import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import {
  Edit,
  Slideshow,
  Delete,
  Save,
  ImageNotSupported,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import Notify from '@dashboard/_components/@extended/Notify';
import { Stack } from '@mui/system';
import CONFIG from '/config';
import SlideshowService from '@dashboard/(cms)/_service/SlideshowService';
import AddOrEditSlideshow from './AddOrEditSlideshow';
import DeleteSlideshow from './DeleteSlideshow';
import { useSession } from 'next-auth/react';

function SlideshowDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const slideshowService = new SlideshowService(jwt);
  const [isNew, setIsNew] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const [data, setData] = useState([]);
  const [notify, setNotify] = useState({ open: false });
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  let mediaExtensions = CONFIG.IMAGES_EXTENSIONS.concat(CONFIG.VIDEOS_EXTENSIONS);

  const ImagePreviewRow = ({ renderedCellValue, row }) => {
    let src = renderedCellValue?.fileName
      ? mediaExtensions.some((extension) => extension == _.toLower(renderedCellValue?.extension))
        ? CONFIG.UPLOAD_BASEPATH + renderedCellValue.directory + renderedCellValue?.thumbnail
        : row.original.previewImageUrl
        ? row.original.previewImageUrl
        : null
      : null;

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        {src != null ? (
          <img alt="ImagePreview" src={src} height={'80px'} />
        ) : (
          <Avatar variant="rounded">
            <ImageNotSupported />
          </Avatar>
        )}
      </Box>
    );
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'previewImage',
        header: t('fields.slideshow.previewImage'),
        type: 'string',
        Cell: ({ renderedCellValue, row }) => <ImagePreviewRow renderedCellValue={renderedCellValue} row={row} />
      },
      {
        accessorKey: 'header',
        header: t('fields.slideshow.header'),
        enableClickToCopy: true,
        type: 'string'
      },
      {
        accessorKey: 'description',
        header: t('fields.slideshow.description'),
        enableClickToCopy: true,
        type: 'string'
      },
      {
        accessorKey: 'createDate',
        header: t('fields.slideshow.createDate'),
        enableClickToCopy: true,
        type: 'dateTime'
      },
      {
        accessorKey: 'user',
        header: t('fields.slideshow.user'),
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
            {renderedCellValue?.name}
          </Box>
        )
        // filterVariant: 'text' | 'select' | 'multi-select' | 'range' | 'range-slider' | 'checkbox',
      }
    ],
    []
  );
  useEffect(() => {
    loadSlideshowList();
  }, []);

  const handleNewRow = (row) => {
    setIsNew(true);
    setRow(row);
    setOpen(true);
  };

  const handleSaveOrder = (data) => {
    slideshowService
      .updateSlideshowOrders(data)
      .then((result) => {
        setNotify({ open: true });
        setShowSaveBtn(false);
        handleRefetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
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
  const loadSlideshowList = () => {
    slideshowService.getSlideshowList().then((result) => {
      setData(() => result.data);
      handleRefetch();
    });
  };

  const handleVisibleRow = (slideId) => {
    slideshowService
      .visibleSlideshow(slideId)
      .then(() => {
        loadSlideshowList();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };
  const AddOrOrderRow = useCallback(
    (showSaveBtn, data) => (
      <Stack spacing={2} direction="row">
        <Button color="primary" onClick={() => handleNewRow(null)} variant="contained" startIcon={<Slideshow />}>
          {t('buttons.slideshow.add')}
        </Button>
        {showSaveBtn && (
          <Button color="info" onClick={() => handleSaveOrder(data)} variant="contained" startIcon={<Save />}>
            {t('buttons.slideshow.saveOrder')}
          </Button>
        )}
      </Stack>
    ),
    []
  );
  const DeleteOrEdit = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.slideshow.delete')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.slideshow.edit')}>
          <IconButton onClick={() => handleEditRow(row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip
          arrow
          placement="right"
          title={row.original.isVisible ? t('buttons.slideshow.visibleOff') : t('buttons.slideshow.visible')}
        >
          <IconButton onClick={() => handleVisibleRow(row.original.id)} color={row.original.isVisible ? 'secondary' : 'warning'}>
            {row.original.isVisible ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <MainCard title={AddOrOrderRow(showSaveBtn, data)}>
        <TableCard>
          <MaterialTable
            //key={'id' + refetch}
            dataSet={data}
            refetch={refetch}
            columns={columns}
            // dataApi={handleSlideshowList}
            enablePagination={false}
            enableColumnOrdering={false}
            enableColumnFilters={false}
            enableColumnResizing={false}
            enableBottomToolbar={false}
            enableGlobalFilterModes={false}
            enableColumnFilterModes={false}
            enableRowActions
            renderRowActions={DeleteOrEdit}
            // renderTopToolbarCustomActions={() => AddOrOrderRow(showSaveBtn, data)}
            enableRowOrdering={true}
            autoResetPageIndex={false}
            muiTableBodyRowDragHandleProps={({ table }) => ({
              onDragEnd: () => {
                const { draggingRow, hoveredRow } = table.getState();
                if (hoveredRow && draggingRow) {
                  data.splice(hoveredRow.index, 0, data.splice(draggingRow.index, 1)[0]);
                  setData([...data]);
                  handleRefetch();
                  setShowSaveBtn(true);
                }
              }
            })}
          />
        </TableCard>
      </MainCard>
      <AddOrEditSlideshow isNew={isNew} row={row} open={open} setOpen={setOpen} refetch={loadSlideshowList} />
      <DeleteSlideshow row={row} open={openDelete} setOpen={setOpenDelete} refetch={loadSlideshowList} />
    </>
  );
}

export default SlideshowDataGrid;
