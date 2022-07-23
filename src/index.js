const { downloadFromSingleURL, downloadFromMultipleURL } = require('./controller/fileDownloader.controller')


function fileDownloader(body) {
    if (Array.isArray(body.url)) {
        downloadFromMultipleURL(body)
    } else {
        downloadFromSingleURL(body)
    }
}
const url0 = "http://www.wikidot.com/common--theme/wikidot30/images/how3.png"
const url1 = "https://images.pexels.com/photos/4113831/pexels-photo-4113831.jpeg"
const url2 = "https://images.pexels.com/photos/12270237/pexels-photo-12270237.jpeg"

const body = {
    url: [url0, url2, url1],
    retries: 2
}

fileDownloader(body)
// fileDownloader(url1)
// fileDownloader(url2)


