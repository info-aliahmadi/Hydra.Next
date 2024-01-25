import * as React from 'react';
import { useState, useEffect } from 'react';
import { Chip, FormControl, MenuItem, OutlinedInput, Select, InputLabel } from '@mui/material';
import { Box, useTheme } from '@mui/system';
// import GlobalService from '@dashboard/_service/GlobalService';

export default function MultiSelect({ defaultValues, id, name, label, optionLabel, setFieldValue, onChange, error, disabled, dataApi, sx }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState();
  const [values, setValues] = useState();

  const loadAllData = () => {
    dataApi.then((result) => {
      setOptions(result?.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    setValues(defaultValues);
  }, [JSON.stringify(defaultValues)]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };
  function getStyles(value, values, theme) {
    return {
      fontWeight: values.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
  }

  const handleChange = (event) => {
    if (onChange) {
      onChange(event, options);
    } else {
      setFieldValue(id, event.target.value);
      setValues(event.target.value);
    }
  };

  return (
    <FormControl error={error} disabled={disabled}>
      <InputLabel htmlFor={id} sx={{ overflow: 'visible' }}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        className="select-margin"
        multiple
        value={values || ''}
        label={label}
        size="medium"
        onChange={handleChange}
        MenuProps={MenuProps}
        input={<OutlinedInput label={label} sx={{ minHeight: '41px' }} />}
        defaultValue={options?.filter((x) => defaultValues?.find((c) => c === x.id)) ?? []}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value, index) => {
              return <Chip key={'chip-' + name + index} label={options?.find((x) => x.id == value)?.[optionLabel]} sx={{ height: '23px' }} />;
            })}
          </Box>
        )}
        sx={sx}
      >
        {options?.map((item) => {
          return (
            <MenuItem key={'menu-' + name + item.id} value={item.id} style={getStyles(item.id, values, theme)}>
              <span style={{ 'white-space': 'pre-wrap' }}>{item?.[optionLabel]}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
