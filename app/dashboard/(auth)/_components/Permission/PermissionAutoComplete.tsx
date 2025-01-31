import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import PermissionService from '@dashboard/(auth)/_service/PermissionService';
import { useSession } from 'next-auth/react';

interface PermissionAutoCompleteProps {
  readonly value?: number;
  readonly setValue: (value: any) => void;
}

export default function PermissionAutoComplete({ value, setValue }: PermissionAutoCompleteProps) {

  const { data: session } = useSession();
  const jwt = session?.accessToken;
  let permissionService = new PermissionService(jwt ?? "");

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Permission[]>([]);
  const [newValue, setNewValue] = useState<number>(value ?? 0);
  const [loading, setLoading] = useState<boolean>(false);

  const [clear, setClear] = useState<any>('');

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

  const onChange = (event: React.SyntheticEvent<Element, Event>, value: Permission | null, reason: any, details?: any) => {
    setValue(value?.id ?? 0);
    setNewValue(value?.id ?? 0);
  };

  const onInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string) => {
    if (newInputValue !== 'undefined' && newInputValue !== null && newInputValue !== '') {
      setLoading(true);
      permissionService.getPermissionsByName(newInputValue).then((permissions: any) => {
        setOptions([...permissions.data]);
        setLoading(false);
      });
    }
  };

  return (
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
      getOptionLabel={(option) => option.name ?? ''}
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
  );
}
