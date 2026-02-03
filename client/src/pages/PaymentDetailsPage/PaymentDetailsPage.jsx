// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

// Hooks
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo";
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";

// Components
import HelmetMetaTagsNetlify from "../../components/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import Spinner from "../../components/Spinner/Spinner";
import RouteButton from "../../components/InAppNavigation/RouteButton/RouteButton";
import DeleteResource from "../../components/DeleteResource/DeleteResource";
import InAppNavigationBar from "../../components/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import RenderPaymentDetails from "../../components/Payments/RenderPaymentDetails/RenderPaymentDetails";
import RenderResourceCreated from "../../components/RenderResourceCreated/RenderResourceCreated";
import Emoji from "../../components/Emoji/Emoji";

// Styles
import styles from "./PaymentDetailsPage.module.css";

const PaymentDetailsPage = () => {
  const { t } = useTranslation();
  const { groupCode, itemId } = useParams();
  const { paymentInfo, isFetched: paymentInfoIsFetched } =
    useFetchPaymentInfo(itemId);
  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("payment-details-page-title")} />
      <InAppNavigationBar back={true} />
      {paymentInfoIsFetched && currencyInfoIsFetched ? (
        <div className={styles.container}>
          <span className={styles.emoji}>
            <Emoji
              ariaLabel={"payment to other user emoji"}
              emoji={emojiConstants.payment}></Emoji>{" "}
          </span>
          <h1>
            {paymentInfo.paymentAmount.toFixed(2)}
            {groupCurrency}
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
          <RouteButton
            route={`update-payment/${groupCode}/${itemId}`}
            buttonText={t("payment-details-edit-payment-button-text")}
            setPreviousRoute={true}
            endIcon={"edit"}
          />
          <DeleteResource resourceId={itemId} resourceType='payments' />
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default PaymentDetailsPage;
