import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import usePaymentUpdate from "../../hooks/usePaymentUpdate";
import useDetermineUpdateTransactionPageOpeningSource from "../../hooks/useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory";
import { useGroupContext } from "../../context/GroupContext";

import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import Spinner from "../../components/Spinner/Spinner";
import UpdatePayment from "../../components/Payments/UpdatePayment/UpdatePayment";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

import styles from "./UpdatePaymentPage.module.css";

const UpdatePaymentPage = () => {
  const { paymentId } = useParams();
  const { t } = useTranslation();

  const { activeGroupCode } = useGroupContext();

  const { isChecked, openedViaGroupHistory, openedViaUserTransactionsHistory } =
    useDetermineUpdateTransactionPageOpeningSource();

  const { isLoading, paymentInfo, groupMembers } = usePaymentUpdate(paymentId);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("update-payment-page-title")} />

      {isChecked && openedViaGroupHistory && (
        <InAppNavigationBar previousRoute={true} home={true} />
      )}
      {isChecked && openedViaUserTransactionsHistory && (
        <InAppNavigationBar nestedPreviousRoute={true} home={true} />
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.header}>{t("update-payment-page-header")} </h1>
          <div className={styles.innerContainer}>
            <UpdatePayment paymentDetails={paymentInfo} />
          </div>
        </div>
      )}
    </main>
  );
};

export default UpdatePaymentPage;
