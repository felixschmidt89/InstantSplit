import { useEffect, useState } from "react";
import useGetClientDeviceAndPwaInfo from "./useGetClientDeviceAndPwaInfo";
import emojiConstants from "../constants/emojiConstants";
import { BROWSERS } from "../constants/browserConstants";

const useSettingsEmoji = () => {
  const { browserName } = useGetClientDeviceAndPwaInfo();

  const [settingsEmoji, setSettingsEmoji] = useState(
    emojiConstants.settings || "⚙️",
  );

  useEffect(() => {
    if (!browserName) return;

    const lowerCaseBrowser = browserName.toLowerCase();

    const hasSettingsEmojiRenderingBug =
      lowerCaseBrowser.includes(BROWSERS.FIREFOX) ||
      lowerCaseBrowser.includes(BROWSERS.CHROME);

    const emojiToUse = hasSettingsEmojiRenderingBug
      ? emojiConstants.settingsFallback
      : emojiConstants.settings;

    setSettingsEmoji(emojiToUse);
  }, [browserName]);

  return settingsEmoji;
};

export default useSettingsEmoji;
