export const convertArraytoArrayOfObjects = (array: string[]) => {
  let arrayOfObjects = array.map((arrayItem) => {
    return { label: arrayItem, value: arrayItem };
  });

  return arrayOfObjects;
};
