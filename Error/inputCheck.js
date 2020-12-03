const inputCheck = (...rest) => {
  rest.map((input) => {
    if (input) {
      return true;
    } else {
      return false;
    }
  });
};
module.exports = inputCheck;
