import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';

interface MultiAutoCompleteProps {
  id: string;
  name: string;
  defaultValues: OptionType[];
  setFieldValue: (field: string, value: any) => void;
  label: string;
  inputDataApi: (input: string) => Promise<{ data: any[] }>;
  loadDataApi: (ids: string) => Promise<{ data: any[] }>;
}
interface OptionType {
  id: string;
  name: string;
}
export default function MultiAutoComplete({ id, name, defaultValues, setFieldValue, label, inputDataApi, loadDataApi }: Readonly<MultiAutoCompleteProps>) {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [values, setValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);

  const [clear, setClear] = useState<OptionType[]>(defaultValues);
  useEffect(() => {

    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const loadAllData = (ids : any) => {
    setLoading(true);
    const defIds = ids.toString();

    loadDataApi(defIds).then((products : any) => {
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


 

  const onChange = (event: React.ChangeEvent<{}>, newValue: OptionType[] | null) => {
    let ids = newValue?.map(a => a.id);
    setFieldValue(id, ids);
    setValues(newValue || []);
  };
  const onInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    if (newInputValue !== 'undefined' && newInputValue !== null && newInputValue !== '') {
      setLoading(true);
      inputDataApi(newInputValue).then((products: { data: OptionType[] }) => {
        setOptions([...products.data]);
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
        getOptionLabel={(option: any) => option?.name}
        isOptionEqualToValue={(option : any, value: any) => option.id === value.id}
        loading={loading}
        defaultValue={options?.filter((x) => values?.find((c) => c === x.id)) ?? []}
        renderInput={(params : any) => (
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
