const express = require("express");
const { pendingWishes } = require("../data/wish");
const santaRouter = express.Router();
const { ERROR } = require("../utils/constant");

const {
  searchUser,
  searchUserProfile,
  isUserIdAllSpaces,
  renderErrorScreen,
  renderConfirmScreen,
  getRegisteredUsersFromURL,
  getUserProfilesFromURL,
  getAge,
} = require("../utils/helper");

// DEFINE ENDPOINTS
santaRouter.get("/", async (req, res) => {
  res.render("index");
});

santaRouter.post("/", async (req, res) => {
  try {
    const { username, wish } = req.body;

    if (isUserIdAllSpaces(username)) {
      renderErrorScreen(res, ERROR.childNotRegistered);
      return;
    }

    // Get registered users from URL
    const registeredUsers = await getRegisteredUsersFromURL();

    // From the registered users, search the input user. If exist, return userId
    const user = searchUser(registeredUsers.data, username);

    // Is child not registered?
    if (user === null || user === undefined) {
      renderErrorScreen(res, ERROR.childNotRegistered);
      return;
    }

    const userId = user.uid;

    // Get user profile from URL
    const userProfileInfo = await getUserProfilesFromURL();
    const userProfile = searchUserProfile(userProfileInfo.data, userId);
    const { address, birthdate } = userProfile;

    //Is Child's Age greater than 10?
    if (getAge(birthdate) > 10) {
      renderErrorScreen(res, ERROR.childAgeMoreThanTen);
      return;
    }

    // Add wish to global datastore
    pendingWishes.push({ username, address, wish });
    renderConfirmScreen(res);
  } catch (e) {
    console.log(e);
    renderErrorScreen(res, ERROR.internalError);
  }
});

module.exports = santaRouter;
