import { useState } from "react";

// TODO: Rename, refactor and decide whether this should live in context or remain as a custom hook
const useConfirmationModalLogicAndActions = (
  onConfirmationCallbacks,
  onShowCallbacks,
  onHideCallbacks,
) => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleConfirmation = async () => {
    setIsConfirmationVisible(false);

    // Check whether single confirmation callback or multiple
    if (onConfirmationCallbacks) {
      const callbackArray = Array.isArray(onConfirmationCallbacks)
        ? onConfirmationCallbacks
        : [onConfirmationCallbacks];

      // Execute callback(s) sequentially
      await callbackArray.reduce(async (previousPromise, callback) => {
        await previousPromise;
        return callback();
      }, Promise.resolve());
    }
  };

  const handleShowConfirmation = () => {
    setIsConfirmationVisible(true);

    if (onShowCallbacks) {
      const showCallbackArray = Array.isArray(onShowCallbacks)
        ? onShowCallbacks
        : [onShowCallbacks];
      showCallbackArray.forEach((callback) => callback());
    }
  };

  const handleHideConfirmation = () => {
    setIsConfirmationVisible(false);

    if (onHideCallbacks) {
      const hideCallbackArray = Array.isArray(onHideCallbacks)
        ? onHideCallbacks
        : [onHideCallbacks];
      hideCallbackArray.forEach((callback) => callback());
    }
  };

  return {
    isConfirmationVisible,
    handleConfirmation,
    handleShowConfirmation,
    handleHideConfirmation,
  };
};

export default useConfirmationModalLogicAndActions;
