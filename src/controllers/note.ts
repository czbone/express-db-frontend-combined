import { Note } from '@/models'
import { NextFunction, Request, RequestHandler, Response } from 'express'

type Note = {
  message: string
}

class NoteController {
  list: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
    const notes = await Note.getNotes()
    res.json(notes)
  }
  create: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
    const { message } = req.body as Note

    const note = await Note.addNote(message)
    if (note) {
      res.json(note)
    } else {
      res.status(400).json({ message: 'データ登録に失敗しました' })
    }
  }
  delete: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
    const noteId = req.params.id

    const note = await Note.deleteNote(noteId)
    if (note) {
      res.json()
    } else {
      res.status(400).json({ message: 'データ削除に失敗しました' })
    }
  }
}
export default new NoteController()
