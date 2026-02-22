import axios from "axios"
import FormData from "form-data"
import Category from "../models/categoryModel.js"

const processOCR = async (fileBuffer, fileName, user) => {
  const mivroAiUrl = process.env.MIVRO_AI_URL || "http://localhost:8001"

  const form = new FormData()
  form.append("file", fileBuffer, {
    filename: fileName,
  })

  const response = await axios.post(`${mivroAiUrl}/ocr`, form, {
    headers: {
      ...form.getHeaders(),
    },
  })

  const ocrData = response.data

  // Try to match suggested category with user's categories
  const categories = await Category.find({
    $or: [{ user: user }, { isDefault: true }],
    type: { $in: [ocrData.type, "both"] },
  })

  // Simple name matching
  let matchedCategory = categories.find(
    (c) => c.name.toLowerCase() === ocrData.category.toLowerCase(),
  )

  if (!matchedCategory) {
    // Try partial match
    matchedCategory = categories.find((c) =>
      ocrData.category.toLowerCase().includes(c.name.toLowerCase()),
    )
  }

  return {
    ...ocrData,
    categoryId: matchedCategory ? matchedCategory._id : null,
    categoryName: matchedCategory ? matchedCategory.name : ocrData.category,
  }
}

const ocrService = {
  processOCR,
}

export default ocrService
