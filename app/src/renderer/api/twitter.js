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
    return this.client.post('statuses/update', status)
  }
  retweet (idStr) {
    return this.client.post(`statuses/retweet/${idStr}`, {})
  }
  favorite (idStr) {
    return this.client.post('favorites/create', {id: idStr})
  }
  mediaUpload (media) {
    return new Promise(resolve => {
      resolve(this.client.post('media/upload', { media: media }))
    })
  }
  startUserStreaming (callback) {
    return this.client.stream('user', {}, stream => {
      callback(stream)
    })
  }
}

export default { TwitterApi }
