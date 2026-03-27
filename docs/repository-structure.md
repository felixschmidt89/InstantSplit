InstantSpilt
├── README.md
├── client
│   ├── babel.config.cjs
│   ├── client
│   ├── cypress
│   │   ├── fixtures
│   │   │   └── example.json
│   │   └── support
│   │       ├── commands.js
│   │       ├── component-index.html
│   │       ├── component.js
│   │       └── e2e.js
│   ├── cypress.config.js
│   ├── env.d.ts
│   ├── index.html
│   ├── jest.config.js
│   ├── jest.setup.js
│   ├── netlify.toml
│   ├── package.json
│   ├── public
│   │   ├── _redirects
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── app-image.png
│   │   ├── app-image2.png
│   │   ├── app-image3.png
│   │   ├── apple-touch-icon-180x180.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── favicon.png
│   │   ├── fonts
│   │   │   ├── NotoEmoji-Medium.ttf
│   │   │   ├── Ubuntu-Bold.ttf
│   │   │   ├── Ubuntu-Italic.ttf
│   │   │   ├── Ubuntu-Medium.ttf
│   │   │   └── Ubuntu-Regular.ttf
│   │   ├── icon.svg
│   │   ├── locales
│   │   │   ├── de
│   │   │   │   └── translations.json
│   │   │   └── en
│   │   │       └── translations.json
│   │   ├── logo_coloured.svg
│   │   ├── logo_unicolour.svg
│   │   ├── maskable-icon-512x512.png
│   │   ├── metaTagDefaultImg.png
│   │   ├── pwa-192x192.png
│   │   ├── pwa-512x512.png
│   │   ├── pwa-64x64.png
│   │   └── robots.txt
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── Main.jsx
│   │   ├── api
│   │   │   ├── axiosInstance.js
│   │   │   ├── common
│   │   │   │   ├── requestDeleteResource.js
│   │   │   │   └── requestUpdateResource.js
│   │   │   ├── expenses
│   │   │   │   ├── createExpense.js
│   │   │   │   ├── fetchExpense.js
│   │   │   │   ├── fetchGroupExpensesTotal.js
│   │   │   │   └── updateExpense.js
│   │   │   ├── groups
│   │   │   │   ├── createGroup.js
│   │   │   │   ├── fetchGroupCurrency.js
│   │   │   │   ├── fetchGroupData.js
│   │   │   │   ├── fetchGroupTransactions.js
│   │   │   │   ├── fetchHasPersistedSettlements.js
│   │   │   │   ├── fetchStoredGroupNames.js
│   │   │   │   ├── updateHasPersistedSettlements.js
│   │   │   │   └── validateGroupCode.js
│   │   │   ├── members
│   │   │   │   ├── fetchGroupMemberTransactions.js
│   │   │   │   └── fetchGroupMembers.js
│   │   │   ├── payments
│   │   │   │   └── fetchPayment.js
│   │   │   └── settlements
│   │   │       └── fetchSettlements.js
│   │   ├── assets
│   │   │   ├── flags
│   │   │   │   ├── de.svg
│   │   │   │   └── gb.svg
│   │   │   └── images
│   │   │       ├── android-chrome-512x512.png
│   │   │       ├── apple-touch-icon.png
│   │   │       ├── favicon.png
│   │   │       └── icon.svg
│   │   ├── components
│   │   │   ├── AcceptGroupInvitationAndJoinGroup
│   │   │   │   ├── AcceptGroupInvitation
│   │   │   │   │   ├── AcceptGroupInvitation.jsx
│   │   │   │   │   └── AcceptGroupInvitation.module.css
│   │   │   │   ├── InvitationIntro
│   │   │   │   │   ├── InvitationIntro.module.css
│   │   │   │   │   └── InvitationIntro.tsx
│   │   │   │   └── JoinGroupViaInvitation
│   │   │   │       ├── JoinGroupViaInvitation.module.css
│   │   │   │       └── JoinGroupViaInvitation.tsx
│   │   │   ├── ActiveGroupBar
│   │   │   │   ├── ActiveGroupBar.jsx
│   │   │   │   └── ActiveGroupBar.module.css
│   │   │   ├── ChangeResourceName
│   │   │   │   ├── ChangeResourceName.jsx
│   │   │   │   └── ChangeResourceName.module.css
│   │   │   ├── ConfirmationModal
│   │   │   │   ├── ConfirmationModal.jsx
│   │   │   │   └── ConfirmationModal.module.css
│   │   │   ├── CopyToClipboard
│   │   │   │   ├── CopyToClipboard.jsx
│   │   │   │   └── CopyToClipboard.module.css
│   │   │   ├── CreateGroupMember
│   │   │   │   ├── CreateGroupMemberForm
│   │   │   │   │   ├── CreateGroupMemberForm.jsx
│   │   │   │   │   └── CreateGroupMemberForm.module.css
│   │   │   │   ├── DeleteGroupMemberBin
│   │   │   │   │   ├── DeleteGroupMemberBin.jsx
│   │   │   │   │   └── DeleteGroupMemberBin.module.css
│   │   │   │   └── GroupMemberNames
│   │   │   │       ├── GroupMemberNames.jsx
│   │   │   │       └── GroupMemberNames.module.css
│   │   │   ├── DefaultAndUserSettingsBar
│   │   │   │   ├── DefaultAndUserSettingsBar.jsx
│   │   │   │   └── DefaultAndUserSettingsBar.module.css
│   │   │   ├── DeleteResource
│   │   │   │   ├── DeleteResource.jsx
│   │   │   │   └── DeleteResource.module.css
│   │   │   ├── EditPenButton
│   │   │   │   ├── EditPenButton.jsx
│   │   │   │   └── EditPenButton.module.css
│   │   │   ├── Emoji
│   │   │   │   ├── Emoji.jsx
│   │   │   │   └── Emoji.module.css
│   │   │   ├── ErrorDisplay
│   │   │   │   ├── ErrorDisplay.jsx
│   │   │   │   └── ErrorDisplay.module.css
│   │   │   ├── ErrorModal
│   │   │   │   ├── ErrorModal.jsx
│   │   │   │   └── ErrorModal.module.css
│   │   │   ├── Expenses
│   │   │   │   ├── CreateExpense
│   │   │   │   │   ├── CreateExpense.jsx
│   │   │   │   │   └── CreateExpense.module.css
│   │   │   │   ├── ExpenseAmountInput
│   │   │   │   │   ├── ExpenseAmountInput.jsx
│   │   │   │   │   └── ExpenseAmountInput.module.css
│   │   │   │   ├── ExpenseBeneficiariesInput
│   │   │   │   │   ├── ExpenseBeneficiariesInput.jsx
│   │   │   │   │   └── ExpenseBeneficiariesInput.module.css
│   │   │   │   ├── ExpenseDescriptionInput
│   │   │   │   │   ├── ExpenseDescriptionInput.jsx
│   │   │   │   │   └── ExpenseDescriptionInput.module.css
│   │   │   │   ├── ExpensePayerSelect
│   │   │   │   │   ├── ExpensePayerSelect.jsx
│   │   │   │   │   └── ExpensePayerSelect.module.css
│   │   │   │   ├── RenderExpenseBeneficiaries
│   │   │   │   │   ├── RenderExpenseBeneficiaries.jsx
│   │   │   │   │   └── RenderExpenseBeneficiaries.module.css
│   │   │   │   ├── RenderExpenseDetails
│   │   │   │   │   ├── RenderExpenseDetails.jsx
│   │   │   │   │   └── RenderExpenseDetails.module.css
│   │   │   │   └── UpdateExpense
│   │   │   │       ├── UpdateExpense.jsx
│   │   │   │       └── UpdateExpense.module.css
│   │   │   ├── Footer
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Footer.module.css
│   │   │   ├── FormSubmitButton
│   │   │   │   ├── FormSubmitButton.jsx
│   │   │   │   └── FormSubmitButton.module.css
│   │   │   ├── FriendlyCaptcha
│   │   │   │   ├── FriendlyCaptcha.jsx
│   │   │   │   └── FriendlyCaptcha.module.css
│   │   │   ├── GroupActionsEmojiButton
│   │   │   │   ├── GroupActionsEmojiButton.module.css
│   │   │   │   └── GroupActionsEmojiButton.tsx
│   │   │   ├── GroupBalancesAndHistory
│   │   │   │   ├── CreateGroupMemberCTA
│   │   │   │   │   ├── CreateGroupMemberCTA.jsx
│   │   │   │   │   └── CreateGroupMemberCTA.module.css
│   │   │   │   ├── GroupBalances
│   │   │   │   │   ├── GroupBalances
│   │   │   │   │   │   ├── GroupBalances.jsx
│   │   │   │   │   │   └── GroupBalances.module.css
│   │   │   │   │   └── GroupMemberBalance
│   │   │   │   │       ├── GroupMemberBalance.jsx
│   │   │   │   │       └── GroupMemberBalance.module.css
│   │   │   │   ├── GroupHistory
│   │   │   │   │   ├── GroupExpense
│   │   │   │   │   │   ├── GroupExpense.jsx
│   │   │   │   │   │   └── GroupExpense.module.css
│   │   │   │   │   ├── GroupHistory
│   │   │   │   │   │   ├── GroupHistory.jsx
│   │   │   │   │   │   └── GroupHistory.module.css
│   │   │   │   │   ├── GroupPayment
│   │   │   │   │   │   ├── GroupPayment.jsx
│   │   │   │   │   │   └── GroupPayment.module.css
│   │   │   │   │   ├── NoGroupTransactions
│   │   │   │   │   │   ├── NoGroupTransactions.jsx
│   │   │   │   │   │   └── NoGroupTransactions.module.css
│   │   │   │   │   └── RenderTotalGroupExpenses
│   │   │   │   │       ├── RenderGroupExpensesTotal.jsx
│   │   │   │   │       └── RenderGroupExpensesTotal.module.css
│   │   │   │   ├── NotEnoughGroupMembers
│   │   │   │   │   ├── NotEnoughGroupMembers.jsx
│   │   │   │   │   └── NotEnoughGroupMembers.module.css
│   │   │   │   ├── SwitchViewButton
│   │   │   │   │   ├── SwitchViewButton.module.css
│   │   │   │   │   └── SwitchViewButton.tsx
│   │   │   │   └── SwitchViewButtonsBar
│   │   │   │       ├── SwitchViewButtonsBar.jsx
│   │   │   │       └── SwitchViewButtonsBar.module.css
│   │   │   ├── GroupMemberDetails
│   │   │   │   ├── GroupMemberName
│   │   │   │   │   ├── GroupMemberName.jsx
│   │   │   │   │   └── GroupMemberName.module.css
│   │   │   │   └── GroupMemberTotals
│   │   │   │       └── UserTotals
│   │   │   │           ├── GroupMemberTotals.jsx
│   │   │   │           └── GroupMemberTotals.module.css
│   │   │   ├── GroupMemberTransactionsHistory
│   │   │   │   ├── GroupMemberExpense
│   │   │   │   │   ├── GroupMemberExpense.jsx
│   │   │   │   │   └── GroupMemberExpense.module.css
│   │   │   │   ├── GroupMemberTransactionsHistory
│   │   │   │   │   ├── GroupMemberTransactionsHistory.jsx
│   │   │   │   │   └── GroupMemberTransactionsHistory.module.css
│   │   │   │   ├── NoGroupMemberTransactions
│   │   │   │   │   ├── NoGroupMemberTransactions.jsx
│   │   │   │   │   └── NoGroupMemberTransactions.module.css
│   │   │   │   └── RenderGroupMemberPayment
│   │   │   │       ├── RenderGroupMemberPayment.jsx
│   │   │   │       └── RenderGroupMemberPayment.module.css
│   │   │   ├── GroupSettings
│   │   │   │   ├── ChangeDataPurgeSetting
│   │   │   │   │   ├── ChangeDataPurgeSetting.jsx
│   │   │   │   │   └── ChangeDataPurgeSetting.module.css
│   │   │   │   ├── ChangeGroupCurrency
│   │   │   │   │   ├── ChangeGroupCurrency.jsx
│   │   │   │   │   └── ChangeGroupCurrency.module.css
│   │   │   │   ├── ChangeGroupName
│   │   │   │   │   ├── ChangeGroupName.jsx
│   │   │   │   │   └── ChangeGroupName.module.css
│   │   │   │   └── GroupCodeSecurity
│   │   │   │       ├── GroupCodeSecurity.jsx
│   │   │   │       └── GroupCodeSecurity.module.css
│   │   │   ├── HelmetMetaTagsNetlify
│   │   │   │   └── HelmetMetaTagsNetlify.jsx
│   │   │   ├── Home
│   │   │   │   ├── GetStartedSection
│   │   │   │   │   ├── GetStartedSection.jsx
│   │   │   │   │   └── GetStartedSection.module.css
│   │   │   │   ├── InstantSplitIntroSection
│   │   │   │   │   ├── InstantSplitIntroSection.module.css
│   │   │   │   │   └── InstantSplitIntroSection.tsx
│   │   │   │   └── TermsAndConditionsSection
│   │   │   │       ├── TermsAndConditionsSection.jsx
│   │   │   │       └── TermsAndConditionsSection.module.css
│   │   │   ├── InAppNavigation
│   │   │   │   ├── InAppNavigationBar
│   │   │   │   │   ├── InAppNavigationBar.jsx
│   │   │   │   │   └── InAppNavigationBar.module.css
│   │   │   │   ├── LinkToPage
│   │   │   │   │   ├── LinkToPage.jsx
│   │   │   │   │   └── LinkToPage.module.css
│   │   │   │   ├── ReactIconNavigate
│   │   │   │   │   ├── ReactIconNavigate.jsx
│   │   │   │   │   └── ReactIconNavigate.module.css
│   │   │   │   └── RouteButton
│   │   │   │       ├── RouteButton.jsx
│   │   │   │       └── RouteButton.module.css
│   │   │   ├── InstantSplitLogo
│   │   │   │   ├── InstantSplitLogo.jsx
│   │   │   │   └── InstantSplitLogo.module.css
│   │   │   ├── LanguageToggle
│   │   │   │   ├── LanguageToggle.jsx
│   │   │   │   └── LanguageToggle.module.css
│   │   │   ├── LegalNotice
│   │   │   │   ├── LegalNoticeAuthor
│   │   │   │   │   ├── LegalNoticeAuthor.jsx
│   │   │   │   │   └── LegalNoticeAuthor.module.css
│   │   │   │   ├── LegalNoticeSections
│   │   │   │   │   ├── LegalNoticeSections.jsx
│   │   │   │   │   └── LegalNoticeSections.module.css
│   │   │   │   └── legalNoticeData.js
│   │   │   ├── ManageGroups
│   │   │   │   ├── CreateGroupForm
│   │   │   │   │   ├── CreateGroupForm.jsx
│   │   │   │   │   └── CreateGroupForm.module.css
│   │   │   │   └── SwitchGroups
│   │   │   │       ├── GroupSelection
│   │   │   │       │   ├── GroupSelection.jsx
│   │   │   │       │   └── GroupSelection.module.css
│   │   │   │       └── SwitchGroups
│   │   │   │           ├── SwitchGroups.jsx
│   │   │   │           └── SwitchGroups.module.css
│   │   │   ├── Payments
│   │   │   │   ├── CreatePayment
│   │   │   │   │   ├── CreatePayment.jsx
│   │   │   │   │   └── CreatePayment.module.css
│   │   │   │   ├── PaymentAmountInput
│   │   │   │   │   ├── PaymentAmountInput.jsx
│   │   │   │   │   └── PaymentAmountInput.module.css
│   │   │   │   ├── PaymentMakerSelect
│   │   │   │   │   ├── PaymentMakerSelect.jsx
│   │   │   │   │   └── PaymentMakerSelect.module.css
│   │   │   │   ├── PaymentRecipientSelect
│   │   │   │   │   ├── PaymentRecipientSelect.jsx
│   │   │   │   │   └── PaymentRecipientSelect.module.css
│   │   │   │   ├── RenderPaymentDetails
│   │   │   │   │   ├── RenderPaymentDetails.jsx
│   │   │   │   │   └── RenderPaymentDetails.module.css
│   │   │   │   └── UpdatePayment
│   │   │   │       ├── UpdatePayment.jsx
│   │   │   │       └── UpdatePayment.module.css
│   │   │   ├── PwaCtaModal
│   │   │   │   ├── InstallPwaFirefox
│   │   │   │   │   ├── InstallPwaFirefox.jsx
│   │   │   │   │   └── InstallPwaFirefox.module.css
│   │   │   │   ├── InstallPwaOpera
│   │   │   │   │   ├── InstallPwaOpera.jsx
│   │   │   │   │   └── InstallPwaOpera.module.css
│   │   │   │   ├── InstallPwaPrompt
│   │   │   │   │   ├── InstallPwaPrompt.jsx
│   │   │   │   │   └── InstallPwaPrompt.module.css
│   │   │   │   ├── InstallPwaSafari
│   │   │   │   │   ├── InstallPwaSafari.jsx
│   │   │   │   │   └── InstallPwaSafari.module.css
│   │   │   │   ├── InstallPwaSamsungBrowser
│   │   │   │   │   ├── InstallPwaSamsungBrowser.jsx
│   │   │   │   │   └── InstallPwaSamsungBrowser.module.css
│   │   │   │   ├── PwaCtaModal
│   │   │   │   │   ├── PwaCtaModal.jsx
│   │   │   │   │   └── PwaCtaModal.module.css
│   │   │   │   └── RenderInstallPwaCta
│   │   │   │       ├── RenderInstallPwaCta.jsx
│   │   │   │       └── RenderInstallPwaCta.module.css
│   │   │   ├── RenderDataAttributeWithAriaLabel
│   │   │   │   ├── RenderDataAttributeWithAriaLabel.jsx
│   │   │   │   └── RenderDataAttributeWithAriaLabel.module.css
│   │   │   ├── RenderReactIcon
│   │   │   │   └── RenderReactIcon.jsx
│   │   │   ├── RenderResourceCreated
│   │   │   │   ├── RenderResourceCreated.jsx
│   │   │   │   └── RenderResourceCreated.module.css
│   │   │   ├── SettleExpenses
│   │   │   │   ├── ConfirmSettlementPayment
│   │   │   │   │   ├── ConfirmSettlementPayment.jsx
│   │   │   │   │   └── ConfirmSettlementPayment.module.css
│   │   │   │   ├── ExpensesSettled
│   │   │   │   │   ├── ExpensesSettled.jsx
│   │   │   │   │   └── ExpensesSettled.module.css
│   │   │   │   ├── RenderSettlementPaymentSuggestions
│   │   │   │   │   ├── RenderSettlementPaymentSuggestions.jsx
│   │   │   │   │   └── RenderSettlementPaymentSuggestions.module.css
│   │   │   │   └── SettleExpenses
│   │   │   │       ├── SettleExpenses.jsx
│   │   │   │       └── SettleExpenses.module.css
│   │   │   ├── ShareGroupInvitation
│   │   │   │   ├── ShareGroupInvitation
│   │   │   │   │   ├── ShareGroupInvitation.jsx
│   │   │   │   │   └── ShareGroupInvitation.module.css
│   │   │   │   ├── ShareGroupInvitationIncludingWebShare
│   │   │   │   │   ├── ShareGroupInvitationIncludingWebShare.jsx
│   │   │   │   │   └── ShareGroupInvitationIncludingWebShare.module.css
│   │   │   │   └── WebShareApiInvite
│   │   │   │       ├── WebShareApiInvite.jsx
│   │   │   │       └── WebShareApiInvite.module.css
│   │   │   ├── Spinner
│   │   │   │   ├── Spinner.cy.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   └── Spinner.module.css
│   │   │   ├── TermsAndConditions
│   │   │   │   ├── Disclaimer
│   │   │   │   │   ├── Disclaimer.jsx
│   │   │   │   │   └── Disclaimer.module.css
│   │   │   │   ├── SingleTermsAndConditions
│   │   │   │   │   ├── SingleTermsAndConditions.jsx
│   │   │   │   │   └── SingleTermsAndConditions.module.css
│   │   │   │   ├── TermsAndConditions
│   │   │   │   │   ├── TermsAndConditions.jsx
│   │   │   │   │   └── TermsAndConditions.module.css
│   │   │   │   └── termsAndConditionsConstants.js
│   │   │   └── Tutorial
│   │   │       ├── GroupBalanceAndHistoryExplanation
│   │   │       │   ├── GroupBalanceAndHistoryExplanation.jsx
│   │   │       │   └── GroupBalanceAndHistoryExplanation.module.css
│   │   │       ├── GroupCodeExplanation
│   │   │       │   ├── GroupCodeExplanation.module.css
│   │   │       │   └── GroupCodeExplanation.tsx
│   │   │       ├── RecommendedBrowsersExplanation
│   │   │       │   ├── RecommendedBrowsersExplanation.jsx
│   │   │       │   └── RecommendedBrowsersExplanation.module.css
│   │   │       └── SyncGroupCodeExplanation
│   │   │           ├── SyncGroupCodeExplanation.jsx
│   │   │           └── SyncGroupCodeExplanation.module.css
│   │   ├── config
│   │   │   ├── env
│   │   │   └── index.js
│   │   ├── constants
│   │   │   ├── __mocks__
│   │   │   │   └── apiConstants.js
│   │   │   ├── apiConstants.js
│   │   │   ├── browserConstants.js
│   │   │   ├── clientDynamicRoutesConstants.js
│   │   │   ├── clientRouteLinks.js
│   │   │   ├── clientStaticRoutesConstants.js
│   │   │   ├── configConstants.js
│   │   │   ├── emojiConstants.jsx
│   │   │   ├── fontConstants.js
│   │   │   ├── linkConstants.js
│   │   │   ├── localStorageConstants.js
│   │   │   ├── stylesConstants.jsx
│   │   │   └── viewConstants.js
│   │   ├── contents
│   │   │   ├── currenciesContent.jsx
│   │   │   └── legalNoticeContent.jsx
│   │   ├── context
│   │   │   ├── ErrorContext.jsx
│   │   │   └── GroupContext.jsx
│   │   ├── hooks
│   │   │   ├── api
│   │   │   │   ├── useApi.jsx
│   │   │   │   └── useGroupApi.jsx
│   │   │   ├── device
│   │   │   ├── expenses
│   │   │   ├── groups
│   │   │   ├── ui
│   │   │   ├── useAutoActiveGroupCodeRedirect.jsx
│   │   │   ├── useConfirmationModalLogicAndActions.jsx
│   │   │   ├── useDeleteResource.jsx
│   │   │   ├── useDynamicTranslation.jsx
│   │   │   ├── useEditPenVisibility.jsx
│   │   │   ├── useFetchExpenseInfo.jsx
│   │   │   ├── useFetchGroupCurrency.jsx
│   │   │   ├── useFetchGroupData.jsx
│   │   │   ├── useFetchGroupExpensesTotal.jsx
│   │   │   ├── useFetchGroupMemberData.jsx
│   │   │   ├── useFetchGroupMembers.jsx
│   │   │   ├── useFetchPaymentInfo.jsx
│   │   │   ├── useGetClientDeviceAndPwaInfo.jsx
│   │   │   ├── useGetStoredGroupsNames.jsx
│   │   │   ├── useGroupMemberTransactions.jsx
│   │   │   ├── useHasGroupPersistedSettlements.jsx
│   │   │   ├── useIsNotoEmojiFontLoaded.jsx
│   │   │   ├── useIsSlimDevice.jsx
│   │   │   ├── usePaymentUpdate.jsx
│   │   │   ├── usePolling.jsx
│   │   │   ├── useSettingsEmoji.jsx
│   │   │   ├── useSyncStoredGroupCodes.jsx
│   │   │   ├── useTriggerPwaInstallPrompt.jsx
│   │   │   ├── useTriggerRerender.jsx
│   │   │   ├── useUnsettledGroupMembers.jsx
│   │   │   ├── useUpdateExpense.jsx
│   │   │   ├── useUpdateGroupHasPersistedSettlements.jsx
│   │   │   ├── useUpdateResource.jsx
│   │   │   ├── useUserOrigin.jsx
│   │   │   └── useValidateGroupCodeExistence.jsx
│   │   ├── i18n
│   │   │   └── config.js
│   │   ├── pages
│   │   │   ├── ContactPage
│   │   │   │   ├── ContactPage.jsx
│   │   │   │   └── ContactPage.module.css
│   │   │   ├── CreateExpensePage
│   │   │   │   ├── CreateExpensePage.jsx
│   │   │   │   └── CreateExpensePage.module.css
│   │   │   ├── CreateGroupMemberPage
│   │   │   │   ├── CreateGroupMemberPage.jsx
│   │   │   │   └── CreateGroupMemberPage.module.css
│   │   │   ├── CreatePaymentPage
│   │   │   │   ├── CreatePaymentPage.jsx
│   │   │   │   └── CreatePaymentPage.module.css
│   │   │   ├── ExpenseDetailsPage
│   │   │   │   ├── ExpenseDetailsPage.jsx
│   │   │   │   └── ExpenseDetailsPage.module.css
│   │   │   ├── GroupMemberDetailsPage
│   │   │   │   ├── GroupMemberDetailsPage.jsx
│   │   │   │   └── GroupMemberDetailsPage.module.css
│   │   │   ├── GroupMemberTransactionHistoryPage
│   │   │   │   ├── GroupMemberTransactionHistoryPage.jsx
│   │   │   │   └── GroupMemberTransactionHistoryPage.module.css
│   │   │   ├── GroupSettingsPage
│   │   │   │   ├── GroupSettingsPage.jsx
│   │   │   │   └── GroupSettingsPage.module.css
│   │   │   ├── HomePage
│   │   │   │   ├── HomePage.jsx
│   │   │   │   └── HomePage.module.css
│   │   │   ├── InstantSplitPage
│   │   │   │   ├── InstantSplitPage.jsx
│   │   │   │   └── InstantSplitPage.module.css
│   │   │   ├── JoinGroupDEPage
│   │   │   │   ├── JoinGroupDEPage.jsx
│   │   │   │   └── JoinGroupDEPage.module.css
│   │   │   ├── JoinGroupENPage
│   │   │   │   ├── JoinGroupENPage.jsx
│   │   │   │   └── JoinGroupENPage.module.css
│   │   │   ├── LeaveGroupPage
│   │   │   │   ├── LeaveGroupPage.jsx
│   │   │   │   └── LeaveGroupPage.module.css
│   │   │   ├── LegalNoticePage
│   │   │   │   ├── LegalNoticePage.jsx
│   │   │   │   └── LegalNoticePage.module.css
│   │   │   ├── ManageGroupsPage
│   │   │   │   ├── ManageGroupsPage.jsx
│   │   │   │   └── ManageGroupsPage.module.css
│   │   │   ├── OnboardingCreateGroupPage
│   │   │   │   ├── OnboardingCreateGroupPage.jsx
│   │   │   │   └── OnboardingCreateGroupPage.module.css
│   │   │   ├── OnboardingGroupSettingsPage
│   │   │   │   ├── OnboardingGroupSettingsPage.jsx
│   │   │   │   └── OnboardingGroupSettingsPage.module.css
│   │   │   ├── PageNotFound
│   │   │   │   ├── PageNotFoundPage.jsx
│   │   │   │   └── PageNotFoundPage.module.css
│   │   │   ├── PaymentDetailsPage
│   │   │   │   ├── PaymentDetailsPage.jsx
│   │   │   │   └── PaymentDetailsPage.module.css
│   │   │   ├── SettleExpensesPage
│   │   │   │   ├── SettleExpensesPage.jsx
│   │   │   │   └── SettleExpensesPage.module.css
│   │   │   ├── ShareGroupInvitationPage
│   │   │   │   ├── ShareGroupInvitationPage.jsx
│   │   │   │   └── ShareGroupInvitationPage.module.css
│   │   │   ├── TermsAndConditionsPage
│   │   │   │   ├── TermsAndConditionsPage.jsx
│   │   │   │   └── TermsAndConditionsPage.module.css
│   │   │   ├── TutorialPage
│   │   │   │   ├── TutorialPage.jsx
│   │   │   │   └── TutorialPage.module.css
│   │   │   ├── UpdateExpensePage
│   │   │   │   ├── UpdateExpensePage.jsx
│   │   │   │   └── UpdateExpensePage.module.css
│   │   │   └── UpdatePaymentPage
│   │   │       ├── UpdatePaymentPage.jsx
│   │   │       └── UpdatePaymentPage.module.css
│   │   ├── themes
│   │   │   └── muiTheme.jsx
│   │   ├── types
│   │   │   └── index.d.ts
│   │   ├── utils
│   │   │   ├── captchaUtils.jsx
│   │   │   ├── currencyUtils.jsx
│   │   │   ├── dynamicRoutes.jsx
│   │   │   ├── errorUtils.jsx
│   │   │   ├── form
│   │   │   │   └── submitOnEnter.js
│   │   │   ├── formatUtils.jsx
│   │   │   ├── formatUtils.test.js
│   │   │   ├── localStorage
│   │   │   │   ├── deleteActiveGroupCodeFromLocalStorage.js
│   │   │   │   ├── deleteActiveGroupCodeFromLocalStorage.test.js
│   │   │   │   ├── deleteGroupCodeFromLocalStorage.js
│   │   │   │   ├── deleteGroupCodeFromLocalStorage.test.js
│   │   │   │   ├── deleteLocalStorageKey.js
│   │   │   │   ├── deleteLocalStorageKey.test.js
│   │   │   │   ├── deleteNestedPreviousRoute.test.js
│   │   │   │   ├── deleteNestedPreviousRouteFromLocalStorage.js
│   │   │   │   ├── deleteNestedPreviousRouteFromLocalStorage.test.js
│   │   │   │   ├── deletePreviousRouteFromLocalStorage.js
│   │   │   │   ├── deletePreviousRouteFromLocalStorage.test.js
│   │   │   │   ├── deleteStoredViewFromLocalStorage.js
│   │   │   │   ├── deleteStoredViewFromLocalStorage.test.js
│   │   │   │   ├── getActiveGroupCodeFromLocalStorage.js
│   │   │   │   ├── getActiveGroupCodeFromLocalStorage.test.js
│   │   │   │   ├── getFirstGroupCodeFromLocalStorage.js
│   │   │   │   ├── getFirstGroupCodeFromLocalStorage.test.js
│   │   │   │   ├── getLanguageFromLocalStorage.js
│   │   │   │   ├── getLanguageFromLocalStorage.test.js
│   │   │   │   ├── getLocalStorageKey.js
│   │   │   │   ├── getLocalStorageKey.test.js
│   │   │   │   ├── getNestedPreviousRoute.test.js
│   │   │   │   ├── getNestedPreviousRouteFromLocalStorage.js
│   │   │   │   ├── getPreviousRouteFromLocalStorage.js
│   │   │   │   ├── getPreviousRouteFromLocalStorage.test.js
│   │   │   │   ├── getPwaCtaClosedFromLocalStorage.js
│   │   │   │   ├── getPwaCtaClosedFromLocalStorage.test.js
│   │   │   │   ├── getStoredGroupCodesFromLocalStorage.js
│   │   │   │   ├── getStoredGroupCodesFromLocalStorage.test.js
│   │   │   │   ├── getStoredViewFromLocalStorage.js
│   │   │   │   ├── getStoredViewFromLocalStorage.test.js
│   │   │   │   ├── isGroupCodeInLocalStorageStoredGroupCodes.js
│   │   │   │   ├── isGroupCodeInLocalStorageStoredGroupCodes.test.js
│   │   │   │   ├── setActiveGroupCodeInLocalStorage.js
│   │   │   │   ├── setActiveGroupCodeInLocalStorage.test.js
│   │   │   │   ├── setLanguageInLocalStorage.js
│   │   │   │   ├── setLanguageInLocalStorage.test.js
│   │   │   │   ├── setLocalStorageKey.js
│   │   │   │   ├── setLocalStorageKey.test.js
│   │   │   │   ├── setNestedPreviousRouteInLocalStorage.js
│   │   │   │   ├── setNestedPreviousRouteInLocalStorage.test.js
│   │   │   │   ├── setPreviousRouteInLocalStorage.js
│   │   │   │   ├── setPreviousRouteInLocalStorage.test.js
│   │   │   │   ├── setPwaCtaClosedInLocalStorage.js
│   │   │   │   ├── setPwaCtaClosedInLocalStorage.test.js
│   │   │   │   ├── setStoredViewInLocalStorage.js
│   │   │   │   ├── setStoredViewInLocalStorage.test.js
│   │   │   │   ├── storeGroupCodeInLocalStorage.js
│   │   │   │   └── storeGroupCodeInLocalStorage.test.js
│   │   │   ├── replaceSlashesWithDashes.js
│   │   │   ├── route
│   │   │   │   ├── buildPath.js
│   │   │   │   ├── createRoute.js
│   │   │   │   ├── generateDynamicRoute.js
│   │   │   │   ├── generateDynamicRoute.test.js
│   │   │   │   ├── prefixParamsWithColon.js
│   │   │   │   └── prefixParamsWithColon.test.js
│   │   │   ├── routeBuilders.jsx
│   │   │   ├── settlementUtils.jsx
│   │   │   ├── settlementUtils.legacytest.js
│   │   │   └── user
│   │   │       ├── index.js
│   │   │       ├── isWebShareSupported.js
│   │   │       ├── isWebShareSupported.test.js
│   │   │       ├── shouldShowPwaPrompt.js
│   │   │       └── shouldShowPwaPrompt.test.js
│   │   └── wrappers
│   │       └── GroupContextWrapper.jsx
│   └── vite.config.js
├── docs
│   ├── chatbot-instructions.md
│   ├── repository-structure.md
│   └── technical-debt.md
├── jsconfig.json
├── package-lock.json
├── package.json
├── server
│   ├── config
│   │   ├── cloudinaryConfig.js
│   │   ├── env
│   │   └── serverConfig.js
│   ├── constants
│   │   └── serverConfigConstants.js
│   ├── controllers
│   │   ├── captchaController.js
│   │   ├── expense
│   │   │   ├── createExpenseController.js
│   │   │   ├── deleteExpenseController.js
│   │   │   ├── getGroupExpensesController.js
│   │   │   ├── getGroupExpensesTotalController.js
│   │   │   ├── getSingleExpenseController.js
│   │   │   └── updateExpenseController.js
│   │   ├── group
│   │   │   ├── changeGroupNameController.js
│   │   │   ├── createGroupController.js
│   │   │   ├── getGroupCurrencyController.js
│   │   │   ├── getGroupInfoController.js
│   │   │   └── getGroupTransactionsController.js
│   │   ├── groupController.js
│   │   ├── healthController.js
│   │   ├── member
│   │   │   ├── changeMemberNameController.js
│   │   │   ├── createMemberController.js
│   │   │   ├── deleteMemberController.js
│   │   │   ├── getGroupMembersController.js
│   │   │   ├── getMemberInfoController.js
│   │   │   ├── getMemberTransactionsController.js
│   │   │   └── getMembersController.js
│   │   ├── payment
│   │   │   └── createPaymentController.js
│   │   ├── paymentController.js
│   │   ├── settlementController.js
│   │   └── userController.js
│   ├── expressApp.js
│   ├── jsconfig.json
│   ├── middleware
│   │   ├── common
│   │   │   └── logRequestDetailsMiddleware.js
│   │   ├── context
│   │   │   └── extractGroupCodeMiddleware.js
│   │   ├── encryptionMiddleware.js
│   │   ├── errors
│   │   │   └── apiErrorMiddleware.js
│   │   ├── group
│   │   │   └── touchGroupLastActiveMiddleware.js
│   │   ├── laxLimitRequestsPerIpMiddleware.js
│   │   ├── strictlyLimitRequestsPerIpMiddleware.js
│   │   ├── validatePropertyMatchMiddleware.js
│   │   └── validation
│   │       └── validateGroupCodeMiddleware.js
│   ├── models
│   │   ├── Expense.js
│   │   ├── Group.js
│   │   ├── Member.js
│   │   ├── Payment.js
│   │   └── Settlement.js
│   ├── package.json
│   ├── routes
│   │   ├── captchaRouter.js
│   │   ├── expenseRouter.js
│   │   ├── groupRouter.js
│   │   ├── healthRouter.js
│   │   ├── memberRouter.js
│   │   ├── paymentRouter.js
│   │   └── settlementRouter.js
│   ├── scripts
│   │   ├── DataSeeder
│   │   │   └── seedDemoData.js
│   │   └── dataPurge
│   │       └── purgeInactiveGroups.js
│   ├── server.js
│   ├── services
│   │   ├── expense
│   │   │   ├── createExpenseService.js
│   │   │   ├── deleteExpenseService.js
│   │   │   ├── getGroupExpensesService.js
│   │   │   ├── getGroupExpensesTotalService.js
│   │   │   ├── getSingleExpenseService.js
│   │   │   └── updateExpenseService.js
│   │   ├── group
│   │   │   ├── changeGroupNameService.js
│   │   │   ├── createGroupService.js
│   │   │   ├── getGroupCurrencyService.js
│   │   │   ├── getGroupInfoService.js
│   │   │   └── getGroupTransactionsService.js
│   │   ├── member
│   │   │   ├── changeMemberNameService.js
│   │   │   ├── createMemberService.js
│   │   │   ├── deleteMemberService.js
│   │   │   ├── getGroupMembersService.js
│   │   │   ├── getMemberInfoService.js
│   │   │   └── getMemberTransactionsService.js
│   │   └── payment
│   │       └── createPaymentService.js
│   ├── utils
│   │   ├── database
│   │   │   └── extractAggregationTotal.js
│   │   ├── databaseUtils.js
│   │   ├── errorUtils.js
│   │   ├── errors
│   │   │   └── ApiError.js
│   │   ├── expense
│   │   │   └── verifyExpensePayerAndBeneficiaries.js
│   │   ├── group
│   │   │   ├── resetGroupSettlements.js
│   │   │   └── touchGroupLastActive.js
│   │   ├── groupCodeUtils.js
│   │   ├── isDevelopmentEnvironment.js
│   │   ├── isProductionEnvironment.js
│   │   └── validationUtils.js
│   └── validators
│       ├── expenseValidator.js
│       └── paymentValidator.js
└── shared
    ├── constants
    │   ├── api
    │   │   ├── apiHeaderConstants.js
    │   │   ├── apiMessageConstants.js
    │   │   ├── apiRouteConstants.js
    │   │   ├── payloadKeyConstants.js
    │   │   └── routeParamConstants.js
    │   ├── apiEndpointsConstants.js
    │   ├── domain
    │   │   ├── currencyConstants.js
    │   │   ├── resourceConstants.js
    │   │   └── transactionConstants.js
    │   ├── error
    │   │   └── errorConstants.js
    │   ├── models
    │   │   ├── commonConstants.js
    │   │   ├── expenseConstants.js
    │   │   ├── groupConstants.js
    │   │   ├── memberConstants.js
    │   │   ├── paymentConstants.js
    │   │   └── settlementConstants.js
    │   ├── system
    │   │   ├── environmentConstants.js
    │   │   ├── languageConstants.js
    │   │   ├── loggerConstants.js
    │   │   ├── systemConstants.js
    │   │   └── timeConstants.js
    │   └── test
    │       └── testConstants.js
    └── utils
        ├── dateUtils.js
        ├── dates
        │   └── sortByDate.js
        ├── debug
        │   ├── debugLog.js
        │   └── debugLog.test.js
        └── strings
            ├── replaceSlashesWithDashes.js
            └── replaceSlashesWithDashes.test.js
