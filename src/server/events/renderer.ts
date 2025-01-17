import { ipcMain, IpcMainEvent } from 'electron'
import Renderer from '../renderer'

export default class RendererEvents {
  constructor(appInstance: any) {
    const renderer = new Renderer(appInstance)

    ipcMain.removeAllListeners('html-render')
    ipcMain.removeAllListeners('html-rendered')

    ipcMain.removeAllListeners('site-generate')
    ipcMain.removeAllListeners('site-generated')

    ipcMain.on('site-generate', async (event: IpcMainEvent, params: any) => {
      // render
      if (renderer.db.themeConfig.themeName) {
        await renderer.generate()
      }

      event.sender.send('site-generated', { success: true })
    })

    ipcMain.on('html-render', async (event: IpcMainEvent, params: any) => {
      if (renderer.db.themeConfig.themeName) {
        await renderer.preview()
      }
      event.sender.send('html-rendered', null)
    })
  }
}
