import { useTranslation } from "react-i18next";

import styles from "./TermsAndConditions.module.css";
import Disclaimer from "../Disclaimer/Disclaimer";
import SingleTermsAndConditions from "../SingleTermsAndConditions/SingleTermsAndConditions";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  // TODO: Fix returnObjects usage
  const sections = t("terms-and-conditions-sections", { returnObjects: true });

  return (
    <div className={styles.container}>
      <Disclaimer />
      <h2>{t("terms-and-conditions-header")}</h2>
      <SingleTermsAndConditions sections={sections} />
    </div>
  );
};

export default TermsAndConditions;
