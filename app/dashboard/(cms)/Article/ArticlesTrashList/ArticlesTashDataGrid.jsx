// material-ui
import { Avatar, Box,  CardMedia, Chip, Grid, IconButton, InputLabel, OutlinedInput, Tooltip } from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import ArticlesService from 'modules/cms/services/ArticlesService';
import { DeleteSweep, RestorePage, EventNote } from '@mui/icons-material';
import CONFIG from 'config';
import { Stack } from '@mui/system';
import moment from 'moment';
import SelectTopic from '../../Topic/SelectTopic';
import ImageUpload from 'components/FileUpload/ImageUpload';
import SelectTag from '../../Tags/SelectTag';
import RemoveArticle from '../RemoveArticle';
// ===============================|| COLOR BOX ||=============================== //

function ArticlesTashDataGrid() {
  const [t, i18n] = useTranslation();

  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();

  const articleService = new ArticlesService();

  const [fieldsName] = ['fields.article.'];

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
        accessorKey: 'isDraft',
        header: t(fieldsName + 'isDraft'),
        type: 'boolean',
        enableResizing: true,
        Cell: ({ renderedCellValue, row }) => (
          <Chip
            variant="combined"
            color={renderedCellValue == true ? 'warning' : 'primary'}
            // icon={<>{renderedCellValue == true ? 'Published' : 'Draft'}</>}
            label={renderedCellValue == true ? t(fieldsName + 'draft') : t(fieldsName + 'published')}
            // sx={{ ml: 1.25, pl: 1 }}
            size="small"
          />
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
      }
    ],
    []
  );
  const handleDeleteRow = (row) => {
    setRow(row);
    setOpenDelete(true);
  };

  const handleRestoreRow = (row) => {
    let articleId = row.original.id;
    articleService
      .restoreArticle(articleId)
      .then(() => {
        handleRefetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };

  const handleRefetch = () => {
    setRefetch(Date.now());
  };

  const handleArticleList = useCallback(async (filters) => {
    return await articleService.getArticleTrashList(filters);
  }, []);

  const RemoveOrRestore = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.remove')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <DeleteSweep />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.restore')}>
          <IconButton onClick={() => handleRestoreRow(row)} color="success">
            <RestorePage />
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

  return (
    <>
      <MainCard title={t('pages.cards.articlesTrash-list')}>
        <TableCard>
          <MaterialTable
            refetch={refetch}
            columns={columns}
            dataApi={handleArticleList}
            enableRowActions
            renderRowActions={RemoveOrRestore}
            renderDetailPanel={({ row }) => <ArticleDetail row={row} />}
          />
        </TableCard>
      </MainCard>
      <RemoveArticle row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}

export default ArticlesTashDataGrid;
