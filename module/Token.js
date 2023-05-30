const jwt = require("jsonwebtoken")
class Token{
    async generateTokens(uid,email,apikey) {
        const accessToken = await jwt.sign({ uid,email,apikey }, `${process.env.SECRET_KEY}`, { expiresIn: '30m' });
        const refreshToken = await jwt.sign({ uid,email,apikey }, `${process.env.REFRESH_SECRET_KEY}`, { expiresIn: '14d' });
        
        return { accessToken, refreshToken };
      }
}
module.exports = new Token();