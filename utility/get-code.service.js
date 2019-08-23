const db = require('_helpers/db');
const User = db.User;
const PublicUsers = db.PublicUsers;

module.exports = {
    getCode,
    saveLinkGetCode
};

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

async function saveLinkGetCode (userID, inpURL) {
  const USER = await User.findById(userID);
  let randNum = Math.floor(1000 + Math.random() * 9000);

  let linkObj = {
    [randNum] : inpURL
  };

  USER.savedLinks.push(linkObj);
  await USER.save();

  return randNum;
}
