const ERROR = {
    childNotRegistered: 'You are not registered! Please do good things next time',
    childAgeMoreThanTen: 'You are not a child anymore!',
    invalidBirthDate: 'Invalid Birthdate',
    internalError: 'Internal Error'
}

const API = {
    URL_USER_PROFILES: 'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json',
    URL_USERS: 'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json',
}

const MAILER = {
    MAIL_FROM: "do_not_reply@northpole.com",
    MAIL_TO: "santa@northpole.com",
    MAIL_SUBJECT: "Your Pending Wish from Santa!!!"
}

module.exports = {
    ERROR,
    API,
    MAILER
}

