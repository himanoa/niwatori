'use strict'

import { ipcMain, shell, app, BrowserWindow } from 'electron'
const storage = require('electron-json-storage')
const OAuthTwitter = require('electron-oauth-twitter')

const twitterOAuthKey = {
  key: 'ywUCMm8rXhfKQoCcplDTM8lFW',
  secret: 'hooQ3wY1pg66cLMxqj6LowSlnOlNjapWSWIUD8vI2NOEgf7wKq'
}
console.dir(storage)
async function authenticate (callback) {
  let twitter = new OAuthTwitter(twitterOAuthKey)
  twitter.startRequest().then(result => {
    const auth = [{
      consumerKey: twitterOAuthKey.key,
      consumerSecret: twitterOAuthKey.secret,
      accessToken: result.oauth_access_token,
      accessTokenSecret: result.oauth_access_token_secret
    }]
    new Promise((resolve, reject) => {
      storage.get('twitterOAuth', function(err, data){
        if(err) throw err
        resolve(data)
      })
    }).then(data => {
        storage.set('twitterOAuth', [...data,...auth], function (err) {
          if (err) throw err
          callback(auth)
        })
    })
  }).catch(error => new Promise((resolve, reject) => {
    console.error(error, error.stack)
  }))
}

storage.get('twitterOAuth', function (error, data) {
  if (error) throw error
  if (Object.keys(data).length === 0) {
    authenticate(createWindow)
  } else {
    createWindow()
  }
})

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

let mainWindow
function createWindow () {
  /**
   * Initial window options
   */
  if (mainWindow) return
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(winURL)

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('openOAuthDialog', (auth) => {
  authenticate(() => {
    mainWindow.webContents.send('success-oauth', auth)
  })
})
