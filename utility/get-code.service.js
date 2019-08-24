const db = require('_helpers/db');
const User = db.User;
const PublicUsers = db.PublicUsers;

module.exports = {
    viewAll,
    getCode,
    saveLinkGetCode,
    getLink,
    getLinkAndDelete,
    deleteCode,
    deleteAll
};

async function viewAll ( userID ) {
  const user = await User.findById(userID);
  return user.savedLinks;
}

async function getLinkAndDelete ( inpCode ) {
  let publicUser = await PublicUsers.findOne({});
  let spliceValue = {};

  if ( publicUser ) {
    let spliceIndex = publicUser.savedLinks.findIndex(obj => Object.keys(obj)[0] === inpCode);

    if ( spliceIndex !== -1 ) {
      spliceValue = publicUser.savedLinks[spliceIndex][inpCode];
      publicUser.savedLinks.splice(spliceIndex, 1);
      // publicUser.totalCount = (publicUser.totalCount ? publicUser.totalCount : 0) - 1;
      await publicUser.save();
    } else {
      // THROW INVALID CODE ERROR
    }
  } else {
    // THROW INTERNAL DATA ERROR
  } // IF-ELSE

  return spliceValue;
}

async function getLink ( userID, inpCode ) {
  let user = await User.findById(userID);  
  let spliceValue = {};

  if ( user ) {
    let spliceIndex = user.savedLinks.findIndex(obj => Object.keys(obj)[0] === inpCode);

    if ( spliceIndex !== -1 ) {
      spliceValue = user.savedLinks[spliceIndex][inpCode];
    } else {
      // THROW INVALID CODE ERROR
    }
  } else {
    // THROW INTERNAL DATA ERROR
  } // IF-ELSE

  return spliceValue;
}

async function getCode ( inpURL ) {
  let publicUser = await PublicUsers.findOne({});
  let randNum = Math.floor(100000 + Math.random() * 900000);

  if ( !publicUser ) {
    publicUser = new PublicUsers();
  }

  // CHECK IF RANDNUM IS ALREADY PRESENT
// ELSE GENERATE NEW NUMBER
// LOOP UNTIL

  let linkObj = {
    [randNum] : inpURL,
    expiry: "find"
  };

  // FIND THE LATEST UPCOMING 24 HOUR CYCLE AND ADD THAT UTC AS EXPIRY TIME

  publicUser.savedLinks.push(linkObj);
  // publicUser.totalCount = (publicUser.totalCount ? publicUser.totalCount : 0) + 1;
  await publicUser.save();

  return randNum;
}

async function saveLinkGetCode ( userID, inpURL ) {
  const user = await User.findById(userID);
  let nextNum = user.savedLinks.length + 1001;

// INCLUDE COUNT VARIABLE AND USE THE RANDNUM TO BE COUNT VARIABLE
// OR
// USE THE LENGTH + 1000 AS RANDNUM

  let linkObj = {
    [nextNum] : inpURL
  };

  user.savedLinks.push(linkObj);
  await user.save();

  return nextNum;
}

async function deleteCode ( userID, inpCode ) {
  const user = await User.findById(userID);
  let delStatus = "not successful";

  if ( user ) {
    let spliceIndex = user.savedLinks.findIndex(obj => Object.keys(obj)[0] === inpCode);

    if ( spliceIndex !== -1 ) {
      user.savedLinks.splice(spliceIndex, 1);
      await user.save();
      delStatus = "success";
    } else {
      // THROW INVALID CODE ERROR
    }
  } else {
    // THROW INTERNAL DATA ERROR
  } // IF-ELSE

  return delStatus;
}

async function deleteAll ( userID ) {
  const user = await User.findById(userID);
  let delStatus = "not successful";

  if ( user ) {
    user.savedLinks = [];
    await user.save();
    delStatus = "success";
  } else {
    // THROW INTERNAL DATA ERROR
  } // IF-ELSE

  return delStatus;
}