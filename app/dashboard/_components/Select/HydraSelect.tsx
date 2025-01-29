import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, MenuItem, OutlinedInput, Select, Box, useTheme, Theme } from '@mui/material';

interface HydraSelectProps {
  readonly defaultValue: any;
  readonly id: string;
  readonly name: string;
  readonly setFieldValue: (field: string, value: any) => void;
  readonly error: boolean;
  readonly disabled: boolean;
  readonly loadDataForSelect: () => Promise<{ data: any[] }>;
}

export default function HydraSelect({ defaultValue, id, name, setFieldValue, error, disabled, loadDataForSelect }: HydraSelectProps) {
  const [t] = useTranslation();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<{ id: any; title: string }[]>([]);
  const [values, setValues] = useState();

  const loadAllDataForSelect = () => {
    loadDataForSelect().then((result: any) => {
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
  const handleChange = (event: any) => {
    setFieldValue(id, event.target.value);
    setValues(event.target.value);
  };

  return (
    <FormControl error={error} disabled={disabled}>
      <Select
        id={id}
        name={name}
        // className="select-topic"
        value={values ?? ''}
        label='Test'
        size="small"
        onChange={handleChange}
        MenuProps={MenuProps}
        input={<OutlinedInput label={t('pages.topics')} />}
        defaultValue={options?.filter((x: any) => defaultValue === x.id) ?? []}
        renderValue={(selected: any) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{options?.find((x: any) => x.id == selected)?.title}</Box>
        )}
      >
        {options?.map((item: any) => {
          return (
            <MenuItem key={'menu-' + name + item.id} value={item.id} style={{ fontWeight: theme.typography.fontWeightRegular }}>
              <span style={{ whiteSpace: 'pre-wrap' }}>{item.title}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
