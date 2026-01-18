// React and Third-Party Libraries
import React from "react";

// Components
import InstallPwaFirefox from "../InstallPwaFirefox/InstallPwaFirefox";
import InstallPwaSafari from "../InstallPwaSafari/InstallPwaSafari";
import InstallPwaSamsungBrowser from "../InstallPwaSamsungBrowser/InstallPwaSamsungBrowser";
import InstallPwaOpera from "../InstallPwaOpera/InstallPwaOpera";
import InstallPwaPrompt from "../InstallPwaPrompt/InstallPwaPrompt";

// Styles
import styles from "./RenderInstallPwaCta.module.css";

/**
 * Component for rendering the appropriate PWA installation instruction based on the client's browser type.
 * @param {object} props - Component props.
 * @param {string} props.ctaToRender - the installation instruction to render.
 * @param {function} props.closeModal - Function to close the modal.
 * @returns {JSX.Element} React component.
 */
const RenderInstallPwaCta = ({ ctaToRender, closeModal }) => {
  const Cta = () => {
    let component;
    switch (ctaToRender) {
      case "firefox":
        component = <InstallPwaFirefox closeModal={closeModal} />;
        break;
      case "iPadIPhone":
        component = <InstallPwaSafari closeModal={closeModal} />;
        break;
      case "samsung":
        component = <InstallPwaSamsungBrowser closeModal={closeModal} />;
        break;
      case "opera":
        component = <InstallPwaOpera closeModal={closeModal} />;
        break;
      case "pwaInstallPrompt":
        component = <InstallPwaPrompt closeModal={closeModal} />;
        break;
      default:
        component = null; // If displayPrompt doesn't match any case, render nothing
    }
    return <>{component}</>;
  };

  return (
    <>
      {ctaToRender !== "" && (
        <div className={styles.container}>
          <Cta />
        </div>
      )}
    </>
  );
};

export default RenderInstallPwaCta;
