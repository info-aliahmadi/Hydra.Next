import * as React from 'react';
import { useState, useEffect } from 'react';
import { Chip, FormControl, MenuItem, Select , InputLabel,OutlinedInput} from '@mui/material';
import { Box, useTheme } from '@mui/system';
import DeliveryDateService from '@dashboard/(sale)/_service/DeliveryDateService';
import { useSession } from 'next-auth/react';

export default function SelectDeliveryDate({ defaultValues, id, name, label, setFieldValue, error, disabled }) {
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState();
  const deliveryDateService = new DeliveryDateService(jwt);

  const loadDeliveryDates = () => {
    deliveryDateService.getDeliveryDateList().then((result) => {
      setOptions(result?.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadDeliveryDates();
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
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        className="select-deliveryDate"
        // key={id + loading + defaultValues}
        multiple
        value={values || ''}
        label={label}
        size="medium"
        onChange={handleChange}
        MenuProps={MenuProps}
        input={<OutlinedInput label={label} />}
        defaultValue={options?.filter((x) => defaultValues?.find((c) => c === x.id)) ?? []}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value, index) => {
              let title = options?.find((x) => x.id == value)?.name;
              return <Chip key={'chip-' + name + index} label={title} />;
            })}
          </Box>
        )}
      >
        {options?.map((item) => {
          return (
            <MenuItem key={'menu-' + name + item.id} value={item.id} style={getStyles(item.id, values, theme)}>
              <span style={{ 'white-space': 'pre-wrap' }}>{item.name}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
