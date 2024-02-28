import { Note } from '@/models'
import { NextFunction, Request, RequestHandler, Response } from 'express'

type NewNote = {
  message: string
}
type ResponseNote = {
  id: string
  message: string
}
type NoteDoc = {
  _id: string
  message: string
}

class NoteController {
  list: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
    const notes: NoteDoc[] = await Note.getNotes()
    if (notes) {
      const responseNotes: ResponseNote[] = notes.map((note) => ({
        id: note._id,
        message: note.message
      }))
      res.json(responseNotes)
    } else {
      res.status(400).json({ message: 'データ取得に失敗しました' })
    }
  }
  create: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
    const { message } = req.body as NewNote

    const note = await Note.addNote(message)
    if (note) {
      res.json({ message: note.message as string, id: note._id as string } as ResponseNote)
    } else {
      res.status(400).json({ message: 'データ登録に失敗しました' })
    }
  }
  delete: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
    const noteId = req.params.id
    console.log(noteId)

    const note = await Note.deleteNote(noteId)
    if (note) {
      res.json()
    } else {
      res.status(400).json({ message: 'データ削除に失敗しました' })
    }
  }
}
export default new NoteController()
