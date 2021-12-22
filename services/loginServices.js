const { validLogin, tokenGenerator } = require('../utils/validations');

const userLogin = async (email, password) => {
  const userIsValid = await validLogin(email, password);
  if (userIsValid) {
    return {
      token: tokenGenerator(email, password),
    };
  } return ({
      error: { code: 'invalidLogin' },
  });
};

module.exports = {
  userLogin,
};
