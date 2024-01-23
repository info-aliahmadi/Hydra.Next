import * as React from 'react';
import ProductService from '@dashboard/(sale)/_service/ProductService';
import MultiAutocomplete from '@dashboard/_components/Select/MultiAutocomplete';
import { useSession } from 'next-auth/react';

export default function ProductsAutoComplete({ id, name, defaultValues, setFieldValue, label }) {

  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  let service = new ProductService(jwt);

  return (
    <>
      <MultiAutocomplete
        id={id}
        name={name}
        defaultValues={defaultValues}
        setFieldValue={setFieldValue}
        label={label}
        inputDataApi={(input) =>service.getProductsByInput(input)}
        loadDataApi={(input) =>service.getProductsByIds(input)}
      />
    </>
  );
}
