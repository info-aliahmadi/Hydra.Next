// material-ui
import { Avatar, Box, Button, CardMedia, Chip, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Tooltip } from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete, Edit, Description, EventNote, Link } from '@mui/icons-material';
import CONFIG from '/config';
import { Stack } from '@mui/system';
import moment from 'moment';
import Notify from '@dashboard/_components/@extended/Notify';
import PagesService from '@dashboard/(cms)/_service/PagesService';
import SelectTag from '../Tag/SelectTag';
import { useRouter } from 'next/navigation';
import DeletePage from './DeletePage';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

function PagesDataGrid() {
  const [t, i18n] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;


  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const [notify, setNotify] = useState({ open: false });

  const pagesService = new PagesService(jwt);

  const router = useRouter();

  const [fieldsName, buttonName] = ['fields.page.', 'buttons.page.'];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'pageTitle',
        header: t(fieldsName + 'pageTitle'),
        enableClickToCopy: true,
        type: 'string',
        enableResizing: true
      },
      {
        accessorKey: 'subject',
        header: t(fieldsName + 'subject'),
        enableClickToCopy: true,
        type: 'string',
        enableResizing: true
      },
      {
        accessorKey: 'writer',
        header: t(fieldsName + 'writer'),
        enableClickToCopy: true,
        type: 'string',
        enableResizing: true,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            {renderedCellValue.name}
          </Box>
        )
      },
      {
        accessorKey: 'editor',
        header: t(fieldsName + 'editor'),
        enableClickToCopy: true,
        type: 'string',
        enableResizing: true,
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
      },
      {
        accessorKey: 'registerDate',
        header: t(fieldsName + 'registerDate'),
        type: 'dateTime'
      }
    ],
    []
  );
  const handleDeleteRow = (row) => {
    setRow(row);
    setOpenDelete(true);
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handlePinRow = (pageId) => {
    pagesService
      .pinPage(pageId)
      .then(() => {
        handleRefetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };
  const handlePageList = useCallback(async (filters) => {
    return await pagesService.getPageList(filters);
  }, []);
  const AddRow = useCallback(
    () => (
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          router.push('/dashboard/page/add/0');
        }}
        startIcon={<Description />}
      >
        {t(buttonName + 'add')}
      </Button>
    ),
    []
  );
  const DeleteOrEdit = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'nowrap' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.delete')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.edit')}>
          <IconButton
            onClick={() => {
              router.push('/dashboard/page/edit/' + row.original.id);
            }}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.visitorlink')}>
          <IconButton
            target='_blank'
            href={CONFIG.DOMAIN + "/page/" + row.original.id + "/" + row.original.pageTitle}
          >
            <Link />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );
  const PageDetail = ({ row }) => {
    return (
      <Grid container spacing={3} direction="row" justifyContent="center" alignItems="flex-start">
        <Grid
          container
          item
          spacing={3}
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xd={6}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="pageTitle">{t(fieldsName + 'pageTitle')}</InputLabel>
              <OutlinedInput
                id="pageTitle"
                type="text"
                value={row.original.pageTitle}
                fullWidth
                disabled
                startAdornment={<InputAdornment position="start">{CONFIG.FRONT_PATH + '/Page/'}</InputAdornment>}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="subject">{t(fieldsName + 'subject')}</InputLabel>
              <OutlinedInput id="subject" type="text" value={row.original.subject} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="body">{t(fieldsName + 'body')}</InputLabel>
              <div className="MuiOutlinedvid-notchedOutline" dangerouslySetInnerHTML={{ __html: row.original.body }} />
              <Grid>
                {t(fieldsName + 'writedBy') + ' : '}
                <Chip
                  title={t(fieldsName + 'writer')}
                  avatar={<Avatar src={CONFIG.AVATAR_BASEPATH + row.original.writer?.avatar} />}
                  label={row.original.writer?.userName}
                  variant="filled"
                  size="small"
                  sx={{ borderRadius: '16px' }}
                />{' '}
                <Chip
                  icon={<EventNote />}
                  title={t(fieldsName + 'registerDate')}
                  label={new Intl.DateTimeFormat(i18n.language, {
                    dateStyle: [CONFIG.DATE_STYLE],
                    timeStyle: [CONFIG.TIME_STYLE],
                    hour12: false
                  }).format(moment(row.original.registerDate))}
                  variant="filled"
                  size="small"
                  sx={{ borderRadius: '16px' }}
                />{' '}
                {row.original.editor?.userName && (
                  <>
                    {t(fieldsName + 'editedBy') + ' : '}
                    <Chip
                      title={t(fieldsName + 'editor')}
                      avatar={<Avatar src={CONFIG.AVATAR_BASEPATH + row.original.editor?.avatar} />}
                      label={row.original.editor?.userName}
                      variant="filled"
                      size="small"
                      sx={{ borderRadius: '16px' }}
                    />{' '}
                    <Chip
                      icon={<EventNote />}
                      title={t(fieldsName + 'editDate')}
                      label={new Intl.DateTimeFormat(i18n.language, {
                        dateStyle: [CONFIG.DATE_STYLE],
                        timeStyle: [CONFIG.TIME_STYLE],
                        hour12: false
                      }).format(moment(row.original.editDate))}
                      variant="filled"
                      size="small"
                      sx={{ borderRadius: '16px' }}
                    />{' '}
                  </>
                )}
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="tags">{t(fieldsName + 'tags')}</InputLabel>
              <SelectTag defaultValues={row.original.tags || []} disabled={true} />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <MainCard title={<AddRow />}>
        <TableCard>
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataApi={handlePageList}
            enableRowActions={true}
            renderRowActions={DeleteOrEdit}
            // renderTopToolbarCustomActions={AddRow}
            renderDetailPanel={({ row }) => <PageDetail row={row} />}
          />
        </TableCard>
      </MainCard>
      <DeletePage row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}

export default PagesDataGrid;
