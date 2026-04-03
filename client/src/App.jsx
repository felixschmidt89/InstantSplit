import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";

import GroupContextWrapper from "./wrappers/GroupContextWrapper.jsx";

import Footer from "./components/Footer/Footer.jsx";
import PageNotFoundPage from "./pages/PageNotFound/PageNotFoundPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import OnboardingCreateGroupPage from "./pages/OnboardingCreateGroupPage/OnboardingCreateGroupPage.jsx";
import InstantSplitPage from "./pages/InstantSplitPage/InstantSplitPage.jsx";
import CreateExpensePage from "./pages/CreateExpensePage/CreateExpensePage.jsx";
import CreatePaymentPage from "./pages/CreatePaymentPage/CreatePaymentPage.jsx";
import ExpenseDetailsPage from "./pages/ExpenseDetailsPage/ExpenseDetailsPage.jsx";
import PaymentDetailsPage from "./pages/PaymentDetailsPage/PaymentDetailsPage.jsx";
import OnboardingGroupSettingsPage from "./pages/OnboardingGroupSettingsPage/OnboardingGroupSettingsPage.jsx";
import LegalNoticePage from "./pages/LegalNoticePage/LegalNoticePage.jsx";
import TutorialPage from "./pages/TutorialPage/TutorialPage.jsx";
import UpdateExpensePage from "./pages/UpdateExpensePage/UpdateExpensePage.jsx";
import UpdatePaymentPage from "./pages/UpdatePaymentPage/UpdatePaymentPage.jsx";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage.jsx";
import ManageGroupsPage from "./pages/ManageGroupsPage/ManageGroupsPage.jsx";
import GroupSettingsPage from "./pages/GroupSettingsPage/GroupSettingsPage.jsx";
import ShareGroupInvitationPage from "./pages/ShareGroupInvitationPage/ShareGroupInvitationPage.jsx";
import LeaveGroupPage from "./pages/LeaveGroupPage/LeaveGroupPage.jsx";
import JoinGroupDEPage from "./pages/JoinGroupDEPage/JoinGroupDEPage.jsx";
import JoinGroupENPage from "./pages/JoinGroupENPage/JoinGroupENPage.jsx";
import CreateGroupMemberPage from "./pages/CreateGroupMemberPage/CreateGroupMemberPage.jsx";
import SettleExpensesPage from "./pages/SettleExpensesPage/SettleExpensesPage.jsx";
import GroupMemberDetailsPage from "./pages/GroupMemberDetailsPage/GroupMemberDetailsPage.jsx";
import GroupMemberTransactionHistoryPage from "./pages/GroupMemberTransactionHistoryPage/GroupMemberTransactionHistoryPage.jsx";

import CLIENT_STATIC_ROUTES from "./constants/clientStaticRoutesConstants.js";
import CLIENT_ROUTE_PATTERNS from "./constants/clientDynamicRoutesConstants.js";
import { GroupProvider } from "./context/GroupContext.jsx";
import { ErrorProvider } from "./context/ErrorContext.jsx";
import "./App.css";
import muiTheme from "./themes/muiTheme.jsx";

const {
  LEGAL_NOTICE,
  ONBOARDING_GROUP_SETTINGS,
  ONBOARDING_CREATE_GROUP,
  INSTANT_SPLIT,
  MANAGE_GROUPS,
  TERMS_AND_CONDITIONS,
  CREATE_MEMBERS,
  SETTLE_EXPENSES,
  GROUP_SETTINGS,
  CREATE_EXPENSE,
  CREATE_PAYMENT,
} = CLIENT_STATIC_ROUTES;

const {
  JOIN_GROUP_DE,
  JOIN_GROUP_EN,
  TUTORIAL,
  SHARE_GROUP,
  LEAVE_GROUP,
  EXPENSE_DETAILS,
  PAYMENT_DETAILS,
  MEMBER_DETAILS,
  MEMBER_TRANSACTION_HISTORY,
  UPDATE_EXPENSE,
  UPDATE_PAYMENT,
  NOT_FOUND,
} = CLIENT_ROUTE_PATTERNS;

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <ErrorProvider>
        <GroupProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}>
            <HelmetProvider>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path={LEGAL_NOTICE} element={<LegalNoticePage />} />
                <Route
                  path={ONBOARDING_GROUP_SETTINGS}
                  element={<OnboardingGroupSettingsPage />}
                />
                <Route
                  path={ONBOARDING_CREATE_GROUP}
                  element={<OnboardingCreateGroupPage />}
                />
                <Route path={INSTANT_SPLIT} element={<InstantSplitPage />} />
                <Route path={MANAGE_GROUPS} element={<ManageGroupsPage />} />
                <Route
                  path={TERMS_AND_CONDITIONS}
                  element={<TermsAndConditionsPage />}
                />
                <Route path={JOIN_GROUP_DE} element={<JoinGroupDEPage />} />
                <Route path={JOIN_GROUP_EN} element={<JoinGroupENPage />} />
                <Route path={TUTORIAL} element={<TutorialPage />} />

                <Route element={<GroupContextWrapper />}>
                  <Route
                    path={MEMBER_TRANSACTION_HISTORY}
                    element={<GroupMemberTransactionHistoryPage />}
                  />
                  <Route
                    path={MEMBER_DETAILS}
                    element={<GroupMemberDetailsPage />}
                  />
                  <Route
                    path={UPDATE_EXPENSE}
                    element={<UpdateExpensePage />}
                  />
                  <Route
                    path={UPDATE_PAYMENT}
                    element={<UpdatePaymentPage />}
                  />
                  <Route
                    path={PAYMENT_DETAILS}
                    element={<PaymentDetailsPage />}
                  />
                  <Route
                    path={EXPENSE_DETAILS}
                    element={<ExpenseDetailsPage />}
                  />
                  <Route path={LEAVE_GROUP} element={<LeaveGroupPage />} />
                  <Route
                    path={SHARE_GROUP}
                    element={<ShareGroupInvitationPage />}
                  />

                  <Route
                    path={CREATE_EXPENSE}
                    element={<CreateExpensePage />}
                  />
                  <Route
                    path={CREATE_PAYMENT}
                    element={<CreatePaymentPage />}
                  />
                  <Route
                    path={CREATE_MEMBERS}
                    element={<CreateGroupMemberPage />}
                  />
                  <Route
                    path={SETTLE_EXPENSES}
                    element={<SettleExpensesPage />}
                  />
                  <Route
                    path={GROUP_SETTINGS}
                    element={<GroupSettingsPage />}
                  />
                </Route>
                <Route path={NOT_FOUND} element={<PageNotFoundPage />} />
              </Routes>
              <Footer />
            </HelmetProvider>
          </BrowserRouter>
        </GroupProvider>
      </ErrorProvider>
    </ThemeProvider>
  );
};

export default App;
