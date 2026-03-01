import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "./themes/muiTheme";

import GroupContextWrapper from "./wrappers/GroupContextWrapper";

import Footer from "./components/Footer/Footer";
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

import { CLIENT_ROUTES } from "./constants/clientRoutesConstants.js";
import { GroupProvider } from "./context/GroupContext.jsx";
import "./App.css";

const {
  LEGAL_NOTICE,
  ONBOARDING,
  VALIDATORS,
  JOIN_GROUP,
  TUTORIAL,
  INSTANT_SPLIT,
  MANAGE_GROUPS,
  CONTACT,
  TERMS_AND_CONDITIONS,
  MEMBERS,
  EXPENSE,
  PAYMENT,
  SETTLE_EXPENSES,
  LEAVE_GROUP,
  SHARE_GROUP,
  GROUP_SETTINGS,
  NOT_FOUND,
} = CLIENT_ROUTES;

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <GroupProvider>
        <BrowserRouter>
          <HelmetProvider>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path={LEGAL_NOTICE} element={<LegalNoticePage />} />
              <Route
                path={ONBOARDING.GROUP_SETTINGS}
                element={<OnboardingGroupSettingsPage />}
              />
              <Route
                path={ONBOARDING.CREATE_GROUP}
                element={<OnboardingCreateGroupPage />}
              />
              <Route
                path={ONBOARDING.ENTER_GROUPCODE}
                element={<EnterGroupCodePage />}
              />
              <Route
                path={VALIDATORS.GROUPCODE}
                element={<ValidateProvidedGroupCodePage />}
              />
              <Route path={JOIN_GROUP.DE} element={<JoinGroupDEPage />} />
              <Route path={JOIN_GROUP.EN} element={<JoinGroupENPage />} />
              <Route path={TUTORIAL} element={<TutorialPage />} />
              <Route path={INSTANT_SPLIT} element={<InstantSplitPage />} />
              <Route path={MANAGE_GROUPS} element={<ManageGroupsPage />} />
              <Route path={CONTACT} element={<ContactPage />} />
              <Route
                path={TERMS_AND_CONDITIONS}
                element={<TermsAndConditionsPage />}
              />

              {/* Protected / Context Routes */}
              <Route element={<GroupContextWrapper />}>
                <Route
                  path={MEMBERS.TRANSACTION_HISTORY}
                  element={<GroupMemberTransactionHistoryPage />}
                />
                <Route
                  path={MEMBERS.DETAILS}
                  element={<GroupMemberDetailsPage />}
                />
                <Route path={EXPENSE.CREATE} element={<CreateExpensePage />} />
                <Route path={EXPENSE.UPDATE} element={<UpdateExpensePage />} />
                <Route path={PAYMENT.CREATE} element={<CreatePaymentPage />} />
                <Route path={PAYMENT.UPDATE} element={<UpdatePaymentPage />} />
                <Route
                  path={MEMBERS.CREATE}
                  element={<CreateGroupMemberPage />}
                />
                <Route
                  path={SETTLE_EXPENSES}
                  element={<SettleExpensesPage />}
                />
                <Route
                  path={PAYMENT.DETAILS}
                  element={<PaymentDetailsPage />}
                />
                <Route
                  path={EXPENSE.DETAILS}
                  element={<ExpenseDetailsPage />}
                />
                <Route path={LEAVE_GROUP} element={<LeaveGroupPage />} />
                <Route
                  path={SHARE_GROUP}
                  element={<ShareGroupInvitationPage />}
                />
                <Route path={GROUP_SETTINGS} element={<GroupSettingsPage />} />
              </Route>

              <Route path={NOT_FOUND} element={<PageNotFoundPage />} />
            </Routes>
            <Footer />
          </HelmetProvider>
        </BrowserRouter>
      </GroupProvider>
    </ThemeProvider>
  );
};

export default App;
