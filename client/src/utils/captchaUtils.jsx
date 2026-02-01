import axios from "axios";
import { debugLog } from "../../../shared/utils/debug";
import { API_URL } from "../constants/apiConstants";

const verifyFriendlyCaptchaSolution = async (solution, secret) => {
  try {
    debugLog("Started verifying Friendly Captcha solution.");
    const response = await axios.post(`${API_URL}/captchas/verify-captcha`, {
      solution,
      secret,
    });
    debugLog("CaptchaVerified:", response);
    return response.data;
  } catch (error) {
    // Log the error in production for monitoring
    console.error("Error verifying captcha:", error);
    throw error;
  }
};

export default verifyFriendlyCaptchaSolution;
