// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./RenderResourceCreated.module.css";

/**
 * Renders the creation timestamp of a resource.
 *
 * @param {Object} props - The component props.
 * @param {string} props.createdAt - The creation timestamp of the resource.
 * @param {string} [props.updatedAt] - The optional update timestamp of the resource.
 * @returns {JSX.Element} React component. */
const RenderResourceCreated = ({ createdAt, updatedAt }) => {
  const { t } = useTranslation();

  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <span className={styles.key}>
          {t("render-resource-created-component-created-text")}{" "}
        </span>
        <span className={styles.value}>
          {new Date(createdAt).toLocaleString()}
        </span>
      </li>
      {createdAt !== updatedAt && (
        <li className={styles.item}>
          <span className={styles.key}>
            {t("render-resource-created-component-changed-text")}{" "}
          </span>
          <span className={styles.value}>
            {new Date(updatedAt).toLocaleString()}
          </span>
        </li>
      )}
    </ul>
  );
};

export default RenderResourceCreated;
