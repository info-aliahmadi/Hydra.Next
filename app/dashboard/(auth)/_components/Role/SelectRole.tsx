import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import RoleService from '../../_service/RoleService';
import { useSession } from 'next-auth/react';
import { OutlinedInput } from '@mui/material';

export default function SelectRole({ defaultValues, id, setFieldValue, error, disabled }:
  { readonly defaultValues: number[], readonly disabled: boolean, readonly id?: string, readonly setFieldValue?: any, readonly error?: boolean }) {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<Option[]>([]);
  const { data: session } = useSession();

  const jwt = session?.accessToken;
  const roleService = new RoleService(jwt ?? '');

  const loadRoles = () => {
    roleService.getAllRoles().then((result) => {
      const optionsData: Option[] = result.data?.map((x) => ({ id: x.id, name: x.name })) as Option[];
      setOptions(optionsData);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <Autocomplete
      disabled={disabled}
      key={Number(loading) + Number(error)}
      multiple
      size="small"
      getOptionLabel={(option) => option?.name}
      options={options}
      loading={loading}
      id={id}
      onChange={(e, newValue) =>
        setFieldValue(
          id,
          newValue.map(({ id }) => id)
        )
      }
      defaultValue={options.filter((x) => defaultValues?.find((c) => c === x.id)) ?? []}
      renderInput={(params) => (
        <OutlinedInput
          {...params}
          error={error}
          placeholder={t('pages.roles')}
          inputProps={{
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
