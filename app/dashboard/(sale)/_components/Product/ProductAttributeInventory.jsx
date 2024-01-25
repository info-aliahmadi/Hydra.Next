// material-ui
import { Grid, TextField, Stack, Chip } from '@mui/material';

// assets
import { useTranslation } from 'react-i18next';

import SelectProductAttribute from '../ProductAttribute/SelectProductAttribute';
import { useState } from 'react';

export default function ProductAttributeInventory({ values, setFieldValue }) {
  const [t] = useTranslation();
  const fieldsName = 'fields.product.';

  const handleAttributeChange = (event, options) => {
    let allValues = event.target.value;

    // remove 
    if (values.inventories && allValues.length < values.inventories.length) {
      const modifiedInventories = values.inventories.filter(obj => {
        return allValues.find(x => x == obj.attributeId);
      });
      setFieldValue('inventories', modifiedInventories);

      // Add
    } else {
      let attributeId = allValues[allValues.length - 1];
      let name = options.find(x => x.id == attributeId).name;
      let modifiedInventories = [];
      if (values.inventories) {
        modifiedInventories = [...values.inventories, { id: 0, attributeId: attributeId, attributeName: name, stockQuantity: 0, stockType: 1 }]
      } else {
        modifiedInventories = [{ id: 0, attributeId: attributeId, attributeName: name, stockQuantity: 0, stockType: 1 }]
      }
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
      setFieldValue('inventories', newInvenroty.filter(x => x.stockQuantity >= 0));
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
            value={value || 0}
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
    <>
      <Stack>
        <SelectProductAttribute
          defaultValues={values?.inventories?.filter(x => x.stockType == 1).map(x => x.attributeId) || []}
          id="inventoryAttributeIds"
          name="inventoryAttributeIds"
          label={t(fieldsName + 'attributeIds')}
          onChange={handleAttributeChange}
        />
      </Stack>
      <Stack>
        <Grid container spacing={1} xs={12} sm={12} md={12} lg={12} xl={12} pt={3}>
          {values?.inventories?.filter(x => x.stockType == 1).map((item, index) => <AttributeInventory key={index} invenroty={item} />)}

        </Grid>
      </Stack>
    </>
  );
}
