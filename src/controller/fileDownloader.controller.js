const { downloadFileForHTTP, downloadFileForHTTPS } = require('../services/fileDownloader.service')
const path = require('path');

function downloadFromSingleURL(url, location) {
    const protocol = url.split("://")[0]
    const fileName = path.basename(url)
    const payload = {
        url,
        fileName
    }
    switch (protocol) {
        case 'http':
            return downloadFileForHTTP(payload)
        case 'https':
            return downloadFileForHTTPS(payload)
        default:
            return downloadFileForHTTPS(payload)
    }
}

function downloadFromMultipleURL(url, location) {
    url.forEach((item) => {
        downloadFromSingleURL(item, location)
    })
}

module.exports = { downloadFromSingleURL, downloadFromMultipleURL }