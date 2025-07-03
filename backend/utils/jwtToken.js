const daysToMs = (days) => {
  const parsed = parseInt(days, 10);
  return isNaN(parsed) ? 5 * 24 * 60 * 60 * 1000 : parsed * 24 * 60 * 60 * 1000;
};

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + daysToMs(process.env.COOKIE_EXPIRE)),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.status(statusCode)
     .cookie("token", token, options)
     .json({
       success: true,
       user,
       token,
     });
};

module.exports = sendToken;
