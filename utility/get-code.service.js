const db = require('_helpers/db');
const User = db.User;

module.exports = {
    getCode
};

async function getCode(userID, inpURL) {
  const USER = await User.findById(userID);
console.log('inpURL', inpURL);

  let randNum = Math.floor(1000 + Math.random() * 9000);
  let linkObj = {
    [randNum] : inpURL
  };
  
  USER.savedLinks.push(linkObj)

  await USER.save();
  
  console.log('USER', USER);
  
  return randNum; 
}
