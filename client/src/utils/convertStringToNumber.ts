export const convertStringToNumber = (value: string | number): number => {
  console.log("цена инпута", value);
  if (typeof value === "string") {
    value = Number(value.replace(/[^0-9]/g, ""));
  }
  return value;
};
