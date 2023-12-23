// material-ui
import { Avatar, Box, Button, CardMedia, Chip, Grid, IconButton, InputLabel, OutlinedInput, Tooltip } from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from 'components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from 'components/MaterialTable/MaterialTable';
import ArticlesService from 'modules/cms/services/ArticlesService';
import { Delete, Edit, RestoreFromTrash, PostAddOutlined, PushPin, EventNote } from '@mui/icons-material';
import CONFIG from 'config';
import { Stack } from '@mui/system';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import SelectTopic from '../../Topic/SelectTopic';
import ImageUpload from 'components/FileUpload/ImageUpload';
import SelectTag from '../../Tags/SelectTag';
import DeleteArticle from '../DeleteArticle';
import Notify from 'components/@extended/Notify';
// ===============================|| COLOR BOX ||=============================== //

function ArticlesDataGrid() {
  const [t, i18n] = useTranslation();

  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const [notify, setNotify] = useState({ open: false });

  const articlesService = new ArticlesService();

  const navigate = useNavigate();

  const [fieldsName, buttonName] = ['fields.article.', 'buttons.article.'];

  const columns = useMemo(
    () => [
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
        Cell: ({ renderedCellValue }) => (
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
        Cell: ({ renderedCellValue }) => (
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
        accessorKey: 'publishDate',
        header: t(fieldsName + 'publishDate'),
        type: 'dateTime'
      },
      {
        accessorKey: 'registerDate',
        header: t(fieldsName + 'registerDate'),
        type: 'dateTime'
      },
      {
        accessorKey: 'isDraft',
        header: t(fieldsName + 'isDraft'),
        type: 'boolean',
        enableResizing: true,
        maxSize: 100,
        Cell: ({ renderedCellValue }) => (
          <Chip
            variant="combined"
            color={renderedCellValue == true ? 'warning' : 'primary'}
            // icon={<>{renderedCellValue == true ? 'Published' : 'Draft'}</>}
            label={renderedCellValue == true ? t(fieldsName + 'draft') : t(fieldsName + 'published')}
            // sx={{ ml: 1.25, pl: 1 }}
            size="small"
          />
        )
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

  const handlePinRow = (articleId) => {
    articlesService
      .pinArticle(articleId)
      .then(() => {
        handleRefetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };
  const handleArticleList = useCallback(async (filters) => {
    return await articlesService.getArticleList(filters);
  }, []);
  const AddRow = useCallback(
    () => (
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          navigate('/article/add/0');
        }}
        startIcon={<PostAddOutlined />}
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
              navigate('/article/edit/' + row.original.id);
            }}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.pin')}>
          <IconButton onClick={() => handlePinRow(row.original.id)} color={row.original.isPinned ? 'warning' : 'secondary'}>
            <PushPin />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );
  const ArticleDetail = ({ row }) => {
    return (
      <Grid container spacing={3} direction="row" justifyContent="flex-start" alignItems="flex-start">
        <Grid container item spacing={3} xs={12} sm={6} md={3} lg={3} xd={3} direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12} md={12}>
            <Stack>
              {row.original.previewImageId && <ImageUpload value={row.original.previewImageId} disabled={true} filePosterMaxHeight={300} />}
              {row.original.previewImageUrl && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <CardMedia component="img" height="100" image={row.original.imagePreviewUrl} alt="Preview" />
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
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
              <InputLabel htmlFor="subject">{t(fieldsName + 'subject')}</InputLabel>
              <OutlinedInput
                id="subject"
                type="text"
                value={row.original.subject}
                fullWidth
                disabled
                endAdornment={
                  <Chip
                    variant="combined"
                    color={row.original.isDraft == true ? 'warning' : 'primary'}
                    label={row.original.isDraft == true ? t(fieldsName + 'draft') : t(fieldsName + 'published')}
                    size="small"
                  />
                }
              />
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
          <Grid item xs={12} md={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="publishDate">{t(fieldsName + 'publishDate')}</InputLabel>
              <OutlinedInput
                id="publishDate"
                type="text"
                value={new Intl.DateTimeFormat(i18n.language, {
                  dateStyle: 'long',
                  timeStyle: [CONFIG.TIME_STYLE],
                  hour12: false
                }).format(moment(row.original.publishDate))}
                fullWidth
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="topicsIds">{t(fieldsName + 'topicsIds')}</InputLabel>
              <SelectTopic disabled defaultValues={row.original.topicsIds} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="tags">{t(fieldsName + 'tags')}</InputLabel>
              <SelectTag defaultValues={row.original.tags || []} disabled={true} />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  const ArticleHeader = ({ title }) => {
    return (
      <Grid container item direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <AddRow />
        </Grid>
        <Grid item>
          <Chip
            href="/ArticlesTrashList"
            clickable
            component="a"
            target="_blank"
            icon={<RestoreFromTrash />}
            title={t('pages.articlesTrash')}
            label={t(buttonName + 'trash')}
            variant="outlined"
            size="medium"
            color="error"
            sx={{ borderRadius: '16px' }}
          />
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <MainCard title={<ArticleHeader title={t('pages.cards.articles-list')} />}>
        <TableCard>
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataApi={handleArticleList}
            enableRowActions={true}
            renderRowActions={DeleteOrEdit}
            renderDetailPanel={({ row }) => <ArticleDetail row={row} />}
            displayColumnDefOptions={{
              'mrt-row-actions': {
                //header: 'Change Account Settings', //change header text
                size: 80 //make actions column wider
              }
            }}
          />
        </TableCard>
      </MainCard>
      <DeleteArticle row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}

export default ArticlesDataGrid;
