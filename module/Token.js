const jwt = require("jsonwebtoken");

class Token {
  async generateTokens(uid, email, createdAt) {
    const accessToken = await jwt.sign(
      { uid, email, createdAt },
      process.env.SECRET_KEY,
      { expiresIn: '30m' }
    );
    const refreshToken = await jwt.sign(
      { uid, email, createdAt },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: '365d' }
    );
    return { accessToken, refreshToken };
  }

  async refreshUserToken(refreshtoken) {
    console.log("token in refresh\n",refreshtoken)
    try {
      const decodedToken = await jwt.verify(refreshtoken, process.env.REFRESH_SECRET_KEY);
      const { uid, email, createdAt } = decodedToken;
      const newAccessToken = await jwt.sign(
        { uid, email, createdAt },
        process.env.SECRET_KEY,
        { expiresIn: '60m' }
      );
      return newAccessToken;
    } catch (error) {
      console.error("Refresh\n",error.message);
      return null;
    }
  }

  async verifyAccessToken(accessToken) {
    try {
      console.log("accatoken in verify\n",accessToken)
      const decodedToken = await jwt.verify(accessToken, process.env.SECRET_KEY);
      console.log("verified")
      return decodedToken;
    } catch (error) {
      return null
    }
  }
}

module.exports = new Token();
