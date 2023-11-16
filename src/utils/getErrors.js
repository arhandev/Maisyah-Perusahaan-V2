export const getErrorValue = (err, errMessage) => {
  if (err) {
    return err;
  }
  return errMessage != null && errMessage[0];
};
