import * as yup from 'yup';

export default (value, links) => {
  const schema = yup
    .string()
    .required()
    .url()
    .notOneOf(links);
  try {
    schema.validateSync(value);
    return null;
  } catch (err) {
    return err.message;
  }
};
