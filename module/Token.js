const jwt = require("jsonwebtoken")
class Token{
    async generateTokens(uid,email,createdAt) {
        const accessToken = await jwt.sign({ uid,email,createdAt }, `${process.env.SECRET_KEY}`, { expiresIn: '30m' });
        const refreshToken = await jwt.sign({ uid,email,createdAt }, `${process.env.REFRESH_SECRET_KEY}`, { expiresIn: '365d' });
        return { accessToken, refreshToken };
    }
    async refreshToken(refreshToken){
      const accessToken = await jwt.sign(refreshToken,`${process.env.SECRET_KEY}`,{ expiresIn: '30m' })
      return accessToken;
    }
}
module.exports = new Token();