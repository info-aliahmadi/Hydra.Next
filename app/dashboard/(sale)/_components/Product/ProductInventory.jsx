// material-ui
import { Avatar, Chip, FormHelperText, Grid, InputLabel, Link, TextField, Stack } from '@mui/material';
import { EventNote } from '@mui/icons-material';

// assets
import { useTranslation } from 'react-i18next';
import CONFIG from '/config';

import moment from 'moment';
import FileUpload from '@dashboard/_components/FileUpload/FileUpload';
import DateTimeInput from '@dashboard/_components/DateTime/DateTimeInput';
import SelectDeliveryDate from '../DeliveryDate/SelectDeliveryDate';
import SelectTaxCategory from '../TaxCategory/SelectTaxCategory';
import SelectCategory from '../Category/SelectCategory';
import SelectManufacturer from '../Manufacturer/SelectManufacturer';
import SelectDiscount from '../Discount/SelectDiscount';
import SelectProductTag from '../ProductTag/SelectProductTag';
import Editor from '@dashboard/_components/Editor/Editor';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function ProductInventory({ operation, values, setFieldValue, handleBlur, handleChange, errors, touched }) {
  const [t, i18n] = useTranslation();
  const fieldsName = 'fields.product.';
  const handleCheckedChange = (event) => {
    setFieldValue(event.target.id, event.target.checked);
  };
  return (
    <Grid container item columnSpacing={3}>
      <Grid container item spacing={3} xs={12} sm={12} md={12} lg={8} xl={8}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Stack>
            <TextField
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              value={values?.stockQuantity || ''}
              label={t(fieldsName + 'stockQuantity')}
              onBlur={handleBlur}
              onChange={handleChange}
              // placeholder={t(fieldsName + 'stockQuantity')}
              fullWidth
              error={Boolean(touched.stockQuantity && errors.stockQuantity)}
            />
            {touched.stockQuantity && errors.stockQuantity && (
              <FormHelperText error id="helper-text">
                {errors.stockQuantity}
              </FormHelperText>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Stack>
            <TextField
              id="minStockQuantity"
              name="minStockQuantity"
              type="number"
              value={values?.minStockQuantity || ''}
              label={t(fieldsName + 'minStockQuantity')}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t(fieldsName + 'minStockQuantity')}
              fullWidth
              error={Boolean(touched.minStockQuantity && errors.minStockQuantity)}
            />
            {touched.minStockQuantity && errors.minStockQuantity && (
              <FormHelperText error id="helper-text">
                {errors.minStockQuantity}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Stack>
            <TextField
              id="orderMinimumQuantity"
              name="orderMinimumQuantity"
              type="number"
              value={values?.orderMinimumQuantity || ''}
              label={t(fieldsName + 'orderMinimumQuantity')}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t(fieldsName + 'orderMinimumQuantity')}
              fullWidth
              error={Boolean(touched.orderMinimumQuantity && errors.orderMinimumQuantity)}
            />
            {touched.orderMinimumQuantity && errors.orderMinimumQuantity && (
              <FormHelperText error id="helper-text">
                {errors.orderMinimumQuantity}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Stack>
            <TextField
              id="orderMaximumQuantity"
              name="orderMaximumQuantity"
              type="number"
              value={values?.orderMaximumQuantity || ''}
              label={t(fieldsName + 'orderMaximumQuantity')}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t(fieldsName + 'orderMaximumQuantity')}
              fullWidth
              error={Boolean(touched.orderMaximumQuantity && errors.orderMaximumQuantity)}
            />
            {touched.orderMaximumQuantity && errors.orderMaximumQuantity && (
              <FormHelperText error id="helper-text">
                {errors.orderMaximumQuantity}
              </FormHelperText>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Stack>
            <FormControlLabel
              control={
                <Switch
                  id="notifyAdminForQuantityBelow"
                  name="notifyAdminForQuantityBelow"
                  checked={values?.notifyAdminForQuantityBelow != undefined ? values?.notifyAdminForQuantityBelow : false}
                  onChange={handleCheckedChange}
                />
              }
              label="Notify Admin For Quantity Below"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Stack>
            <FormControlLabel
              control={
                <Switch
                  id="allowedQuantities"
                  name="allowedQuantities"
                  checked={values?.allowedQuantities != undefined ? values?.allowedQuantities : true}
                  onChange={handleCheckedChange}
                />
              }
              label="Allowed Quantities"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Stack>
            <FormControlLabel
              control={
                <Switch
                  id="displayStockQuantity"
                  name="displayStockQuantity"
                  checked={values?.displayStockQuantity != undefined ? values?.displayStockQuantity : false}
                  onChange={handleCheckedChange}
                />
              }
              label="Display Stock Quantity"
            />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
