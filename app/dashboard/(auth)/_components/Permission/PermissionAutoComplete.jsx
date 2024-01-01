import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useEffect } from 'react';
import PermissionService from '@dashboard/(auth)/_service/PermissionService';
import { useSession } from 'next-auth/react';

export default function PermissionAutoComplete({ value, setValue }) {
  
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
      let permissionService = new PermissionService(jwt);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [newValue, setNewValue] = useState(value ?? '');
  const [loading, setLoading] = useState(false);

  const [clear, setClear] = useState('');

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (value == null || value === undefined) {
      setClear(Date.now());
      setOptions([]);
    }
  }, [value]);

  const onChange = (event, newValue) => {
    setValue(newValue?.id);
    setNewValue(newValue);
  };
  const onInputChange = (event, newInputValue) => {
    if (newInputValue != 'undefined' && newInputValue != null && newInputValue != '') {
      setLoading(true);
      permissionService.getPermissionsByName(newInputValue).then((permissions) => {
        setOptions([...permissions.data]);
        setLoading(false);
      });
    }
  };

  return (
    <>
      <Autocomplete
        key={clear}
        id="permissionId"
        clearOnBlur={true}
        clearOnEscape={true}
        autoSelect={true}
        sx={{ minWidth: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        //   inputValue={newValue}s
        onInputChange={onInputChange}
        onChange={onChange}
        //   defaultValue
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            value={newValue}
            size="small"
            label="Select Permission"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={15} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
    </>
  );
}
