import * as fs from 'fs'
import * as path from 'path'
import * as electron from 'electron'

export default class Storage {

  constructor() {
    this.storePath = path.join(electron.remote.app.getPath('userData'), 'store-v2.json')

    this.storeRequest = false
    this.stateToStore = undefined
    this.autoStoreId = -1
  }

  requestStore(datas) {
    this.storeRequest = true
    this.stateToStore = datas

    if (this.autoStoreId === -1) this._autoStore()
  }

  load(){
    return fs.existsSync(this.storePath) ? JSON.parse(fs.readFileSync(this.storePath)) : {}
  }

  _store() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.storePath, JSON.stringify(this.stateToStore, null, 4), err => {
        if (err == null) resolve()
        else reject('Failed to save: ' + err)
      })
    })
  }

  _autoStore() {
    this.autoStoreId = setInterval(() => {
      if (this.storeRequest === true) {
        this._store()
        this.storeRequest = false
      }
    }, 1000)
  }
}