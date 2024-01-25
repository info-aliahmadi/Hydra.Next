// material-ui
import { FormHelperText, Grid, TextField, Stack, Chip, Divider } from '@mui/material';

// assets
import { useTranslation } from 'react-i18next';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SelectProductAttribute from '../ProductAttribute/SelectProductAttribute';
import ProductAttributeInventory from './ProductAttributeInventory';
import { useState } from 'react';

export default function ProductInventory({ operation, values, setFieldValue, handleBlur, handleChange, errors, touched }) {
  const [t, i18n] = useTranslation();
  const fieldsName = 'fields.product.';
  const handleCheckedChange = (event) => {
    setFieldValue(event.target.id, event.target.checked);
  };


  const handleAttributeChange = (event, options) => {
    let allValues = event.target.value;

    // remove 
    if (allValues.length < values.inventories.length) {
      const modifiedInventories = values.inventories.filter(obj => {
        return allValues.find(x => x == obj.attributeId);
      });
      setFieldValue('inventories', modifiedInventories);

      // Add
    } else {
      let attributeId = allValues[allValues.length - 1];
      let name = options.find(x => x.id == attributeId).name;
      let modifiedInventories = [...values.inventories, { id: 0, attributeId: attributeId, attributeName: name, stockQuantity: '' }]
      setFieldValue('inventories', modifiedInventories);
    }
  };


  function AttributeInventory({ invenroty }) {
    const [value, setValue] = useState(invenroty.stockQuantity);
    const [newInvenroty, setNewInvenroty] = useState(values.inventories);
    function handleChange(event) {
      let newVa = event.target.value;
      setValue(newVa)
      let attributeId = parseInt(event.target.id);
      const modifiedInventories = values.inventories.map(obj => {
        if (obj.attributeId === attributeId) {
          return { ...obj, stockQuantity: newVa };
        }
        return obj;
      });
      setNewInvenroty(modifiedInventories);
    }
    function handleOnBlur() {
      setFieldValue('inventories', newInvenroty);
    }
    return <Grid item container spacing={1} xs={12} sm={12} md={12} lg={12} xl={12}>
      <Grid item xs={4} sm={4} md={3} lg={3} xl={3} p={2}>
        <Stack>
          <Chip label={invenroty.attributeName}></Chip>
        </Stack>
      </Grid>
      <Grid item xs={8} sm={8} md={6} lg={5} xl={5}>
        <Stack>
          <TextField
            id={invenroty.attributeId}
            name={invenroty.attributeId}
            type="number"
            value={value || ''}
            label={t(fieldsName + 'stockQuantity')}
            onChange={handleChange}
            onBlur={handleOnBlur}
            fullWidth
          />
        </Stack>
      </Grid>
    </Grid>
  }

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
        <Divider />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <ProductAttributeInventory setFieldValue={setFieldValue} values={values} />
          {touched.inventories && errors.inventories && (
              <FormHelperText error id="helper-text">
                {errors.inventories}
              </FormHelperText>
            )}
        </Grid>

        <Divider />

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
