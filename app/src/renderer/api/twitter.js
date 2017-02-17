const Twitter = require('twitter')

class TwitterApi {
  constructor (key) {
    this.client = new Twitter({
      consumer_key: key.consumerKey,
      consumer_secret: key.consumerSecret,
      access_token_key: key.accessToken,
      access_token_secret: key.accessTokenSecret
    })
  }
  updateStatus (status) {
    console.dir(status)
    return this.client.post('statuses/update', status)
  }
  retweet (idStr) {
    return this.client.post(`statuses/retweet/${idStr}`, {})
  }
  favorite (idStr) {
    return this.client.post('favorites/create', {id: idStr})
  }
  startUserStreaming (callback) {
    this.client.stream('user', stream => {
      stream.on('data', data => {
        callback(data)
      })
      stream.on('error', error => {
        console.error(error, error.stack)
      })
    })
  }
}

export default { TwitterApi }
