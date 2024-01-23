import * as React from 'react';
import DiscountService from '@dashboard/(sale)/_service/DiscountService';
import MultiSelect from '@dashboard/_components/Select/MultiSelect';
import { useSession } from 'next-auth/react';

export default function SelectDiscount({ defaultValues, id, name,label, setFieldValue, error, disabled }){
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const discountService = new DiscountService(jwt);

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
      dataApi={discountService.getDiscountListForSelect()}
    />
  );
}
