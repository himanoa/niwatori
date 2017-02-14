'use strict'

import { app, BrowserWindow } from 'electron'
const dialog = require('electron').dialog;
const storage = require('electron-json-storage');
const OAuthTwitter = require('electron-oauth-twitter')

const twitterOAuthKey = {
  key: "ywUCMm8rXhfKQoCcplDTM8lFW",
  secret: "hooQ3wY1pg66cLMxqj6LowSlnOlNjapWSWIUD8vI2NOEgf7wKq"
}

const twitter = new OAuthTwitter(twitterOAuthKey)
twitter.startRequest()
.then((result) => {
  console.dir(result)
}).catch(error => new Promise((resolve, reject) => {
  console.error(error, error.stack);
}))


const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

let mainWindow
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')
}

app.on('ready', createWindow)

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
