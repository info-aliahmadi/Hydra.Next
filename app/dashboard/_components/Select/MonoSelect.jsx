import * as React from 'react';
import { useState, useEffect } from 'react';
import { Chip, FormControl, MenuItem, OutlinedInput, Select, InputLabel } from '@mui/material';
import { Box, useTheme } from '@mui/system';
// import GlobalService from '@dashboard/_service/GlobalService';

export default function MonoSelect({ defaultValue, id, name, label, titleName, setFieldValue, error, disabled, dataApi}) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState();

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
    setValue(defaultValue);
  }, [defaultValue]);

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
  function getStyles(value, defaultValue, theme) {
    return {
      fontWeight: defaultValue === value ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular
    };
  }

  const handleChange = (event) => {
    setFieldValue(id, event.target.value);
    setValue(event.target.value);
  };

  return (
    <FormControl error={error} disabled={disabled}>
      <InputLabel htmlFor={id} sx={{ overflow: 'visible' }}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        className="select-margin"
        value={value || ''}
        label={label}
        size="medium"
        onChange={handleChange}
        MenuProps={MenuProps}
        input={<OutlinedInput label={label} sx={{ minHeight: '41px' }} />}
        defaultValue={options?.filter((x) => x.id == defaultValue) ?? ''}
        renderValue={(selected) => (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          <Chip label={options?.find((x) => x.id == selected)?.[titleName]} sx={{ height: '23px' }} />
        </Box>
        )}
      >
        {options?.map((item) => {
          return (
            <MenuItem key={'menu-' + name + item.id} value={item.id} style={getStyles(item.id, value, theme)}>
              <span style={{ 'white-space': 'pre-wrap' }}>{item?.[titleName]}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
