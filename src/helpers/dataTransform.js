export const arrayifyFirebaseObject = (obj) => {
  const arr = [];

  Object.keys(obj).forEach((key) => {
    const item = obj[key];

    item.id = key;
    arr.push(item);
  });

  return arr;
};
