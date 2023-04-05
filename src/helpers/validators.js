export const isValidMail = (mail) => {
  if (!mail.includes('@')) {
    return false;
  }

  const mailSplit = mail.split('@');

  if (mailSplit.length !== 2) {
    return false;
  }

  if (mailSplit[0].length < 1) {
    return false;
  }

  const mailAppendix = mailSplit[1];

  if (!mailAppendix.includes('.')) {
    return false;
  }

  if (mailAppendix.split('.').length < 2) {
    return false;
  }

  if (mailAppendix.split('.')[0].length < 1) {
    return false;
  }

  if (mailAppendix.split('.')[1].length < 1) {
    return false;
  }

  if (mailAppendix.length < 3) {
    return false;
  }

  return true;
};
