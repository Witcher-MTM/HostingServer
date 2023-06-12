const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  // Отримання токену з заголовків або запиту
  const accesstoken = req.headers.authorization
  console.log("token in auth\n",accesstoken)
  if (!accesstoken) {
    console.log("Немає токену доступу")
    return res.status(401).json({ message: "Немає токену доступу" });
  }
  next();
} 

module.exports = authenticateToken;
