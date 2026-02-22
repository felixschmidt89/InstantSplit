import { authorDetails } from "../legalNoticeData";
import styles from "./LegalNoticeAuthor.module.css";

const LegalNoticeAuthor = () => {
  return (
    <div className={styles.container}>
      <h2>Angaben gemäß § 5 TMG</h2>

      <section className={styles.section}>
        <address className={styles.address}>
          <strong>{authorDetails.name}</strong> <br />
          {authorDetails.address}
        </address>
      </section>

      <section className={styles.section}>
        <h3>Vertreten durch</h3>
        <p className={styles.text}>{authorDetails.representative}</p>
      </section>

      <section className={styles.section}>
        <h3>Kontakt</h3>
        <p className={styles.text}>
          Telefon: {authorDetails.phone} <br />
          E-Mail:{" "}
          <a href={`mailto:${authorDetails.email}`} className={styles.link}>
            {authorDetails.email}
          </a>
        </p>
      </section>
    </div>
  );
};

export default LegalNoticeAuthor;
