import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true }
  },
  {
    timestamps: true, // createdAt,updatedAtのタイムスタンプ追加
    statics: {
      async getNotes(): Promise<any> {
        try {
          const notes = await Note.find().sort({ createdAt: 1 })
          return notes
        } catch (err) {
          console.error('DBエラーが発生しました')
          return null
        }
      },
      async deleteNote(id: string): Promise<any> {
        try {
          const note = await Note.deleteOne({ _id: id })
          return note
        } catch (err) {
          console.error('DBエラーが発生しました')
          return null
        }
      },
      async addNote(message: string): Promise<any> {
        try {
          const note = await Note.create({
            message: message
          })
          return note
        } catch (err) {
          console.error('DBエラーが発生しました')
          return null
        }
      }
    }
  }
)

const Note = mongoose.model('Note', schema, 'note' /* MongoDBのコレクション名 */)

export default Note
