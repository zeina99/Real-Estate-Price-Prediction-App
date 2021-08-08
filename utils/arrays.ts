export const convertArraytoArrayOfObjects = (array: string[]) => {
  let arrayOfObjects = array.map((arrayItem) => {
    return { label: arrayItem, value: arrayItem };
  });

  return arrayOfObjects;
};

export const roundNumber = (number: number) => {
  return Math.round(number * 100) / 100;
};
