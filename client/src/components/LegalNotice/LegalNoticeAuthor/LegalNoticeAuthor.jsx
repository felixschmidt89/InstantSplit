// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./LegalNoticeAuthor.module.css";

/**
 * Renders legally required information about the website.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.authorInfo - Information about the author.
 * @param {string} props.authorInfo.name - The name of the author.
 * @param {string} props.authorInfo.address - The address of the author.
 * @param {string} props.authorInfo.representative - The representative of the website.
 * @param {string} props.authorInfo.phone - The phone number of the author.
 * @param {string} props.authorInfo.email - The email address of the author.
 * @returns {JSX.Element} React component. */
const LegalNoticeAuthor = ({ authorInfo }) => {
  return (
    <div className={styles.container}>
      <h2>Angaben gemäß § 5 TMG</h2>
      <section>
        <address>
          {authorInfo.name} <br />
          {authorInfo.address} <br />
        </address>
      </section>

      <section>
        <h3>Vertreten durch</h3>
        <p className={styles.text}>{authorInfo.representative}</p>
      </section>

      <section>
        <h3>Kontakt</h3>
        <p className={styles.text}>
          Telefon: {authorInfo.phone} <br />
          E-Mail: <a href={`mailto:${authorInfo.email}`}>{authorInfo.email}</a>
        </p>
      </section>
    </div>
  );
};

export default LegalNoticeAuthor;
