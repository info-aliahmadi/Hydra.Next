import camelCase from 'lodash/camelCase';
import keys from 'lodash/keys';

export default function setServerErrors(response: any) : { [key: string]: string } {
  let errorsObject: { [key: string]: string } = {};
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
      let keysVar = keys(errorData);

      for (const keyVar of keysVar) {
        let errors = errorData[keyVar];
        let key = camelCase(keyVar);
        let error = '';
        let errorsLength = errors.length;
        if (!errorsLength) return errorsObject;
        for (let j = 0; j < errorsLength; j++) {
          if (j > 0) {
            error += ' ' + (j + 1) + ' - ' + errors[j];
          } else if (errorsLength > 1) {
            error += ' 1 - ' + errors[j];
          } else {
            error += errors[j];
          }
        }
        errorsObject[key] = error;
      }
    }

    return errorsObject;
  }
  return errorsObject;
}
