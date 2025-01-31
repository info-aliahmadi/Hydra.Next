import * as React from 'react';
import { useTranslation } from 'react-i18next';
import UsersService from '@dashboard/(auth)/_service/UsersService';
import { FormControl } from '@mui/material';
import { useSession } from 'next-auth/react';
import MultiAutoComplete from '@dashboard/_components/Select/MultiAutocomplete';

interface SelectUserProps {
  defaultValues: any[];
  id: number;
  name: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  error: boolean;
  disabled: boolean;
  multiple: boolean;
}

export default function SelectUser({ defaultValues, id, name, setFieldValue, error, disabled, multiple }: Readonly<SelectUserProps>) {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.accessToken;
  const usersService = new UsersService(jwt);

  return (
    <FormControl error={error} key={id}>
      <MultiAutoComplete
        id={id.toString()}
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
