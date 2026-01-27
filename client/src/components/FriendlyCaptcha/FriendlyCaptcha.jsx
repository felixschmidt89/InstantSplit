// React and Third-Party Libraries
import { useEffect, useRef } from "react";
import { WidgetInstance } from "friendly-challenge";

// Constants and Utils
import { devLog } from "../../../utils/errorUtils";
import verifyFriendlyCaptchaSolution from "../../../utils/captchaUtils";

// Styles
import styles from "./FriendlyCaptcha.module.css";

/**
 * Friendly Captcha widget (automatic and privacy respecting captcha mechanism). Should only be applied outside of the main application, ie when there is no active group in local storage, to prevent malicious attacks and must always be used directly in form elements
 *  Documentation: [Friendly Captcha Documentation](https://docs.friendlycaptcha.com/#/)
 * @param {string} props.sitekey - The sitekey (obtained from Friendly Captcha)
 *  @param {string} props.secret - The API key obtained from Friendly Captcha)
 * @returns {JSX.Element} React component.
 */
const FriendlyCaptcha = ({ sitekey, secret, setFriendlyCaptchaIsVerified }) => {
  const container = useRef();
  const widget = useRef();

  devLog("Friendly captcha sitekey", sitekey);
  devLog("friendlySecret", secret);

  const doneCallback = async (solution) => {
    try {
      devLog("Friendly Captcha solved:", solution);

      const verificationResult = await verifyFriendlyCaptchaSolution(
        solution,
        secret
      );
      devLog("Verification result:", verificationResult);

      // Check the verification result
      if (verificationResult.status === "success") {
        devLog("Friendly Captcha verified successfully.");
        setFriendlyCaptchaIsVerified(true);
      } else {
        devLog("Failed to verify Friendly Captcha.");
        // Allow form submission also for failed verifications as recommended by FriendlyCaptcha
        setFriendlyCaptchaIsVerified(true);
      }
    } catch (error) {
      devLog("Error verifying captcha:", error);
      setFriendlyCaptchaIsVerified(false);
    }
  };

  const errorCallback = (err) => {
    devLog("There was an error when trying to solve the Captcha.");
    devLog("Error:", err);
  };

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: "auto",
        doneCallback: doneCallback,
        errorCallback: errorCallback,
      });
    }

    return () => {
      if (widget.current !== undefined) widget.current.reset();
    };
  }, [container]);

  return (
    <div
      ref={container}
      className={`${styles.container} frc-captcha`}
      data-sitekey={sitekey}
    />
  );
};

export default FriendlyCaptcha;
