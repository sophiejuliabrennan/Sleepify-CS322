function user(username) {
  var usernameRegex = /^[a-zA-Z0-9]+$/;
  if (username.length < 3) {
    return false;
  }
  if (usernameRegex.test(username) == false) {
    return false;
  }
  return true;
}

function emails(email) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (mailformat.test(email) == false) {
    return false;
  }
  return true;
}

function pass(password) {
  var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (passwordRegex.test(password) == false) {
    return false;
  }
  return true;
}

module.exports = signups = {
  user,
  emails,
  pass,
};
