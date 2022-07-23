const { downloadFileForHTTP, downloadFileForHTTPS } = require('../services/fileDownloader.service')
const { validateUrl } = require('../services/utilities.service')
const path = require('path');

async function downloadFromSingleURL(body) {
    let retryCount = body.retries || 1;
    const protocol = body.url.split("://")[0]
    const fileName = path.basename(body.url)
    const payload = {
        ...body,
        url: body.url,
        fileName
    }
    const response = await downloadFileAsPerProtocol(protocol, payload)
    if (!response.state) {
        while (retryCount !== 0) {
            console.log("Download failed!")
            console.log("Retrying...")
            retryCount -= 1
            const result = await downloadFileAsPerProtocol(protocol, payload)
            if (result.state) return result
        }
        throw new Error(response)
    }
    console.log(response.message)
    return response
}

function downloadFromMultipleURL(body) {
    for (let i = 0; i < body.url.length; i++) {
        const url = body.url[i]
        // Validate the URL
        if (!validateUrl(url)) {
            console.log("Invalid URL!")
            continue
        }
        downloadFromSingleURL({ ...body, url })
    }
}

async function downloadFileAsPerProtocol(protocol, payload) {
    const response = {}
    try {
        switch (protocol) {
            case 'http':
                return await downloadFileForHTTP(payload)
            case 'https':
                return await downloadFileForHTTPS(payload)
            default:
                return await downloadFileForHTTPS(payload)
        }
    } catch (error) {
        response.state = false
        response.message = error.message
        return response
    }
}

module.exports = { downloadFromSingleURL, downloadFromMultipleURL }