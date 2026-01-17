import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "./themes/muiTheme";
import Footer from "./components/common/Footer/Footer";
import PageNotFoundPage from "./pages/PageNotFound/PageNotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import OnboardingCreateGroupPage from "./pages/OnboardingCreateGroupPage/OnboardingCreateGroupPage";
import InstantSplitPage from "./pages/InstantSplitPage/InstantSplitPage";
import CreateExpensePage from "./pages/CreateExpensePage/CreateExpensePage";
import CreatePaymentPage from "./pages/CreatePaymentPage/CreatePaymentPage";
import ExpenseDetailsPage from "./pages/ExpenseDetailsPage/ExpenseDetailsPage";
import PaymentDetailsPage from "./pages/PaymentDetailsPage/PaymentDetailsPage";
import OnboardingGroupSettingsPage from "./pages/OnboardingGroupSettingsPage/OnboardingGroupSettingsPage";
import ValidateProvidedGroupCodePage from "./pages/ValidateProvidedGroupCodePage/ValidateProvidedGroupCodePage";
import LegalNoticePage from "./pages/LegalNoticePage/LegalNoticePage";
import TutorialPage from "./pages/TutorialPage/TutorialPage";
import UpdateExpensePage from "./pages/UpdateExpensePage/UpdateExpensePage";
import UpdatePaymentPage from "./pages/UpdatePaymentPage/UpdatePaymentPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import EnterGroupCodePage from "./pages/EnterGroupCodePage/EnterGroupCodePage";
import ManageGroupsPage from "./pages/ManageGroupsPage/ManageGroupsPage";
import GroupSettingsPage from "./pages/GroupSettingsPage/GroupSettingsPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ShareGroupInvitationPage from "./pages/ShareGroupInvitationPage/ShareGroupInvitationPage";
import LeaveGroupPage from "./pages/LeaveGroupPage/LeaveGroupPage";
import JoinGroupDEPage from "./pages/JoinGroupDEPage/JoinGroupDEPage";
import JoinGroupENPage from "./pages/JoinGroupENPage/JoinGroupENPage";
import CreateGroupMemberPage from "./pages/CreateGroupMemberPage/CreateGroupMemberPage";
import SettleExpensesPage from "./pages/SettleExpensesPage/SettleExpensesPage";
import GroupMemberDetailsPage from "./pages/GroupMemberDetailsPage/GroupMemberDetailsPage";
import GroupMemberTransactionHistoryPage from "./pages/GroupMemberTransactionHistoryPage/GroupMemberTransactionHistoryPage";
import { ROUTES } from "./constants/routesConstants";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <HelmetProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.LEGAL_NOTICE} element={<LegalNoticePage />} />
            <Route
              path={ROUTES.ONBOARDING.GROUP_SETTINGS}
              element={<OnboardingGroupSettingsPage />}
            />
            <Route
              path={ROUTES.ONBOARDING.CREATE_GROUP}
              element={<OnboardingCreateGroupPage />}
            />
            <Route
              path={ROUTES.ONBOARDING.ENTER_GROUPCODE}
              element={<EnterGroupCodePage />}
            />
            <Route
              path={ROUTES.VALIDATORS.GROUPCODE}
              element={<ValidateProvidedGroupCodePage />}
            />
            <Route path={ROUTES.JOIN_GROUP.DE} element={<JoinGroupDEPage />} />
            <Route path={ROUTES.JOIN_GROUP.EN} element={<JoinGroupENPage />} />
            <Route path={ROUTES.TUTORIAL} element={<TutorialPage />} />
            <Route path={ROUTES.INSTANT_SPLIT} element={<InstantSplitPage />} />
            <Route
              path={ROUTES.EXPENSE.CREATE}
              element={<CreateExpensePage />}
            />
            <Route
              path={ROUTES.EXPENSE.UPDATE}
              element={<UpdateExpensePage />}
            />
            <Route
              path={ROUTES.PAYMENT.CREATE}
              element={<CreatePaymentPage />}
            />
            <Route
              path={ROUTES.PAYMENT.UPDATE}
              element={<UpdatePaymentPage />}
            />
            <Route
              path={ROUTES.MEMBERS.CREATE}
              element={<CreateGroupMemberPage />}
            />
            <Route
              path={ROUTES.SETTLE_EXPENSES}
              element={<SettleExpensesPage />}
            />
            <Route
              path={ROUTES.MEMBERS.DETAILS}
              element={<GroupMemberDetailsPage />}
            />
            <Route
              path={ROUTES.MEMBERS.TRANSACTION_HISTORY}
              element={<GroupMemberTransactionHistoryPage />}
            />
            <Route
              path={ROUTES.PAYMENT.DETAILS}
              element={<PaymentDetailsPage />}
            />
            <Route
              path={ROUTES.EXPENSE.DETAILS}
              element={<ExpenseDetailsPage />}
            />
            <Route path={ROUTES.LEAVE_GROUP} element={<LeaveGroupPage />} />
            <Route
              path={ROUTES.SHARE_GROUP}
              element={<ShareGroupInvitationPage />}
            />
            <Route path={ROUTES.MANAGE_GROUPS} element={<ManageGroupsPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            <Route
              path={ROUTES.GROUP_SETTINGS}
              element={<GroupSettingsPage />}
            />
            <Route
              path={ROUTES.TERMS_AND_CONDITIONS}
              element={<TermsAndConditionsPage />}
            />
            <Route path={ROUTES.NOT_FOUND} element={<PageNotFoundPage />} />
          </Routes>
          <Footer />
        </HelmetProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
