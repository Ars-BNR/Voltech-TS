const RenderPhrase = (number: number) => {
  const lastOne = Number(number.toString().slice(-1));
  const lastTwo = Number(number.toString().slice(-2));

  if (lastTwo >= 11 && lastTwo <= 14) {
    return "товаров";
  }
  if (lastOne === 1) {
    return "товар";
  }
  if (lastOne >= 2 && lastOne <= 4) {
    return "товара";
  }
  return "товаров";
};

export default RenderPhrase;
