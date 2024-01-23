import { DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function DateTimeInput({ id, name, label, setFieldValue, defaultValue, placeholder, error }) {
  const onChange = (value) => {
    let newValue = moment.utc(value).format();
    setFieldValue(id, newValue);
  };
  const [value, setValue] = useState();
  useEffect(() => {
    if (defaultValue) {
      if (defaultValue.substr(defaultValue.length - 1) == 'Z') {
        setValue(moment(defaultValue));
      } else {
        setValue(moment(defaultValue + 'Z'));
      }
    } else {
      setValue(null);
    }
  }, [defaultValue]);
  return (
    <DateTimePicker
      id={id || 'dateInput'}
      name={name || 'dateInput'}
      className={error === true ? 'date-error' : ''}
      onChange={onChange}
      placeholder={placeholder}
      label={label}
      value={value || null}
      clearable
      slotProps={{
        actionBar: {
          actions: ['clear', 'today']
        }
      }}
    />
  );
}
