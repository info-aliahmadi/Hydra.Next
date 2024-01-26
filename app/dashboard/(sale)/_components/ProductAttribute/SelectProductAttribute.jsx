import * as React from 'react';
import ProductAttributeService from '@dashboard/(sale)/_service/ProductAttributeService';
import MultiSelect from '@dashboard/_components/Select/MultiSelect';
import { useSession } from 'next-auth/react';

export default function SelectProductAttribute({ defaultValues, id, name, label, onChange, setFieldValue, error, disabled }) {
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const productAttributeService = new ProductAttributeService(jwt);
  
  return (
    <MultiSelect
      defaultValues={defaultValues}
      id={id}
      name={name}
      label={label}
      optionLabel={'name'}
      onChange={onChange}
      setFieldValue={setFieldValue}
      error={error}
      disabled={disabled}
      dataApi={productAttributeService.getProductAttributeListForSelect()}
    />
  );
}
