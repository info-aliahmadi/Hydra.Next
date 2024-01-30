import { Box, Button, Chip, Grid, IconButton, Tooltip } from '@mui/material';
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Delete, Edit, RestoreFromTrash, PostAddOutlined, PushPin, Link } from '@mui/icons-material';
import DeleteArticle from './DeleteArticle';
import Notify from '@dashboard/_components/@extended/Notify';
import ArticlesService from '@dashboard/(cms)/_service/ArticlesService';
import { useRouter } from 'next/navigation';
import ArticleDetail from './ArticleDetail';
import { useSession } from 'next-auth/react';
import CONFIG from '/config';

// ===============================|| COLOR BOX ||=============================== //
export function ArticlesDataGrid() {
  const [t, i18n] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const [notify, setNotify] = useState({ open: false });

  const articlesService = new ArticlesService(jwt);

  const router = useRouter();

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
            size="small" />
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
          router.push('/dashboard/article/add/0');
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
              router.push('/dashboard/article/edit/' + row.original.id);
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
        <Tooltip arrow placement="top-start" title={t('buttons.visitorlink')}>
          <IconButton
            target='_blank'
            href={CONFIG.DOMAIN + "/blogpost/" + row.original.id + "/" + row.original.subject}
          >
            <Link />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );

  const ArticleHeader = ({ title }) => {
    return (
      <Grid container item direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <AddRow />
        </Grid>
        <Grid item>
          <Chip
            href="/dashboard/article/trash-list"
            clickable
            component="a"
            target="_blank"
            icon={<RestoreFromTrash />}
            title={t('pages.articlesTrash')}
            label={t(buttonName + 'trash')}
            variant="outlined"
            size="medium"
            color="error"
            sx={{ borderRadius: '16px' }} />
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
                size: 110 //make actions column wider
              }
            }} />
        </TableCard>
      </MainCard>
      <DeleteArticle row={row} open={openDelete} setOpen={setOpenDelete} refetch={handleRefetch} />
    </>
  );
}
