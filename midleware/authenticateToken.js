const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Отримання токену з заголовків або запиту
  const token = req.headers.authorization.split(" ")[1]
  console.log("token in auth\n",token)
  if (!token) {

    console.log("Немає токену доступу")
    return res.status(401).json({ message: "Немає токену доступу" });
  }

  try {
    // Перевірка та розкодування токену
    console.log("token\n ", token.accesstoken)
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    console.log("Недійсний токен доступу")
    
    return res.status(401).json({ message: "Недійсний токен доступу" });
  }
}

module.exports = authenticateToken;
