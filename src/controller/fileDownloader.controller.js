const { downloadFileForHTTP, downloadFileForHTTPS } = require('../services/fileDownloader.service')
const path = require('path');

function downloadFromSingleURL(body) {
    let retryCount = body.retries || 1;
    const protocol = body.url.split("://")[0]
    const fileName = path.basename(body.url)
    const payload = {
        url: body.url,
        fileName
    }
    const response = downloadFileAsPerProtocol(protocol, payload)
    if (!response.state) {
        if (retryCount !== 0) {
            console.log("Download failed!")
            console.log("Retrying...")
            retryCount -= 1
            downloadFileAsPerProtocol(protocol, payload)
        }
        else {
            throw new Error(error)
        }
    }
}

function downloadFromMultipleURL(body) {
    body.url.forEach((item) => {
        downloadFromSingleURL({ ...body, url: item })
    })
}

function downloadFileAsPerProtocol(protocol, payload) {
    const response = {}
    try {
        switch (protocol) {
            case 'http':
                downloadFileForHTTP(payload)
                break;
            case 'https':
                downloadFileForHTTPS(payload)
                break;
            default:
                downloadFileForHTTPS(payload)
                break;
        }
        response.state = true
    } catch (error) {
        response.state = false
    }
    return response
}

module.exports = { downloadFromSingleURL, downloadFromMultipleURL }