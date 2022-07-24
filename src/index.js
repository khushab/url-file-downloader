const { downloadFromSingleURL, downloadFromMultipleURL } = require('./controller/fileDownloader.controller')


async function fileDownloader(body) {
    let response
    if (Array.isArray(body.url)) {
        response = await downloadFromMultipleURL(body)
    } else {
        response = await downloadFromSingleURL(body)
    }
    return response
}

module.exports = fileDownloader

const url0 = "http://www.wikidot.com/common--theme/wikidot30/images/how3.png"
const url1 = "https://images.pexels.com/photos/4113831/pexels-photo-4113831.jpeg"
const url2 = "https://images.pexels.com/photos/12270237/pexels-photo-12270237.jpeg"

const body = {
    url: [url0, url2, url1, ''],
    retries: 2,
    // location: '/Users/khushab/url-file-downloader/downloads'
    location: '/Usfnsdj'
}
const body2 = { url: url1 }

fileDownloader(body)


