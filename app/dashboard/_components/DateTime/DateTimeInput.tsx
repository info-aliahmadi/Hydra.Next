import { DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface DateTimeInputProps {
  id: string;
  name: string;
  label: string;
  setFieldValue: (field: string, value: any) => void;
  defaultValue?: string;
  placeholder?: any;
  error?: boolean;
}

export default function DateTimeInput({ id, name, label, setFieldValue, defaultValue, placeholder, error }: Readonly<DateTimeInputProps>) {
  const onChange = (value: moment.Moment | null) => {
    let newValue = moment.utc(value).format();
    setFieldValue(id, newValue);
  };
  const [value, setValue] = useState<moment.Moment | null>(null);
  useEffect(() => {
    if (defaultValue) {
      if (defaultValue.endsWith('Z')) {
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
      className={error === true ? 'date-error' : ''}
      onChange={onChange}
      label={label}
      value={value || null}
      slotProps={{
        actionBar: {
          actions: ['clear', 'today']
        }
      }}
    />
  );
}
