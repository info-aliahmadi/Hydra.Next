import _, { camelCase } from 'lodash';

export default function setServerErrors(response, setErrors) {
  let errorsObject = {};
  let errorData = response.response.data;
  if (errorData) {
    if (errorData.errors) {
      let errors = errorData.errors;
      let errorsLength = errors.length;
      for (let i = 0; i < errorsLength; i++) {
        let key = errors[i].property;
        let description = errors[i].description;
        errorsObject[camelCase(key)] = description;
      }
    } else {
      var keys = _.keys(errorData);

      for (let i = 0; i < keys.length; i++) {
        let errors = errorData[keys[i]];
        let key = camelCase(keys[i]);
        let error = '';
        let errorsLength = errors.length;
        if (!errorsLength) return;
        for (let j = 0; j < errorsLength; j++) {
          j > 0 ? (error += ' ' + (j + 1) + ' - ' + errors[j]) : errorsLength > 1 ? (error += ' 1 - ' + errors[j]) : (error += errors[j]);
        }
        errorsObject[key] = error;
      }
    }

    setErrors(errorsObject);
  }
}
