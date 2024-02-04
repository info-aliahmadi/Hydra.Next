import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useEffect } from 'react';

export default function MultiAutoComplete({ id, name, defaultValues, setFieldValue, label, inputDataApi, loadDataApi }) {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);

  const [clear, setClear] = useState(defaultValues);
  useEffect(() => {

    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const loadAllData = (ids) => {
    setLoading(true);
    var defIds = ids.toString();
    
    loadDataApi(defIds).then((products) => {
      setOptions([...products.data]);
      setValues([...products.data]);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (defaultValues == null || defaultValues === undefined || defaultValues.length === 0) {
      setClear(Date.now());
      setOptions([]);
    } else {
      loadAllData(defaultValues); 
    }

  }, [JSON.stringify(defaultValues)]);


  const onChange = (event, newValue) => {
    let ids = newValue?.map(a => a.id);
    setFieldValue(id, ids);
    setValues(newValue);
  };
  const onInputChange = (event, newInputValue) => {
    
    if (newInputValue != 'undefined' && newInputValue != null && newInputValue != '') {
      setLoading(true);
      inputDataApi(newInputValue).then((products) => {
        setOptions([...products.data]);
        setLoading(false);
      });
    }
  };

  return (
    <>
      <Autocomplete
        //key={defaultValues}
        id={id}
        name={name}
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
        getOptionLabel={(option) => option?.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        loading={loading}
        defaultValue={options?.filter((x) => values?.find((c) => c === x.id)) ?? []}
        renderInput={(params) => (
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
