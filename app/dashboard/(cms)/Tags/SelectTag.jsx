import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TagsService from 'modules/cms/services/TagsService';
import { Chip, FormControl } from '@mui/material';

export default function SelectTag({ defaultValues, id, name, setFieldValue, error, disabled }) {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const tagService = new TagsService();

  const loadTags = () => {
    tagService.getTagListForSelect().then((result) => {
      setOptions(result.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    setValues(defaultValues);
  }, [JSON.stringify(defaultValues)]);

  return (
    <FormControl error={error}>
      <Autocomplete
        id={id}
        name={name}
        disabled={disabled}
        multiple
        freeSolo
        disableCloseOnSelect
        size="small"
        value={values || ''}
        getOptionLabel={(option) => option}
        options={options.map((option) => option.title)}
        loading={loading}
        defaultValue={options.filter((x) => defaultValues?.find((c) => c === x.title)) ?? []}
        onChange={(e, newValue) => {
          setFieldValue(id, newValue);
          setValues(newValue);
        }}
        renderTags={(value, getTagProps) => {
          return value.map((option, index) => {
            return <Chip key={'tg-' + index} label={option} {...getTagProps({ index })} />;
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            size="small"
            placeholder={t('pages.tags')}
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
