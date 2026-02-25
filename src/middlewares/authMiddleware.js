import logger from "../utils/logger.js"

const authMiddleware = (req, res, next) => {
  const { userId } = req.auth()
  logger.info(userId)
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized access",
      errors: {},
    })
  }

  req.user = userId
  next()
}

export default authMiddleware
