import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import GlobalService from '@dashboard/_service/GlobalService';

export default function SelectTopic({ defaultValues, id, name, setFieldValue, error, disabled, url }) {
  const [t] = useTranslation();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState();
  const globalService = new GlobalService();

  const loadAllData = () => {
    globalService.getAllForSelect(url).then((result) => {
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
    setFieldValue(id, event.target.value);
    setValues(event.target.value);
  };

  return (
    <FormControl error={error} disabled={disabled}>
      <Select
        id={id}
        name={name}
        className="select-topic"
        multiple
        value={values || ''}
        label={''}
        size="small"
        onChange={handleChange}
        MenuProps={MenuProps}
        input={<OutlinedInput label={t('pages.topics')} />}
        defaultValue={options?.filter((x) => defaultValues?.find((c) => c === x.id)) ?? []}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value, index) => {
              let title = options?.find((x) => x.id == value)?.title;
              return <Chip key={'chip-' + name + index} label={title} />;
            })}
          </Box>
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
