import * as React from 'react';
import { useTranslation } from 'react-i18next';
import UsersService from '@dashboard/(auth)/_service/UsersService';
import {  FormControl } from '@mui/material';
import { useSession } from 'next-auth/react';
import MultiAutoComplete from '@dashboard/_components/Select/MultiAutoComplete';

export default function SelectUser({ defaultValues, id, name, setFieldValue, error, disabled, multiple }) {
  const [t] = useTranslation();
  const { data: session } = useSession();

  const jwt = session?.user?.accessToken;

  const usersService = new UsersService(jwt);

  return (
    <FormControl error={error} key={defaultValues}>
      <MultiAutoComplete
        id={id}
        name={name}
        defaultValues={defaultValues || []}
        setFieldValue={setFieldValue}
        label={t('fields.message.messageInbox.recipients')}
        inputDataApi={(input) => usersService.getUserListForSelect(input)}
        loadDataApi={() => usersService.getUserListForSelectByIds(defaultValues)}
      />
    </FormControl>
  );
}
