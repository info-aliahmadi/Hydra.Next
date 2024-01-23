import * as React from 'react';
import CategoryService from '@dashboard/(sale)/_service/CategoryService';
import MultiSelect from '@dashboard/_components/Select/MultiSelect';
import { useSession } from 'next-auth/react';

export default function SelectCategory({ defaultValues, id, name, label, setFieldValue, error, disabled }) {
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const categoryService = new CategoryService(jwt);

  return (
    <MultiSelect
      defaultValues={defaultValues}
      id={id}
      name={name}
      label={label}
      optionLabel={'name'}
      setFieldValue={setFieldValue}
      error={error}
      disabled={disabled}
      dataApi={categoryService.getCategoryListForSelect()}
    />
  );
}
