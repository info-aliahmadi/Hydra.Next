import * as React from 'react';
import { useState, useEffect } from 'react';
import { Chip, FormControl, MenuItem, OutlinedInput, Select, InputLabel ,Box, useTheme,Theme } from '@mui/material';

interface MonoSelectProps {
  defaultValue: any,
  id: string,
  name: string,
  label: string,
  titleName: string,
  setFieldValue: (field: string, value: any) => void,
  error: boolean,
  disabled: boolean,
  dataApi: Promise<{ data: any[] }>
}
interface StylesParams {
  value: any,
  defaultValue: any,
  theme: Theme
}

export default function MonoSelect({ defaultValue, id, name, label, titleName, setFieldValue, error, disabled, dataApi }: Readonly<MonoSelectProps>) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState();

  const loadAllData = () => {
    dataApi.then((result : any) => {
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


  function getStyles({ value, defaultValue, theme }: StylesParams): React.CSSProperties {
    return {
      fontWeight: defaultValue === value ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular
    };
  }

  const handleChange = (event : any) => {
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
        value={value ?? ''}
        label={label}
        size="medium"
        onChange={handleChange}
        MenuProps={MenuProps}
        input={<OutlinedInput label={label} sx={{ minHeight: '41px' }} />}
        defaultValue={options?.filter((x : any) => x.id == defaultValue) ?? ''}
        renderValue={(selected: any) => (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          <Chip label={options?.find((x: any) => x.id == selected)?.[titleName]} sx={{ height: '23px' }} />
        </Box>
        )}
      >
        {options?.map((item: any) => {
          return (
            <MenuItem key={'menu-' + name + item.id} value={item.id} style={getStyles({ value: item.id, defaultValue: value, theme })}>
              <span style={{ whiteSpace: 'pre-wrap' }}>{item?.[titleName]}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
