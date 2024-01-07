import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UsersService from '@dashboard/(auth)/_service/UsersService';
import { Chip, FormControl } from '@mui/material';
import uniqBy from 'lodash/uniqBy';
import { useSession } from 'next-auth/react';

export default function SelectUser({ defaultValues, id, name, setFieldValue, error, disabled, multiple }) {
  const [t] = useTranslation(); 
  const { data: session } = useSession();

  const jwt = session?.user?.accessToken;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState([]);
  const usersService = new UsersService(jwt);

  const getUsersByInput = (input) => {
    setLoading(true);
    usersService.getUserListForSelect(input.target.value).then((result) => {
      let merge = result.data.concat(values);
      merge = uniqBy(merge, 'id');
      setOptions(merge);
      setLoading(false);
    });
  };

  const loadUsers = () => {
    if (defaultValues.length > 0) {
      setLoading(true);
      usersService.getUserListForSelectByIds(defaultValues).then((result) => {
        setOptions(result.data);
        setValues(result.data);
        setLoading(false);
      });
    } else {
      setValues([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [JSON.stringify(defaultValues)]);

  useEffect(() => {
    if (defaultValues.length > 0) {
      setFieldValue(id, defaultValues);
    }
  }, []);

  return (
    <FormControl error={error} key={values}>
      <Autocomplete
        id={id}
        name={name}
        disabled={disabled}
        multiple={multiple}
        // freeSolo
        disableCloseOnSelect
        size="medium"
        getOptionLabel={(option) => option?.userName}
        options={options}
        loading={loading}
        defaultValue={values ?? []}
        onChange={(e, newValue) => {
          let ids = newValue.map((x) => x.id);
          ids = uniq(ids);
          setFieldValue(id, ids);
          setValues(newValue);
        }}
        onInput={getUsersByInput}
        renderTags={(value, getTagProps) => {
          return value.map((option, index) => {
            return <Chip key={'tg-' + index} label={option?.userName} {...getTagProps({ index })} />;
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            size="medium"
            placeholder={t('fields.message.messageInbox.recipients')}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
    </FormControl>
  );
}
