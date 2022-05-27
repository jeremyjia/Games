
const ScrapingAntClient = require('@scrapingant/scrapingant-client');
const cheerio = require('cheerio');

const SCRAPINGANT_API_KEY = 'debdb64f1a0f4837ba2425d83fe7a30d';

const client = new ScrapingAntClient({ apiKey: SCRAPINGANT_API_KEY });
const tags = ['leadership', 'startup', 'technology'];
const followersRegex = />([0-9KM.]* Followers)<\//;
const openTopWritersJS = `document.evaluate("//p[text()='See More']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()`;


(async () => {
    const writers = [];
    for (const tag of tags) {
        const response = await client.scrape(getTagURL(tag), { proxy_country: 'US', js_snippet: openTopWritersJS });
        writers.push(...await getDataFromTagPage(response.content));
    }

    for (const writer of writers) {
        const writerResponse = await client.scrape(writer.url, { proxy_country: 'US' });
        writer.followers = extractFollowersCount(writerResponse.content);
    }

    // scraped results
    console.log(writers);
})();


function getTagURL(tag) {
    return `https://medium.com/tag/${tag}`;
}

function getDataFromTagPage(html) {
    const pageResults = [];
    const $ = cheerio.load(html);
    const dialog = $('div[role=dialog]');
    const links = $(dialog).find('a');
    links.each((i, link) => {
        if (i % 2 === 1) {
            const result = {};
            result.url = getFullURL($(link).attr('href'));
            result.name = $(link).find('h2').text();
            pageResults.push(result);
        }
    });

    return pageResults;
}

function getFullURL(href) {
    if (href.startsWith('/')) {
        return `https://medium.com${href}`
    }

    return href;
}

function extractFollowersCount(writerContent) {
    return followersRegex.exec(writerContent)[1];
} 