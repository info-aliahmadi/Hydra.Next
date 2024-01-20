import * as React from 'react';
import TaxCategoryService from '@dashboard/(sale)/_service/TaxCategoryService';
import MonoSelect from '@dashboard/_components/Select/MonoSelect';
import { useSession } from 'next-auth/react';

export default function SelectTaxCategory({ defaultValue, id, name, label, setFieldValue, error, disabled }) {
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const taxCategoryService = new TaxCategoryService(jwt);

  return (
    <MonoSelect
      defaultValue={defaultValue}
      id={id}
      name={name}
      label={label}
      titleName={'name'}
      setFieldValue={setFieldValue}
      error={error}
      disabled={disabled}
      dataApi={taxCategoryService.getTaxCategoryList()}
    />
  );
}
