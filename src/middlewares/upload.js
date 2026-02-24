import multer from "multer"
import { ErrorResponse } from "../utils/response.js"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/
    const extname = filetypes.test(file.originalname.toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(new ErrorResponse("Invalid file type", 400), false)
    }
  },
})

export default upload
