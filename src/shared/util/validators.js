const isEmpty = (string) => {
  if (string.trim() === '') {
    return true;
  } else {
    return false;
  }
};

const minLength = (string) => {
  if (string.trim().length < 6) {
    return false;
  } else {
    return true;
  }
};

export const validateUploadProduct = (data) => {
  let errors = {};
  if (isEmpty(data.name)) errors.name = 'Must not be empty';
  if (isEmpty(data.price)) errors.price = 'Must not be empty';
  if (isEmpty(data.category)) errors.category = '카테고리를 선택해주세요';
  if (!minLength(data.description)) errors.description = '최소 6글자 이상 입력';
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
