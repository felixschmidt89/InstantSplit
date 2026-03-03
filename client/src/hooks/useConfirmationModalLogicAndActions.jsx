// React and Third-Party Libraries
import { useState } from "react";

/**
 * Custom hook for managing modal confirmation logic and actions.
 *
 * @param {Function|Array<Function>} onConfirmationCallbacks - Either a single callback function or an array of callback functions
 * to be executed sequentially on confirmation.
 * @param {Function|Array<Function>} onShowCallbacks - Either a single callback function or an array of callback functions
 * to be executed when showing the confirmation dialog.
 * @param {Function|Array<Function>} onHideCallbacks - Either a single callback function or an array of callback functions
 * to be executed when hiding the confirmation dialog.
 * @returns {{
 *   isConfirmationVisible: boolean, - A boolean flag indicating whether the confirmation dialog is visible.
 *   handleConfirmation: () => Promise<void>, - Function to handle the confirmed action(s) by executing the provided
 *   callback(s) in order and returning a promise representing their completion.
 *   handleShowConfirmation: () => void, - Function to show the confirmation dialog.
 *   handleHideConfirmation: () => void - Function to hide the confirmation dialog.
 * }}
 */
// TODO: Rename and refactor
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
