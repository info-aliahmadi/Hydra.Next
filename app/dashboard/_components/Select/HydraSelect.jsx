import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Box, useTheme } from '@mui/system';

export default function HydraSelect({ defaultValue, id, name, setFieldValue, error, disabled, loadDataForSelect }) {
  const [t] = useTranslation();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState();

  const loadAllDataForSelect = () => {
    loadDataForSelect().then((result) => {
      setOptions(result?.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadAllDataForSelect();
  }, []);

  useEffect(() => {
    setValues(defaultValue);
  }, [JSON.stringify(defaultValue)]);

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
      fontWeight: theme.typography.fontWeightRegular
    };
  }

  const handleChange = (event) => {
    setFieldValue(id, event.target.value);
    setValues(event.target.value);
  };

  return (
    <FormControl error={error} disabled={disabled}>
      <Select
        id={id}
        name={name}
        // className="select-topic"
        value={values || ''}
        label='Test'
        size="small"
        onChange={handleChange}
        MenuProps={MenuProps}
        input={<OutlinedInput label={t('pages.topics')} />}
        defaultValue={options?.filter((x) => defaultValue === x.id) ?? []}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{options?.find((x) => x.id == selected)?.title}</Box>
        )}
      >
        {options?.map((item) => {
          return (
            <MenuItem key={'menu-' + name + item.id} value={item.id} style={getStyles(item.id, values, theme)}>
              <span style={{ 'white-space': 'pre-wrap' }}>{item.title}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
