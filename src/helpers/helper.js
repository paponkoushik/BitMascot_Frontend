export const formDataAssigner = function (formData = new FormData, dataObject) {
  Object.keys(dataObject).map((key) => {
    if (dataObject[key] && !dataObject[key].length > 0 && Object.keys(dataObject[key]).length > 0) {
      Object.keys(dataObject[key]).map(childKey => {
        return formData.append(key+`[${childKey}]`, dataObject[key][childKey]);
      })
    }else if (Array.isArray(dataObject[key])) {
      dataObject[key].map((el, index) => {
        Object.keys(el).map(objectKeys => {
          formData.append(key+`[${index}][${objectKeys}]`, el[objectKeys]);
        });
      })
    }else{
      return formData.append(key, dataObject[key]);
    }
  });
  return formData;
};