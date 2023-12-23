import { DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useEffect, useState } from 'react';

const DateTimeInput = ({ id, name, setFieldValue, defaultValue, placeholder, error }) => {
  const onChange = (value) => {
    let newValue = moment.utc(value).format();
    setFieldValue(id, newValue);
    setValue(value);
  };
  const [value, setValue] = useState();
  useEffect(() => {
    if (defaultValue) {
      setValue(moment(defaultValue + 'Z'));
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
      value={value || null}
      clearable
      slotProps={{
        actionBar: {
          actions: ['clear', 'today']
        }
      }}
    />
  );
};
export default DateTimeInput;
