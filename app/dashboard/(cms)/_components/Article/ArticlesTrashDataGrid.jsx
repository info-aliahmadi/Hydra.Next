// material-ui
import { Box,  Chip, IconButton, Tooltip } from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { DeleteSweep, RestorePage } from '@mui/icons-material';
import RemoveArticle from './RemoveArticle';
import ArticlesService from '@dashboard/(cms)/_service/ArticlesService';
import ArticleDetail from './ArticleDetail';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

export default  function ArticlesTrashDataGrid() {
  const [t, i18n] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();

  const articleService = new ArticlesService(jwt);

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

