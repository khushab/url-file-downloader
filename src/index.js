const { downloadFromSingleURL, downloadFromMultipleURL } = require('./controller/fileDownloader.controller')


function fileDownloader(body) {
    if (Array.isArray(body.url)) {
        downloadFromMultipleURL(body)
    } else {
        downloadFromSingleURL(body)
    }
}
const url1 = "http://www.wikidot.com/common--theme/wikidot30/images/how3.png"
const url2 = "https://images.pexels.com/photos/12270237/pexels-photo-12270237.jpeg"

const body = {
    url: [url2, url1],
    retries: 2
}

fileDownloader(body)
// fileDownloader(url1)
// fileDownloader(url2)


