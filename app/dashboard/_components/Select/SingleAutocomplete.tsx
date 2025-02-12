import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import Result from '@root/app/types/Result';
import { UserModel } from '../../(auth)/_types/User/UserModel';

interface MultiAutoCompleteProps {
  id: string;
  defaultValue?: number;
  setFieldValue: (field: string, value: any) => void;
  label: string;
  inputDataApi: (input: string) => Promise<Result<UserModel[]>>;
  loadDataApi: (ids: number[]) => Promise<Result<UserModel[]>>;
  disabled: boolean;
}

export default function SingleAutocomplete({ id, defaultValue, setFieldValue, label, inputDataApi, loadDataApi, disabled }: Readonly<MultiAutoCompleteProps>) {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Option[]>([]);
  const [value, setValue] = useState<Option | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const loadAllData = (id: number) => {
    setLoading(true);
    const defIds = [id];
    loadDataApi(defIds).then((result) => {

      const optionsData: Option[] = result.data?.map((x) => ({ id: x.id, name: x.name })) as Option[];
      setOptions(optionsData);
      setValue(optionsData[0])
      setLoading(false);
    }).catch((error) => setLoading(false));
  };

  useEffect(() => {
    if (defaultValue != undefined && defaultValue > 0) {
      loadAllData(defaultValue);
    } else {
      setOptions([]);
    }

  }, [defaultValue]);


  const onChange = (event: React.SyntheticEvent, value: Option | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<Option> | undefined) => {
    setFieldValue(id, value?.id);
    setValue(value);
  };
  const onInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    if (newInputValue !== 'undefined' && newInputValue !== null && newInputValue !== '') {
      setLoading(true);
      inputDataApi(newInputValue).then((result) => {
        const optionsData: Option[] = result.data?.map((x) => ({ id: x.id, name: x.name })) as Option[];
        setOptions(optionsData);
        setLoading(false);
      }).catch((error) => setLoading(false));
    }
  };
  const selectedSingleValue = React.useMemo(
    () => {
      return options?.find((x) => x.id == defaultValue);
    },
    [defaultValue],
  );
  return (
    <Autocomplete
      id={id}
      disabled={disabled}
      clearOnBlur={true}
      clearOnEscape={true}
      autoSelect={true}
      sx={{ minWidth: 300 }}
      open={open}
      multiple={false}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={onInputChange}
      onChange={onChange}
      options={options}
      getOptionLabel={(option) => option.name || ''}
      isOptionEqualToValue={(option: Option, value: any) => option.id === value.id}
      loading={loading}
      defaultValue={selectedSingleValue}
      value={value}
      renderInput={(params: any) => (
        <TextField
          {...params}
          variant="outlined"
          size="small"
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && <CircularProgress color="inherit" size={15} />}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}
