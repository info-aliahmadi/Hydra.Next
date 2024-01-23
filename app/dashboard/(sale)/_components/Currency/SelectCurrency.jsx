import * as React from 'react';
import CurrencyService from '@dashboard/(sale)/_service/CurrencyService';
import MonoSelect from '@dashboard/_components/Select/MonoSelect';
import { useSession } from 'next-auth/react';

export default function SelectCurrency({ defaultValue, id, name, label, setFieldValue, error, disabled }) {
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const service = new CurrencyService(jwt);

  return (
    <MonoSelect
      defaultValue={defaultValue}
      id={id}
      name={name}
      label={label}
      titleName={'currencyCode'}
      setFieldValue={setFieldValue}
      error={error}
      disabled={disabled}
      dataApi={service.getAllCurrencies()}
    />
  );
}
