import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import Result from '@root/app/types/Result';
import { UserModel } from '../../(auth)/_types/User/UserModel';

interface MultiAutoCompleteProps {
  id: string;
  name: string;
  defaultValues: Option[];
  setFieldValue: (field: string, value: any) => void;
  label: string;
  inputDataApi: (input: string) => Promise<Result<UserModel[]>>;
  loadDataApi: (ids: string) => Promise<Result<UserModel[]>>;
}

export default function MultiAutoComplete({ id, name, defaultValues, setFieldValue, label, inputDataApi, loadDataApi }: Readonly<MultiAutoCompleteProps>) {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [values, setValues] = useState<Option[]>(defaultValues);
  const [loading, setLoading] = useState(false);

  const [clear, setClear] = useState<Option[]>(defaultValues);
  useEffect(() => {

    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const loadAllData = (ids: any) => {
    setLoading(true);
    const defIds = ids.toString();

    loadDataApi(defIds).then((products: any) => {
      setOptions([...products.data]);
      setValues([...products.data]);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (defaultValues == null || defaultValues === undefined || defaultValues.length === 0) {
      setClear([]);
      setOptions([]);
    } else {
      loadAllData(defaultValues);
    }

  }, [JSON.stringify(defaultValues)]);




  const onChange = (event: React.ChangeEvent<{}>, newValue: Option[] | null) => {
    let ids = newValue?.map(a => a.id);
    setFieldValue(id, ids);
    setValues(newValue || []);
  };
  const onInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    if (newInputValue !== 'undefined' && newInputValue !== null && newInputValue !== '') {
      setLoading(true);
      inputDataApi(newInputValue).then((result) => {
        const optionsData : Option[] = result.data?.map((x) => ({ id: x.id, name: x.name })) as Option[];
        setOptions([...optionsData]);
        setLoading(false);
      });
    }
  };

  return (
    <Autocomplete
      //key={defaultValues}
      id={id}
      clearOnBlur={true}
      clearOnEscape={true}
      autoSelect={true}
      sx={{ minWidth: 300 }}
      open={open}
      multiple
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      //inputValue={newValue}s
      onInputChange={onInputChange}
      onChange={onChange}
      value={values || []}
      options={options}
      getOptionLabel={(option: Option) => option?.name}
      isOptionEqualToValue={(option: Option, value: any) => option.id === value.id}
      loading={loading}
      defaultValue={options?.filter((x) => values?.find((c) => c.id === x.id)) ?? []}
      renderInput={(params: any) => (
        <TextField
          {...params}
          variant="standard"
          // value={values}
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
