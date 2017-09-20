import IpcClient from 'electron-ipc-tunnel/client'

class UpdateWaiter {

  constructor(){
    this.ipcClient = new IpcClient()
  }

  async init(openModal) {
    await this.ipcClient.send('update-waiter')
    openModal()
  }

  async start() {
    await this.ipcClient.send('update-start')
  }
}

export const updateWaiter = new UpdateWaiter()