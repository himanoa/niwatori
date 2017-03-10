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
  getLists (options = {}) {
    const params = {
      user_id: options.userId || this.profile.id_str,
      screen_name: options.screenName || undefined,
      reverse: options.reverse || false
    }
    return this.client.get('lists/list', params)
  }
  fetchSearch (options = {}) {
    const params = {
      q: options.q || undefined,
      geocode: options.geocode || undefined,
      lang: options.lang || undefined,
      result_type: options.type || 'recent',
      count: options.count || 100,
      until: options.until || undefined,
      since_id: options.sinceId || undefined,
      include_entities: options.includeEntities || true
    }
    return this.client.get('search/tweets', params)
  }
  fetchList (options = {}) {
    const params = {
      list_id: options.listId || undefined,
      slug: options.slug || undefined,
      owner_screen_name: options.ownerScreenName || undefined,
      owner_id: options.ownerId || undefined,
      since_id: options.sinceId || undefined,
      count: options.count || 100,
      max_id: options.maxId || undefined,
      include_entities: options.includeEntities || true,
      include_rts: options.includeRts || true
    }
    return this.client.get('lists/statuses', params)
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
  async startUserStreaming (callback) {
    const data = await this.client.get('account/verify_credentials', {})
    this.profile = await data
    return this.client.stream('user', {}, stream => {
      callback(stream)
    })
  }
}

export default { TwitterApi }
