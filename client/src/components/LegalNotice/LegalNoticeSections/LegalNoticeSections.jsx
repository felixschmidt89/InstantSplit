import EXTERNAL_LINK_PROPS from "../../../constants/linkConstants.js";
import legalNoticeSections from "../legalNoticeData";
import styles from "./LegalNoticeSections.module.css";

const LegalNoticeSections = () => {
  return (
    <div className={styles.container}>
      {legalNoticeSections.map(({ id, title, paragraphs, attribution }) => (
        <section key={id} className={styles.section}>
          <h3>{title}</h3>
          <div className={styles.text}>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {attribution && (
              <p className={styles.attribution}>
                Erstellt mit dem{" "}
                <a
                  href={attribution.legalNoticeGenerator.url}
                  {...EXTERNAL_LINK_PROPS}>
                  {attribution.legalNoticeGenerator.label}
                </a>
                {" der "}
                <a href={attribution.lawFirm.url} {...EXTERNAL_LINK_PROPS}>
                  {attribution.lawFirm.label}
                </a>
                .
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default LegalNoticeSections;
