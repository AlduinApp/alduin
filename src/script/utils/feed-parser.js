import { XmlDocument } from 'xmldoc'

import BadFeedType from '../errors/bad-feed-type'

const feedRegexps = {
  rss: /<(rss|rdf)\b/i,
  atom: /<feed\b/i
}

export async function fetchRSSFeed(url) {
  console.log('--------')
  const feedContent = await get(url).then(res => res.text())
  console.log('--------')
  if (!feedRegexps.rss.test(feedContent)) throw new BadFeedType()

  return new XmlDocument(feedContent).childNamed('channel').childrenNamed('item').map(item => ({
    id: (item.valueWithPath('guid') || item.valueWithPath('link')).trim(),
    title: item.valueWithPath('title').trim(),
    content: (fixSrcset(item.valueWithPath('content:encoded') || item.valueWithPath('description')) || 'Can\'t find content').trim(),
    link: item.valueWithPath('link').trim(),
    date: Date.parse(item.valueWithPath('pubDate')) || Date.parse(item.valueWithPath('lastBuildDate')) || new Date().getTime(),
    read: false
  }))
}

export async function fetchAtomFeed(url) {
  const feedContent = await get(url).then(res => res.text())
  if (!feedRegexps.atom.test(feedContent)) throw new BadFeedType()

  return new XmlDocument(feedContent).childNamed('channel').childrenNamed('item').map(item => ({
    id: item.valueWithPath('id').trim(),
    title: item.valueWithPath('title').trim(),
    content: fixSrcset(item.valueWithPath('summary') || item.valueWithPath('content') || item.valueWithPath('subtitle')).trim(),
    link: item.childWithAttribute('href').attr.href.trim(),
    date: Date.parse(item.valueWithPath('published')) || Date.parse(item.valueWithPath('updated')) || new Date().getTime(),
    read: false
  }))
}

export async function fetchJSONFeed(url) {
  const feedContent = await get(url).then(res => res.text())
  return JSON.parse(feedContent).items.map(item => ({
    id: item.id,
    title: item.title,
    content: item.content_html,
    link: item.url,
    date: Date.parse(item.date_published) || new Date().getTime(),
    read: false
  }))
}

function fixSrcset(content) {
  return content.replace(/([^:])(\/\/[\S]*)/g, '$1http:$2')
}

function get(url) {
  console.log('get ' + url)
  return fetch(url).then(followRedirections)
}

function followRedirections(response) {
  return new Promise(async (resolve, reject) => {
    console.log('status code ' + response.status)
    if (response.status === 300 || response.status === 301 || response.status === 302 && 'location' in response.headers) {
      console.log('redirect')
      resolve(get(response.headers.location))
    } else
      resolve(response)
  })
}
