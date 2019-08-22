module.exports = {
    getCode
};

async function getCode() {
  return await Math.floor(1000 + Math.random() * 9000);
}
