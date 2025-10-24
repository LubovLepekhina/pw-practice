interface ICredentials {
  username: string;
  password: string;
}

interface IUserData {
  title: string;
  credentials: ICredentials;
  successMessage?: string;
  errorMessage?: string;
}

enum NOTIFICATIONS {
    REGISTER_SUCCESS = 'Successfully registered! Please, click Back to return on login page',
    USER_DATA_IS_REQUIRED = 'Please, provide valid data',
    USERNAME_IS_REQUIRED = 'Username is required',
    TOO_SHORT_USERNAME = 'Username should contain at least 3 characters',
    PREFIX_POSTFIX_SPACES_NOT_ALLOWED = 'Prefix and postfix spaces are not allowed is username',
    PASSWORD_IS_REQUIRED = 'Password is required',
    TOO_SHORT_PASSWORD = 'Password should contain at least 8 characters',
    LOWERCASE_CHARACTER_IS_REQUIRED = 'Password should contain at least one character in lower case',
}

export const validTestData: IUserData[] = [
  {
    credentials: { username: "Andrei12345678 !@#$", password: "Andrei12345678 !@#$" },
    successMessage: NOTIFICATIONS.REGISTER_SUCCESS,
    title: "Register with smoke credentials",
  },
  {
    credentials: { username: "Emy", password: "123456Aa" },
    successMessage: NOTIFICATIONS.REGISTER_SUCCESS,
    title: "Register with min valid credentials",
  },
  {
    credentials: { username: "Andrei12345678 !@#$aaaaaaaaaaaaaaaaaaaaa", password: "123456Aaaaaaaaaaaaaa" },
    successMessage: NOTIFICATIONS.REGISTER_SUCCESS,
    title: "Register with max valid credentials",
  },
];

export const invaliTestData: IUserData[] = [
    {
        title: 'should show error when username and password are empty',
        credentials: {username: '', password: ''},
        errorMessage: NOTIFICATIONS.USER_DATA_IS_REQUIRED,
    },
    {
        title: 'should show error when username is empty',
        credentials: {username: '', password: 'Hi12345678'},
        errorMessage: NOTIFICATIONS.USERNAME_IS_REQUIRED,
    },
    {
        title: 'should show error when username is shorter than 3 characters',
        credentials: {username: 'Li', password: 'Hi12345678'},
        errorMessage: NOTIFICATIONS.TOO_SHORT_USERNAME,
    },
    {
        title: 'should show error when username starts with a space',
        credentials: {username: ' Lucy123', password: 'Hi12345678'},
        errorMessage: NOTIFICATIONS.PREFIX_POSTFIX_SPACES_NOT_ALLOWED,
    },
    {
        title: 'should show error when username ends with a space',
        credentials: {username: 'Lucy123 ', password: 'Hi12345678'},
        errorMessage: NOTIFICATIONS.PREFIX_POSTFIX_SPACES_NOT_ALLOWED,
    },
    {
        title: 'should show error when username contains only spaces',
        credentials: {username: '    ', password: 'Hi12345678'},
        errorMessage: NOTIFICATIONS.PREFIX_POSTFIX_SPACES_NOT_ALLOWED,
    },
    {
        title: 'should show error when password is empty',
        credentials: {username: 'Lucy123', password: ''},
        errorMessage: NOTIFICATIONS.PASSWORD_IS_REQUIRED,
    },    
    {
        title: 'should show error when password is shorter than 8 characters',
        credentials: {username: 'Lucy123', password: 'Hi12345'},
        errorMessage: NOTIFICATIONS.TOO_SHORT_PASSWORD,
    },   
    {
        title: 'should show error when password has only lowercase letters',
        credentials: {username: 'Lucy123', password: 'hi12345678'},
        errorMessage: 'Password should contain at least one character in upper case',
    },
    {
        title: 'should show error when password has only uppercase letters',
        credentials: {username: 'Lucy123', password: 'HI12345678'},
        errorMessage: NOTIFICATIONS.LOWERCASE_CHARACTER_IS_REQUIRED,
    },
    {
        title: 'should show error when password contains only spaces',
        credentials: {username: 'Lucy123', password: '          '},
        errorMessage: NOTIFICATIONS.PASSWORD_IS_REQUIRED,
    },
] 