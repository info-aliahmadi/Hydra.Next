// material-ui
import { FormHelperText, Grid, TextField, Stack } from '@mui/material';

// assets
import { useTranslation } from 'react-i18next';

import SelectProductTag from '../ProductTag/SelectProductTag';

export default function ProductSEO({ operation, values, setFieldValue, handleBlur, handleChange, errors, touched }) {
  const [t, i18n] = useTranslation();
  const fieldsName = 'fields.product.';
  const handleCheckedChange = (event) => {
    setFieldValue(event.target.id, event.target.checked);
  };
  return (
    <Grid container item columnSpacing={3}>
      <Grid container item spacing={3} xs={12} sm={12} md={12} lg={8} xl={8}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Stack>
            <SelectProductTag
              defaultValues={values?.productTags || []}
              id="productTags"
              name="productTags"
              label={t(fieldsName + 'productTags')}
              setFieldValue={setFieldValue}
              error={Boolean(touched.productTags && errors.productTags)}
            />
            {touched.productTags && errors.productTags && (
              <FormHelperText error id="helper-tagIds">
                {errors.productTags}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Stack>
            <TextField
              id="metaTitle"
              name="metaTitle"
              type="text"
              value={values?.metaTitle || ''}
              label={t(fieldsName + 'metaTitle')}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              error={Boolean(touched.metaTitle && errors.metaTitle)}
            />
            {touched.metaTitle && errors.metaTitle && (
              <FormHelperText error id="helper-text">
                {errors.metaTitle}
              </FormHelperText>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Stack>
            <TextField
              id="metaKeywords"
              name="metaKeywords"
              type="text"
              value={values?.metaKeywords || ''}
              label={t(fieldsName + 'metaKeywords')}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t(fieldsName + 'metaKeywords')}
              fullWidth
              error={Boolean(touched.metaKeywords && errors.metaKeywords)}
            />
            {touched.metaKeywords && errors.metaKeywords && (
              <FormHelperText error id="helper-text">
                {errors.metaKeywords}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Stack>
            <TextField
              id="metaDescription"
              name="metaDescription"
              type="text"
              value={values?.metaDescription || ''}
              label={t(fieldsName + 'metaDescription')}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t(fieldsName + 'metaDescription')}
              fullWidth
              error={Boolean(touched.metaDescription && errors.metaDescription)}
            />
            {touched.metaDescription && errors.metaDescription && (
              <FormHelperText error id="helper-text">
                {errors.metaDescription}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
