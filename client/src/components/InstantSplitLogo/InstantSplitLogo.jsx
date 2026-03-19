import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CLIENT_ROUTES from "../../constants/clientRouteLinks.js";
import styles from "./InstantSplitLogo.module.css";

const { TO } = CLIENT_ROUTES;
const { INSTANT_SPLIT } = TO;
const LOGO_PATH = "/logo_coloured.svg";

const InstantSplitLogo = ({ isLink = true }) => {
  const logoImage = (
    <img
      src={LOGO_PATH}
      alt='Instant Split Logo'
      className={styles.logoImage}
    />
  );

  return (
    <>
      <Helmet>
        <link rel='preload' href={LOGO_PATH} as='image' />
      </Helmet>

      {isLink ? (
        <Link to={INSTANT_SPLIT} className={styles.logoLink}>
          {logoImage}
        </Link>
      ) : (
        logoImage
      )}
    </>
  );
};

export default InstantSplitLogo;
