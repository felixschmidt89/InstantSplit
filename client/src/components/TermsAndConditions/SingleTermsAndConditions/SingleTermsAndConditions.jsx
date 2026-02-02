import { useTranslation } from "react-i18next";

import styles from "./SingleTermsAndConditions.module.css";

const SingleTermsAndConditions = ({ sections }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {sections.map(({ key, title, content, link, linkText }) => (
        <div key={key}>
          <h3 className={styles.header}>{title}</h3>
          <p className={styles.content}>
            {content}
            {link && (
              <span>
                {" "}
                {t("single-terms-and-conditions-more-info-copy")}{" "}
                <a href={link} target='_blank' rel='noopener noreferrer'>
                  {linkText}
                </a>
                .
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SingleTermsAndConditions;
