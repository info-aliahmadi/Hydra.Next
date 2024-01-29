import HydraSelect from '../../../_components/Select/HydraSelect';

export default function SelectPaymentStatus({ defaultValue, id, name, setFieldValue, error, disabled, loadDataForSelect }) {
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
