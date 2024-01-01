import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import RoleService from '../../_service/RoleService';
import { useSession } from 'next-auth/react';

export default function SelectRole({ defaultValues, id, setFieldValue, error, disabled }) {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const { data: session } = useSession();

  const jwt = session?.user?.accessToken;
  const roleService = new RoleService(jwt);

  const loadRoles = () => {
    roleService.getAllRoles().then((result) => {
      setOptions(result.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <Autocomplete
      disabled={disabled}
      key={loading + defaultValues + error}
      multiple
      size="small"
      getOptionLabel={(option) => option?.name}
      options={options}
      loading={loading}
      error={error}
      id={id}
      name={id}
      onChange={(e, newValue) =>
        setFieldValue(
          id,
          newValue.map(({ id }) => id)
        )
      }
      defaultValue={options.filter((x) => defaultValues?.find((c) => c === x.id)) ?? []}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          placeholder={t('pages.roles')}
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
  );
}
