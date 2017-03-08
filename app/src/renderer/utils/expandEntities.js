import urlRegex from 'url-regex'
import * as xssFilters from 'xss-filters'
export function expandEntities (tweet) {
  tweet['media_urls'] = []
  for (let entity of tweet.entities.urls) {
    tweet['text'] = tweet['text'].replace(entity.url, entity.expanded_url)
  }
  if (tweet.entities.media) {
    tweet['media_urls'] = tweet.entities.media.map(val => {
      return val.media_url_https
    })
  }
  tweet['text'] = xssFilters.inHTMLData(tweet['text'])
     .replace(urlRegex(), "<a href='$&' target='_blank'>$&</a>")
     .replace(/@([a-zA-Z0-9_]{1,15})/, "<a href='https://twitter.com/$1' target='_blank'>$&</a>")
     .replace(/#([^!"$#%&'()*+\-.,/:;<=>?@[\\\]^`{|}~]+)/, "<a href='https://twitter.com/hashtag/$1' target='_blank'>$&</a>")
  return tweet
}
