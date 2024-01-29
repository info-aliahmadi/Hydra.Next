import HydraSelect from '@dashboard/_components/Select/HydraSelect';

export default function SelectSubscribeLabel({ defaultValue, id, name, setFieldValue, error, disabled, loadDataForSelect }) {
  return (
    <HydraSelect
      id={id}
      name={name}
      defaultValue={defaultValue}
      setFieldValue={setFieldValue}
      loadDataForSelect={loadDataForSelect}
      disabled={disabled}
      error={error}
    />
  );
}
