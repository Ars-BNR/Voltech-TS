// export const formatAddress = (address) => {
//   address = address.replace(/город\s*/i, "г.");
//   address = address.replace(/улица\s*/i, "ул.");
//   address = address.replace(/квартира\s*/i, "кв.");
//   const parts = address.split(" ").filter(Boolean);
//   if (parts.length < 4) return address;
//   return `г.${parts[0]}, ул.${parts[1]} ${parts[2]}, кв.${parts[3]}`;
// };
