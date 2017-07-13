import { XmlDocument } from 'xmldoc'

import { BadFeedType } from '../errors/bad-feed-type'

const feedRegexps = {
    rss: /<(rss|rdf)\b/i,
    atom: /<feed\b/i
}

export async function fetchRSSFeed(url) {
    const feedContent = await fetch(url).then(response => response.text())
    if (!feedRegexps.rss.test(feedContent)) throw new BadFeedType()

    return new XmlDocument(feedContent).childNamed('channel').childrenNamed('item').map(item => ({
        id: item.valueWithPath('guid' || item.valueWithPath('link')),
        title: item.valueWithPath('title'),
        content: fixSrcset(item.valueWithPath('content:encoded') || item.valueWithPath('description') || 'Can\'t find content'),
        link: item.valueWithPath('link'),
        date: Date.parse(item.valueWithPath('pubDate')) || Date.parse(item.valueWithPath('lastBuildDate')) || new Date().getTime()
    }))
}

export async function fetchAtomFeed(url) {
    const feedContent = await fetch(url).then(response => response.text())
    if (!feedRegexps.atom.test(feedContent)) throw new BadFeedType()

    return new XmlDocument(feedContent).childNamed('channel').childrenNamed('item').map(item => ({
        id: item.valueWithPath('id'),
        title: item.valueWithPath('title'),
        content: fixSrcset(item.valueWithPath("summary") || item.valueWithPath("content") || item.valueWithPath("subtitle")),
        link: item.childWithAttribute('href').attr.href,
        date: Date.parse(item.valueWithPath('published')) || Date.parse(item.valueWithPath('updated')) || new Date().getTime()
    }))
}

function fixSrcset(content) {
    return content.replace(/([^:])(\/\/[\S]*)/g, "$1http:$2");
}