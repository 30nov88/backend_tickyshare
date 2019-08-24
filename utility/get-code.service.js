const db = require('_helpers/db');
const User = db.User;
const PublicUsers = db.PublicUsers;

module.exports = {
    getCode,
    saveLinkGetCode,
    getLink,
    getLinkAndDelete,
};

async function getLinkAndDelete ( inpCode ) {
  let publicUser = await PublicUsers.findOne({});
  let spliceValue = {};

  if ( publicUser ) {
    let spliceIndex = publicUser.savedLinks.findIndex(obj => Object.keys(obj)[0] === inpCode);

    if ( spliceIndex !== -1 ) {
      spliceValue = publicUser.savedLinks[spliceIndex][inpCode];
      publicUser.savedLinks.splice(spliceIndex, 1);
      publicUser.totalCount = (publicUser.totalCount ? publicUser.totalCount : 0) - 1;
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
  publicUser.totalCount = (publicUser.totalCount ? publicUser.totalCount : 0) + 1;
  await publicUser.save();

  return randNum;
}

async function saveLinkGetCode ( userID, inpURL ) {
  const USER = await User.findById(userID);
  let randNum = Math.floor(1000 + Math.random() * 9000);

  // INCLUDE COUNT VARIABLE AND USE THE RANDNUM TO BE COUNT VARIABLE
// OR
// USE THE LENGTH + 1000 AS RANDNUM

let linkObj = {
    [randNum] : inpURL
  };

  USER.savedLinks.push(linkObj);
  await USER.save();

  return randNum;
}
