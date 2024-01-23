// material-ui
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Tooltip
} from '@mui/material';

// project import
import MainCard from '@dashboard/_components/MainCard';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductsService from '@dashboard/(sale)/_service/ProductService';
import { ImageNotSupported, Delete, Edit } from '@mui/icons-material';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import CONFIG from '/config';
import { Stack } from '@mui/system';
import moment from 'moment';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import TableCard from '@dashboard/_components/TableCard';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
// ===============================|| COLOR BOX ||=============================== //

export default function ProductDataGrid() {
  const [t, i18n] = useTranslation();

  const { data: session } = useSession();

  const jwt = session?.user?.accessToken;

  const service = new ProductsService(jwt);
  const router = useRouter();

  const [fieldsName, buttonName] = ['fields.product.', 'buttons.product.'];

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
        accessorKey: 'name',
        header: t(fieldsName + 'name'),
        enableClickToCopy: true,
        type: 'string'
        // filterVariant: 'text' | 'select' | 'multi-select' | 'range' | 'range-slider' | 'checkbox',
      },
      {
        accessorKey: 'stockQuantity',
        header: t(fieldsName + 'stockQuantity'),
        enableClickToCopy: true,
        type: 'number',
        enableResizing: true
      },
      {
        accessorKey: 'price',
        header: t(fieldsName + 'price'),
        type: 'decimal',
        enableResizing: true
      },
      {
        accessorKey: 'published',
        header: t(fieldsName + 'published'),
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
        accessorKey: 'updatedOnUtc',
        header: t(fieldsName + 'updatedOnUtc'),
        type: 'dateTime'
      },
      {
        accessorKey: 'createdOnUtc',
        header: t(fieldsName + 'createdOnUtc'),
        type: 'dateTime'
      }
    ],
    []
  );

  const handleProductList = useCallback(async (filters) => {
    return await service.getProductList(filters);
  }, []);
  const AddRow = useCallback(
    () => (
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          router.push('/dashboard/product/add/0');
        }}
        startIcon={<AddBusinessOutlinedIcon />}
      >
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
          <IconButton onClick={() => router.push('/dashboard/product/edit/' + row.original.id)}>
            <Edit />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );
  const ProductDetail = ({ row }) => {
    return (
      <Grid container spacing={3} direction="row">
        <Grid container item spacing={3} xd={12} sm={6} md={3} lg={3} direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12} md={12}>
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
                  loading="lazy"
                  alt="profile product"
                  src={row.original.avatar ? CONFIG.AVATAR_BASEPATH + row.original.avatar : '/images/products/anonymous.png'}
                  sx={{ width: 100, height: 100 }}
                ></Avatar>
                <span>{row.original.name}</span>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Grid container item spacing={3} xd={12} sm={6} md={6} lg={6}>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="name">{t(fieldsName + 'name')}</InputLabel>
              <OutlinedInput id="name" type="text" value={row.original.name} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="productName">{t(fieldsName + 'productName')}</InputLabel>
              <OutlinedInput id="productName" type="text" value={row.original.productName} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">{t(fieldsName + 'email')}</InputLabel>
              <OutlinedInput id="email" type="text" value={row.original.email} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="emailConfirmed">{t(fieldsName + 'emailConfirmed')}</InputLabel>
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    id="emailConfirmed"
                    checked={row.original.emailConfirmed ? true : false}
                    title={row.original.emailConfirmed ? 'Yes' : 'No'}
                    color="default"
                    disabled
                  />
                }
                label={t(fieldsName + 'emailConfirmed')}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phoneNumber">{t(fieldsName + 'phoneNumber')}</InputLabel>
              <OutlinedInput id="phoneNumber" type="text" value={row.original.phoneNumber} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phoneNumberConfirmed">{t(fieldsName + 'phoneNumberConfirmed')}</InputLabel>{' '}
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    id="phoneNumberConfirmed"
                    checked={row.original.phoneNumberConfirmed ? true : false}
                    title={row.original.phoneNumberConfirmed ? 'Yes' : 'No'}
                    color="default"
                    disabled
                  />
                }
                label={t(fieldsName + 'phoneNumberConfirmed')}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="registerDate">{t(fieldsName + 'registerDate')}</InputLabel>
              <OutlinedInput
                id="registerDate"
                type="text"
                value={new Intl.DateTimeFormat(i18n.language, {
                  dateStyle: 'long',
                  timeStyle: [CONFIG.TIME_STYLE],
                  hour12: false
                }).format(moment(row.original.registerDate))}
                fullWidth
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="lockoutEnabled">{t(fieldsName + 'lockoutEnabled')}</InputLabel>
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    id="lockoutEnabled"
                    checked={row.original.lockoutEnabled ? true : false}
                    title={row.original.lockoutEnabled ? 'Yes' : 'No'}
                    color="default"
                    disabled
                  />
                }
                label={t(fieldsName + 'lockoutEnabled')}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="lockoutEnd">{t(fieldsName + 'lockoutEnd')}</InputLabel>
              <OutlinedInput id="lockoutEnd" type="text" value={row.original.lockoutEnd} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="accessFailedCount">{t(fieldsName + 'accessFailedCount')}</InputLabel>
              <OutlinedInput id="accessFailedCount" type="text" value={row.original.accessFailedCount} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="defaultLanguage">{t(fieldsName + 'defaultLanguage')}</InputLabel>
              <OutlinedInput id="defaultLanguage" type="text" value={row.original.defaultLanguage} fullWidth disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={1}>
              <InputLabel htmlFor="roles">{t('pages.roles')}</InputLabel>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <MainCard title={<AddRow />}>
        <TableCard>
          <MaterialTable
            columns={columns}
            dataApi={handleProductList}
            enableRowActions
            // renderTopToolbarCustomActions={AddRow}
            renderRowActions={DeleteOrEdit}
            renderDetailPanel={({ row }) => <ProductDetail row={row} />}
          />
        </TableCard>
      </MainCard>
    </>
  );
}

