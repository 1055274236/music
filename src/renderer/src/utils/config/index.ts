import path from 'path'

const baseConfigFilePath = path.join('config', 'base.json')

export function loadConfig(): void {
  const data = window.electronAPI.readFile(baseConfigFilePath)
  const _data = JSON.parse(data)
  return _data
}

export function saveConfig(context: string): void {
  window.electronAPI.saveFile(baseConfigFilePath, context)
}

export default { loadConfig, saveConfig }
