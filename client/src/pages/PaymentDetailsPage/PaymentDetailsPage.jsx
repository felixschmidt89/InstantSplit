import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import emojiConstants from "../../constants/emojiConstants";

import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import Spinner from "../../components/Spinner/Spinner";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import RenderPaymentDetails from "../../components/Payments/RenderPaymentDetails/RenderPaymentDetails";
import RenderResourceCreated from "../../components/RenderResourceCreated/RenderResourceCreated";
import Emoji from "../../components/Emoji/Emoji";
import RouteButton from "../../components/InAppNavigation/RouteButton/RouteButton";
import DeleteResource from "../../components/DeleteResource/DeleteResource";

import styles from "./PaymentDetailsPage.module.css";
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo.jsx";
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency.jsx";

const PaymentDetailsPage = () => {
  const { t } = useTranslation();
  const { groupCode, itemId } = useParams();

  const { paymentInfo, isFetched: isPaymentLoaded } =
    useFetchPaymentInfo(itemId);
  const { groupCurrency, isFetched: isCurrencyLoaded } =
    useFetchGroupCurrency(groupCode);

  const isPageReady = isPaymentLoaded && isCurrencyLoaded;

  if (!isPageReady) return <Spinner />;

  return (
    <main>
      // TODO: dont use strings
      <HelmetMetaTagsNetlify title={t("payment-details-page-title")} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <span className={styles.emoji}>
          <Emoji ariaLabel='payment emoji' emoji={emojiConstants.payment} />
        </span>
        <h1>
          {paymentInfo.paymentAmount.toFixed(2)} {groupCurrency}
        </h1>
        <div className={styles.detailsBox}>
          <RenderPaymentDetails
            groupCode={groupCode}
            paymentInfo={paymentInfo}
            groupCurrency={groupCurrency}
          />
          <RenderResourceCreated
            createdAt={paymentInfo.createdAt}
            updatedAt={paymentInfo.updatedAt}
          />
        </div>
        // TODO: dont use strings
        <RouteButton
          route={`update-payment/${groupCode}/${itemId}`}
          buttonText={t("payment-details-edit-payment-button-text")}
          setPreviousRoute={true}
          endIcon='edit'
        />
        <DeleteResource resourceId={itemId} resourceType='payments' />
      </div>
    </main>
  );
};

export default PaymentDetailsPage;
