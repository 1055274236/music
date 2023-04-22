import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('app', {
      quit: () => ipcRenderer.send('app:quit'),
      maximize: () => ipcRenderer.send('mainWindow:maximize'),
      minimize: () => ipcRenderer.send('mainWindow:minimize')
    })
    contextBridge.exposeInMainWorld('electronAPI', {
      apiAxios: (url, query, body, method, headers = {}) =>
        ipcRenderer.invoke('api:apiAxios', url, query, body, method, headers),
      readFile: (path) => ipcRenderer.invoke('file:readFile', path),
      saveFile: (path, context) => ipcRenderer.invoke('file:saveFile', path, context)
    })
    ipcRenderer.on('mainWindow:changeimize', (_, state: 'max' | 'min') => {
      console.log(state)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
