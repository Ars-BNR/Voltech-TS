export const convertStringToNumber = (value: string | number): number => {
  if (typeof value === "string") {
    value = Number(value.replace(/[^0-9]/g, ""));
  }
  return typeof value === "number" ? value : NaN;
};
