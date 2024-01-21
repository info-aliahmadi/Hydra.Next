import * as React from 'react';
import DeliveryDateService from '@dashboard/(sale)/_service/DeliveryDateService';
import MonoSelect from '@dashboard/_components/Select/MonoSelect';
import { useSession } from 'next-auth/react';

export default function SelectDeliveryDate({ defaultValue, id, name, label, setFieldValue, error, disabled }) {
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const deliveryDateService = new DeliveryDateService(jwt);

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
      dataApi={deliveryDateService.getDeliveryDateList()}
    />
  );
}
