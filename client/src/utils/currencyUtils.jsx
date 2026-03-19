import { currenciesContent } from "../contents/currenciesContent.jsx";

const findCurrencyLabel = (currencyValue) => {
  return currenciesContent.find(
    (currencyObj) => currencyObj.value === currencyValue,
  )?.label;
};

export default findCurrencyLabel;
