// material-ui
import { Avatar, Chip, FormHelperText, Grid, InputLabel, TextField, Stack } from '@mui/material';
import { EventNote } from '@mui/icons-material';

// assets
import { useTranslation } from 'react-i18next';
import CONFIG from '/config';

import moment from 'moment';
// import Editor from '@dashboard/_components/Editor/Editor';
import ImageUpload from '@dashboard/_components/FileUpload/ImageUpload';
import DateTimeInput from '@dashboard/_components/DateTime/DateTimeInput';
import SelectDeliveryDate from '../DeliveryDate/SelectDeliveryDate';
import SelectTaxCategory from '../TaxCategory/SelectTaxCategory';
import SelectCategory from '../Category/SelectCategory';
import SelectManufacturer from '../Manufacturer/SelectManufacturer';
import Editor from '@dashboard/_components/Editor/Editor';
import ProductsAutoComplete from './ProductAutoComplete';

export default function ProductBaseInfo({ operation, values, setFieldValue, handleBlur, handleChange, errors, touched }) {
  const [t, i18n] = useTranslation();

  const fieldsName = 'fields.product.';

  return (
    <Grid container item columnSpacing={3} alignItems="flex-start">
      <Grid container item spacing={3} xs={12} sm={12} md={12} lg={8} xl={8}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Stack>
            <TextField
              id="name"
              type="text"
              value={values?.name || ''}
              label={t(fieldsName + 'name')}
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              error={Boolean(touched.name && errors.name)}
            />
            {touched.name && errors.name && (
              <FormHelperText error id="helper-text">
                {errors.name}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Stack>
            <TextField
              id="shortDescription"
              name="shortDescription"
              type="text"
              value={values?.shortDescription || ''}
              label={t(fieldsName + 'shortDescription')}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              error={Boolean(touched.shortDescription && errors.shortDescription)}
            />
            {touched.shortDescription && errors.shortDescription && (
              <FormHelperText error id="helper-text">
                {errors.shortDescription}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Stack>
            <Editor
              id={'fullDescription'}
              name={'fullDescription'}
              defaultValue={values?.fullDescription || ''}
              setFieldValue={setFieldValue}
            />
              {touched.fullDescription && errors.fullDescription && (
              <FormHelperText error id="helper-text">
                {errors.fullDescription}
              </FormHelperText>
            )}
            {operation == 'edit' && (
              <Grid>
                {t(fieldsName + 'createUser') + ' : '}
                <Chip
                  title={t(fieldsName + 'createUser')}
                  avatar={<Avatar src={CONFIG.AVATAR_BASEPATH + values.createUser?.avatar} />}
                  label={values.createUser?.userName}
                  variant="filled"
                  size="small"
                  sx={{ borderRadius: '16px' }}
                />{' '}
                <Chip
                  icon={<EventNote />}
                  title={t(fieldsName + 'createdOnUtc')}
                  label={new Intl.DateTimeFormat(i18n.language, {
                    dateStyle: [CONFIG.DATE_STYLE],
                    timeStyle: [CONFIG.TIME_STYLE],
                    hour12: false
                  }).format(moment(values.createdOnUtc))}
                  variant="filled"
                  size="small"
                  sx={{ borderRadius: '16px' }}
                />{' '}
                {values.updateUser?.userName && (
                  <Grid>
                    {t(fieldsName + 'editedBy') + ' : '}
                    <Chip
                      title={t(fieldsName + 'editor')}
                      avatar={<Avatar src={CONFIG.AVATAR_BASEPATH + values.updateUser?.avatar} />}
                      label={values.updateUser?.userName}
                      variant="filled"
                      size="small"
                      sx={{ borderRadius: '16px' }}
                    />{' '}
                    <Chip
                      icon={<EventNote />}
                      title={t(fieldsName + 'updatedOnUtc')}
                      label={new Intl.DateTimeFormat(i18n.language, {
                        dateStyle: [CONFIG.DATE_STYLE],
                        timeStyle: [CONFIG.TIME_STYLE],
                        hour12: false
                      }).format(moment(values.updatedOnUtc))}
                      variant="filled"
                      size="small"
                      sx={{ borderRadius: '16px' }}
                    />{' '}
                  </Grid>
                )}
              </Grid>
            )}
            {touched.fullDescription && errors.fullDescription && (
              <FormHelperText error id="helper-text">
                {errors.fullDescription}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <SelectDeliveryDate
              defaultValue={values?.deliveryDateId || ''}
              id="deliveryDateId"
              label={t(fieldsName + 'deliveryDateId')}
              name="deliveryDateId"
              setFieldValue={setFieldValue}
              error={Boolean(touched.deliveryDateId && errors.deliveryDateId)}
            />
            {touched.deliveryDateId && errors.deliveryDateId && (
              <FormHelperText error id="helper-text">
                {errors.deliveryDateId}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <SelectTaxCategory
              defaultValue={values?.taxCategoryId || ''}
              id="taxCategoryId"
              name="taxCategoryId"
              label={t(fieldsName + 'taxCategoryId')}
              setFieldValue={setFieldValue}
              error={Boolean(touched.taxCategoryId && errors.taxCategoryId)}
            />
            {touched.taxCategoryId && errors.taxCategoryId && (
              <FormHelperText error id="helper-text">
                {errors.taxCategoryId}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <TextField
              id="price"
              type="number"
              value={values?.price || ''}
              name="price"
              label={t(fieldsName + 'price')}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              error={Boolean(touched.price && errors.price)}
            />
            {touched.price && errors.price && (
              <FormHelperText error id="helper-text">
                {errors.price}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <TextField
              id="oldPrice"
              type="number"
              value={values?.oldPrice || ''}
              name="oldPrice"
              label={t(fieldsName + 'oldPrice')}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              error={Boolean(touched.oldPrice && errors.oldPrice)}
            />
            {touched.oldPrice && errors.oldPrice && (
              <FormHelperText error id="helper-text">
                {errors.oldPrice}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <TextField
              id="weight"
              type="text"
              value={values?.weight || ''}
              name="weight"
              label={t(fieldsName + 'weight')}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              error={Boolean(touched.weight && errors.weight)}
            />
            {touched.weight && errors.weight && (
              <FormHelperText error id="helper-text">
                {errors.weight}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <TextField
              id="length"
              type="text"
              value={values?.length || ''}
              name="length"
              label={t(fieldsName + 'length')}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              error={Boolean(touched.length && errors.length)}
            />
            {touched.length && errors.length && (
              <FormHelperText error id="helper-text">
                {errors.length}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <TextField
              id="width"
              type="text"
              value={values?.width || ''}
              name="width"
              label={t(fieldsName + 'width')}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              error={Boolean(touched.width && errors.width)}
            />
            {touched.width && errors.width && (
              <FormHelperText error id="helper-text">
                {errors.width}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <TextField
              id="height"
              type="text"
              value={values?.height || ''}
              name="height"
              label={t(fieldsName + 'height')}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              error={Boolean(touched.height && errors.height)}
            />
            {touched.height && errors.height && (
              <FormHelperText error id="helper-text">
                {errors.height}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <SelectCategory
              defaultValues={values?.categoryIds || []}
              id="categoryIds"
              name="categoryIds"
              label={t(fieldsName + 'categoryIds')}
              setFieldValue={setFieldValue}
              error={Boolean(touched.categoryIds && errors.categoryIds)}
            />
            {touched.categoryIds && errors.categoryIds && (
              <FormHelperText error id="helper-text">
                {errors.categoryIds}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <SelectManufacturer
              defaultValues={values?.manufacturerIds || []}
              id="manufacturerIds"
              name="manufacturerIds"
              label={t(fieldsName + 'manufacturerIds')}
              setFieldValue={setFieldValue}
              error={Boolean(touched.manufacturerIds && errors.manufacturerIds)}
            />
            {touched.manufacturerIds && errors.manufacturerIds && (
              <FormHelperText error id="helper-text">
                {errors.manufacturerIds}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <DateTimeInput
              id="availableStartDateTimeUtc"
              name="availableStartDateTimeUtc"
              label={t(fieldsName + 'availableStartDateTimeUtc')}
              setFieldValue={setFieldValue}
              placeholder={t(fieldsName + 'availableStartDateTimeUtc')}
              defaultValue={values?.availableStartDateTimeUtc || ''}
              error={Boolean(touched.availableStartDateTimeUtc && errors.availableStartDateTimeUtc)}
            />
            {touched.availableStartDateTimeUtc && errors.availableStartDateTimeUtc && (
              <FormHelperText error id="helper-text">
                {errors.availableStartDateTimeUtc}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <Stack>
            <DateTimeInput
              id="availableEndDateTimeUtc"
              name="availableEndDateTimeUtc"
              label={t(fieldsName + 'availableEndDateTimeUtc')}
              setFieldValue={setFieldValue}
              placeholder={t(fieldsName + 'availableEndDateTimeUtc')}
              defaultValue={values?.availableEndDateTimeUtc || ''}
              error={Boolean(touched.availableEndDateTimeUtc && errors.availableEndDateTimeUtc)}
            />
            {touched.availableEndDateTimeUtc && errors.availableEndDateTimeUtc && (
              <FormHelperText error id="helper-text">
                {errors.availableEndDateTimeUtc}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Stack>
            <ProductsAutoComplete
              id="relatedProductIds"
              name="relatedProductIds"
              type="number"
              defaultValues={values?.relatedProductIds || []}
              label={t(fieldsName + 'relatedProductIds')}
              setFieldValue={setFieldValue}
              error={Boolean(touched.relatedProductIds && errors.stocrelatedProductIdskQuantity)}
            />
            {touched.relatedProductIds && errors.relatedProductIds && (
              <FormHelperText error id="helper-text">
                {errors.relatedProductIds}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Stack>
          <InputLabel htmlFor="pictureIds" sx={{textAlign : 'center' , mb : '5px'}}  p={2}>{t(fieldsName + 'pictureIds')}</InputLabel>
          <ImageUpload
            id="pictureIds"
            name="pictureIds"
            setFieldValue={setFieldValue}
            value={values?.pictureIds || []}
            filePosterMaxHeight={200}
            allowMultiple={true}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}