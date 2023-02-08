const axios = require("axios");
const { API } = require("./constant");

const search = (arr, searchParam, field) =>
  arr.find((e) => e[field] === searchParam);
const searchUser = (arr, username) => search(arr, username, "username");
const searchUserProfile = (arr, username) => search(arr, username, "userUid");

const isStringAllSpaces = (str) => !str.trim().length;
const isUserIdAllSpaces = (str) => isStringAllSpaces(str);

const renderScreen = (res, screen, error) => res.render(screen, { error });
const renderErrorScreen = (res, error) => renderScreen(res, "error", error);
const renderConfirmScreen = (res) => renderScreen(res, "success");

const getRegisteredUsersFromURL = async () => await axios.get(API.URL_USERS);
const getUserProfilesFromURL = async () =>
  await axios.get(API.URL_USER_PROFILES);

const getAge = (birthday) =>
  new Date(new Date() - new Date(birthday)).getFullYear() - 1970;

module.exports = {
  searchUser,
  searchUserProfile,
  isStringAllSpaces,
  renderErrorScreen,
  renderConfirmScreen,
  getRegisteredUsersFromURL,
  getUserProfilesFromURL,
  isUserIdAllSpaces,
  getAge,
};
