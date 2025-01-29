import * as React from 'react';
import { useState, useEffect } from 'react';
import { Chip, FormControl, MenuItem, OutlinedInput, Select, InputLabel, Box, useTheme ,Theme } from '@mui/material';
import {} from '@mui/system';

interface MultiSelectProps {
  readonly defaultValues: any[];
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly optionLabel: string;
  readonly setFieldValue: (field: string, value: any) => void;
  readonly onChange?: (event: React.ChangeEvent<{ value: unknown }>, options: any[]) => void;
  readonly error?: boolean;
  readonly disabled?: boolean;
  readonly dataApi: Promise<{ data: any[] }>;
  readonly sx?: object;
}

export default function MultiSelect({ defaultValues, id, name, label, optionLabel, setFieldValue, onChange, error, disabled, dataApi, sx }: MultiSelectProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<any[]>([]);
  const [values, setValues] = useState<any[]>([]);

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
  function getStyles(value: string, values: string[], theme: Theme): React.CSSProperties {
    return {
      fontWeight: values.indexOf(value) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
  }

  const handleChange = (event : any) => {
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
              <span style={{ whiteSpace: 'pre-wrap' }}>{item?.[optionLabel]}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
