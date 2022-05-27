
const ScrapingAntClient = require('@scrapingant/scrapingant-client');
const cheerio = require('cheerio');

const SCRAPINGANT_API_KEY = 'debdb64f1a0f4837ba2425d83fe7a30d';

const client = new ScrapingAntClient({ apiKey: SCRAPINGANT_API_KEY });
const urls = ['https://baidu.com','https://medium.com/tag/leardership',
             'http://localhost:3001/', 'http://localhost:8080'];
const followersRegex = />([0-9KM.]* Followers)<\//;
 

(async () => {
    const r = await client.scrape(urls[1], { proxy_country: 'US' });
 
    // scraped results
    console.log(r);
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