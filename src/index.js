const { downloadFromSingleURL, downloadFromMultipleURL } = require('./controller/fileDownloader.controller')


function fileDownloader(url, location) {
    if (Array.isArray(url)) {
        downloadFromMultipleURL(url, location)
    } else {
        downloadFromSingleURL(url, location)
    }
}
const url1 = "http://www.wikidot.com/common--theme/wikidot30/images/how3.png"
const url2 = "https://images.pexels.com/photos/12270237/pexels-photo-12270237.jpeg"

fileDownloader([url2, url1])
// fileDownloader(url1)
// fileDownloader(url2)


