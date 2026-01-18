import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ROUTES } from "../../constants/routesConstants";
import styles from "./InstantSplitLogo.module.css";

const InstantSplitLogo = ({ linkToInstantSplitPage = true }) => {
  const logoImage = (
    <img src='/logo_coloured.svg' alt='Logo' className={styles.logoImage} />
  );

  return (
    <>
      <Helmet>
        <link rel='preload' href='/logo_coloured.svg' as='image' />
      </Helmet>
      {linkToInstantSplitPage ? (
        <Link to={ROUTES.INSTANT_SPLIT} className={styles.logoLink}>
          {logoImage}
        </Link>
      ) : (
        logoImage
      )}
    </>
  );
};

export default InstantSplitLogo;
