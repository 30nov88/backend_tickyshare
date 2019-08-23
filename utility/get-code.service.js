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
  let publicUser = await PublicUsers.findOne({});
  let spliceValue = {};

  if ( publicUser ) {
    let spliceIndex = publicUser.savedLinks.findIndex(obj => Object.keys(obj)[0] === inpCode);

    if ( spliceIndex !== -1 ) {
      spliceValue = publicUser.savedLinks[spliceIndex][inpCode];
      // publicUser.savedLinks.splice(spliceIndex, 1);
      // publicUser.totalCount = (publicUser.totalCount ? publicUser.totalCount : 0) - 1;
      // await publicUser.save();
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

  let linkObj = {
    [randNum] : inpURL
  };

  publicUser.savedLinks.push(linkObj);
  publicUser.totalCount = (publicUser.totalCount ? publicUser.totalCount : 0) + 1;
  await publicUser.save();

  return randNum;
}

async function saveLinkGetCode ( userID, inpURL ) {
  const USER = await User.findById(userID);
  let randNum = Math.floor(1000 + Math.random() * 9000);

  let linkObj = {
    [randNum] : inpURL
  };

  USER.savedLinks.push(linkObj);
  await USER.save();

  return randNum;
}
