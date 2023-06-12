const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  // Отримання токену з заголовків або запиту
  const accesstoken = req.headers.authorization?.split(" ")[1]
  console.log("token in auth\n",accesstoken)
  if (!accesstoken) {
    console.log("Немає токену доступу")
    return res.status(401).json({ message: "Немає токену доступу" });
  }

  try {
    const decodedToken = jwt.verify(accesstoken, process.env.SECRET_KEY);
    next();
  } catch (error) {
    console.log("Недійсний токен доступу")
    return res.status(401).json({ message: "Недійсний токен доступу" });
  }
}

module.exports = authenticateToken;
