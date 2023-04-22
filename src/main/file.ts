import fs from 'fs'
import { IpcMainInvokeEvent } from 'electron'
import path from 'path'

export function readFile(_event: IpcMainInvokeEvent, _path: string): string {
  return fs.existsSync(_path) ? fs.readFileSync(_path, { encoding: 'utf-8', flag: 'r' }) : ''
}

function mkdir(_path): void {
  if (_path === '.') return
  const dirname = path.dirname(_path)
  if (!fs.existsSync(dirname)) {
    mkdir(dirname)
    fs.mkdirSync(_path)
  } else if (!fs.existsSync(_path)) {
    fs.mkdirSync(_path)
    return
  }
}

export function saveFile(_event: IpcMainInvokeEvent, _path: string, context: string): void {
  if (!fs.existsSync(_path)) {
    mkdir(path.dirname(_path))
  }

  return fs.writeFileSync(_path, context, { encoding: 'utf-8', flag: 'w' })
}
