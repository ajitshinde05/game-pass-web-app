export default {
  ChangePassword: {
    Title: 'Change Password',
    CurrentPasswordLabel: 'Current Password',
    CurrentPasswordPlaceholder: 'Please enter your password',
    NewPasswordLabel: 'New Password',
    NewPasswordPlaceholder: 'Please enter your new password',
    RetypeNewPasswordLabel: 'Retype New Password',
    RetypeNewPasswordPlaceholder: 'Please repeat new password',
    SaveBtn: 'Save changes',
    ResetBtn: 'Reset',
  },
  PricingPlans: {
    Title: 'Pricing Plans',
    Description:
      '"1 RP (request point) is equal to 1 day in the statement. For example, to generate 7 days report you will need 7 RPs."',
    Free: 'A simple start for everyone',
    Basic: 'A simple start for everyone',
    Standard: 'For small to medium businesses',
    Premimum: 'Solution for big organizations',
  },
  Login: {
    Title: 'Login',
    Subtitle: 'Please login to your account and start the adventure',
    LoginBtn: 'Login',
    PasswordLabel: 'Password',
    RememberMe: 'Remember me',
    ForgotPassword: 'Forgot password?',
    NewOnPlatform: 'New on our platform?',
    CreateAccountBtn: 'Create an account',
    AllRightsReserved: 'All rights reserved',
  },
  Register: {
    CreateAccount: 'Create Account',
    PleaseSignin: 'Please Sign-up to your account and start the adventure',
    SigninAccount: 'Sign in instead',
    Password: 'Password',
    ConfirmPassword: 'Confirm Password',
    ConfirmPasswordPlaceholder: 'Please confirm your password',
    AlreadyHaveAccount: 'Already have an account?',
    SubmitButton: 'Create Account',
    AllRightsReserved: 'All rights reserved',
    Login: 'Login',
  },
  ForgotPassword: {
    ForgotPassword: 'Forgot password',
    ResetPasswordInstructions:
      'Enter your Mobile Number, and we will send you instructions on to change your password',
    SendResetLink: 'Send Reset Link',
    BackToLogin: 'Back to login',
    AllRightsReserved: 'All rights reserved',
    Send: 'Send',
  },
  VerificationCode: {
    VerificationCode: 'Enter Verification Code',
    VerificationCodeInstructions:
      'Please enter the 6-digit code sent to your mobile no {mobile} for verification.',
    Verify: 'Verify',
    DidNotReceiveCode: 'Didn’t receive any code?',
    ResendAgain: 'ResendAgain',
    RequestNewCodeIn: 'Request new code in {time}s',
  },
  PasswordUpdated: {
    PasswordUpdated: 'Password Updated!',
    PasswordUpdatedInstructions:
      'Your password has been changed successfully. Remember to use new password to access your account in the future.',
    BackToLogin: 'Back to login',
  },
  SetNewPassword: {
    Title: 'Set New Password',
    Subtitle:
      'Your new password must be different from previously used passwords',
    NewPasswordLabel: 'New Password',
    ConfirmPasswordLabel: 'Confirm Password',
    SubmitButtonLabel: 'Set New Password',
    AllRightsReserved: 'All rights reserved.',
  },
  SelectYourPaymentMethod: {
    Title: 'Please select your payment method',
    FromAddressFieldPlaceholder: 'From address',
    PayBtn: 'Pay {amount} USDT',
  },
  Payment: {
    Title: 'Excellent! Transfer funds to this wallet',
    EnsureNetworkMessage: 'Ensure the network is',
    SelectedPayment: 'Selected type of payment',
    TotalToPay: 'Total to pay',
    PaymentInstruction:
      'Top up will be proceeded correctly when the entire amount is paid by one transaction',
    Status: 'Status:',
    Statuses: {
      COMPLETED: 'COMPLETED',
      PENDING: 'PENDING',
      FAILED: 'EXPIRED',
    },
    RefreshBtn: 'Refresh',
  },
  GameHistoryPage: {
    Title: 'Game History',
    RefreshBtn: 'Refresh',
    Statuses: {
      COMPLETED: 'COMPLETED',
      PENDING: 'PENDING',
      EXPIRED: 'EXPIRED',
    },
    Columns: {
      Game: 'Game',
      Amount: 'Amount',
      Win: 'Win',
      Loss: 'Loss',
    },
  },
  WithDrawal: {
    Title: 'WithDrawal',
    RefreshBtn: 'Refresh',
    Statuses: {
      COMPLETED: 'COMPLETED',
      PENDING: 'PENDING',
      EXPIRED: 'EXPIRED',
    },
    Columns: {
      Game: 'Game',
      Amount: 'Amount',
      Win: 'Win',
      Loss: 'Loss',
    },
  },
  Amount: {
    Title: 'Amount',
    PlaceHolder: 'Enter Amount',
  },
  TxCostReportPage: {
    Title: 'Wallet Statements',
    GenerateReport: 'Generate Statements',
    ClearSearch: 'Clear Search',
    Search: 'Search',
    Refresh: 'Refresh',
    LoadMore: 'Load More',
    Reset: 'Reset',
    GenerateReportButton: 'Wallet Statements',

    TableColumns: {
      ReportId: 'Report ID',
      Coin: 'Coin',
      RequestTime: 'Request Time',
      SpentRPs: 'Spent RPs',
      Status: 'Status',
    },
    Statuses: {
      COMPLETED: 'COMPLETED',
      PENDING: 'PENDING',
      HOLD: 'HOLD',
      FAILED: 'FAILED',
    },
    NoData: 'No data for transactions',
  },
  TxCostReportFilterModal: {
    Title: 'Search',
    ReportIdLabel: 'Report ID',
    ReportIdPlaceholder: 'Enter report ID',
    CoinTypeLabel: 'Coin type',
    CoinTypePlaceholder: 'Select coin type',
    StartTimeLabel: 'Start request time',
    StartTimePlaceholder: 'Select start time',
    EndTimeLabel: 'End request time',
    EndTimePlaceholder: 'Select end time',
    StatusLabel: 'Status',
    StatusPlaceholder: 'Select status',
    SearchBtn: 'Search',
    StatusOptions: {
      COMPLETED: 'COMPLETED',
      PENDING: 'PENDING',
      HOLD: 'HOLD',
      FAILED: 'FAILED',
    },
  },
  SearchTransactionDetails: {
    Title: 'Search Transaction Details',
    SearchFiledPlaceholder: 'Search by transaction hash',
    SearchBtn: 'Search',
    RPsRequired: '{amount} request points required',
    TransactionDetails: 'Transaction Details',
    Hash: 'Hash',
    TxStatus: 'TxStatus',
    Network: 'Network',
    Fees: 'Fees',
    Time: 'Time',
    Overview: 'Overview',
    From: 'От',
    To: 'На',
    TransactionNotFound: 'Transaction not found',
  },
  BalanceReport: {
    Title: 'Wallet Balance',
    ClearSearch: 'Clear Search',
    CreateBalanceReportBtn: 'Get Balance',
    LoadMore: 'Load More',
  },
  BalanceReportForm: {
    CurrencyLabel: 'Coin type',
    WalletAddressLabel: 'Address',
    RequestPointsRequired: 'Cost {requestPointsAmount} RP Required',
    RequestPointsRequiredMobile: '(Cost {requestPointsAmount} RP)',
  },
  BalanceReportHistory: {
    Title: 'Request History',
    Columns: {
      Id: 'ID',
      Coin: 'Coin',
      RequestTime: 'Request Time',
      SpentRPs: 'Spent RPs',
      Status: 'Status',
    },
    LoadMoreBtn: 'Load more',
    NoData: "It looks like you don't have generated balance reports yet",
  },
  BalanceReportRequestDetails: {
    Columns: {
      Currency: 'Currency',
      Amount: 'Amount',
    },
    LoadMoreBtn: 'Load more',
  },
  CreateWallet: {
    Title: 'Create Wallet',
    CreateWalletBtn: 'Create',
    WalletDetails: 'Wallet Details',
    Address: 'Address',
    PublicKey: 'Public Key',
    PrivateKey: 'Private Key',
    Clear: 'Clear',
    CoinTypePlaceholder: 'Select coin type',
    RPsRequired: '{amount} request points required',
  },
  GenerateTxCostReport: {
    NetworkCurrency: 'Network Currency',
    ReportCurrency: 'Report Currency',
    Close: 'Close',
    GenerateReport: 'Generate Statements',
    Address: 'Address',
    StartTimePlaceholder: 'Please select start time',
    EndTimePlaceholder: 'Please select end time',
    StartTime: 'Start Time',
    EndTime: 'End Time',
    GenerateNewReports: 'Generate New Reports',
    AddToFavorites: 'Add to favorites',
  },
  BreadcrumbLabels: {
    Titles: {
      Home: 'Home',
      TxCostReport: 'Wallet Statements',
      BalanceReport: 'Wallet Balance',
      CreateWallet: 'Create Wallet',
      TransactionDetails: 'Transaction Search',
      Pricing: 'Pricing',
      ChangePassword: 'Change Password',
      PaymentMethod: 'Payment Method',
      Payment: 'Payment',
      PaymentList: 'Payment List',
      GenerateTxCostReport: 'Generate Statements',
      MonitorAddress: 'Monitor Address',
      AddMonitorAddress: 'Add Monitor Address',
      EditMonitorAddress: 'Edit Monitor Address',
    },
    PathLabels: {
      Home: 'Home',
      TxCostReport: 'Wallet Statements',
      BalanceReport: 'Wallet Balance Checker',
      CreateWallet: 'Create Wallet',
      TransactionDetails: 'Cross-Blockchain Transaction Search',
      Pricing: 'Pricing',
      ChangePassword: 'Change Password',
      PaymentMethod: 'Payment Method',
      Payment: 'Payment',
      PaymentList: 'Payment List',
      GenerateTxCostReport: 'Generate Statements',
      MonitorAddress: 'Monitor Address',
      AddMonitorAddress: 'Add Monitor Address',
      EditMonitorAddress: 'Edit Monitor Address',
    },
  },
  CoinCard: {
    Buy: 'Buy',
  },

  NavbarDropdown: {
    PaymentHistory: 'Payment History',
    Security: 'Security',
    Logout: 'Logout',
  },
  ConfirMationModule: {
    AreYouSure: 'Are You Sure',
    Cancel: 'Cancel',
    InsufficientRP: "Insufficient Rp's",
    Buy: 'Buy',
    Download: 'Download',
  },
  Home: {
    FullTxCostReport: {
      Title: 'Wallet Statements',
      Description:
        'Get a report on your address transactions for any timeframe with fiat values. Make your tax reporting and accounting less of a hassle.',
      Button: 'Go to report screen',
    },
    SearchByTxHash: {
      Title: 'Cross-Blockchain Transaction Search',
      Description:
        'Effortlessly search and explore transactions across multiple blockchains, uncover detailed transaction information.',
      Button: 'Go to search screen',
    },
    BalanceReport: {
      Title: 'Wallet Balance Checker',
      Description:
        "Get a complete picture of your wallet's real-time balances.",
      Button: 'Go to balance checker screen',
    },

    CreateWallet: {
      Title: 'Create wallet',
      Description:
        'Generate your wallet and retain full control of your private key',
      Button: 'Go to create wallet screen',
    },
    MonitorAddress: {
      Title: 'Monitor Addresses',
      Description:
        'Stay informed with real-time coin notifications for your wallet.',
      Button: 'Go to monitor address screen',
    },
  },
  MonitorAddress: {
    Title: 'Monitor Address',
    AddAddress: 'Add Address',
    NoData: 'NoData',
    LoadMore: 'LoadMore',
    SearchFiledPlaceholder: 'Search by transaction address',
    SearchBtn: 'Search',
    TableColumns: {
      ReportId: 'Report ID',
      Coin: 'Coin',
      Address: 'Address',
      Url: 'Url',
      Action: 'Action',
    },
    successful: {
      AddressDeletedSuccessfully: 'Address deleted successfully',
    },
  },
  AddMonitorAddressReport: {
    Close: 'Close',
    AddAddress: 'Add Address',
    Url: 'Url',
    Address: 'Address',
    NetworkCurrency: 'Network Currency',
    Key: 'Key',
    Value: 'Value',
    HeaderName: 'Header Name',
    RPsRequired: 'Per day {amount} request points required',
    successful: {
      AddressAddedSuccessfully: 'Address added successfully',
    },
    errorMessage: {
      headerNameRequired: 'Header name is required',
      headerValueRequired: 'Header value is required',
      headerNameShouldBeUnique: 'Header name should be unique',
    },
  },
  SearchComponent: {
    SearchFiledPlaceholder: 'Select or type a address',
  },
  AddBalance: {
    title: 'Add Balance',
  },
  WalletPage: {
    Title: 'Wallet',
    RefreshBtn: 'Refresh',
    Statuses: {
      COMPLETED: 'COMPLETED',
      PENDING: 'PENDING',
      EXPIRED: 'EXPIRED',
    },
    Columns: {
      DateTime: 'Date/Time',
      Amount: 'Amount',
      Win: 'Win',
      Status: 'Status',
    },
  },
};
