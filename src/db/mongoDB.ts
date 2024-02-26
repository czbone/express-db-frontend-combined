import mongoose from 'mongoose'

export const initDB = async () => {
  // MongoDB初期接続
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_URI)

    console.log('[MongoDB] connection established.')
  } catch (err) {
    console.error('[MongoDB]', err)
    throw new Error('[MongoDB] Critical System error.')
  }
}
