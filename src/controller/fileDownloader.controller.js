const { downloadFileForHTTP, downloadFileForHTTPS, downloadFileForFTP } = require('../services/fileDownloader.service')
const { validateUrl, validateDirectoryPath } = require('../services/utilities.service')
const path = require('path');

// Download a file from a single URL
async function downloadFromSingleURL(body) {
    // Validate the URL
    if (!validateUrl(body.url)) {
        return { state: false, message: 'Invalid URL' }
    }
    let retryCount = body.retries || 1;
    const protocol = body.url.split("://")[0]
    const fileName = path.basename(body.url)
    // FTP/SFTP requires a config connection where remoteLocation is required
    if ((protocol === 'ftp' || protocol === 'sftp') && !body.config?.remoteLocation) {
        return { state: false, message: 'Please provide configration for connection' }
    }
    const payload = {
        ...body,
        url: body.url,
        fileName
    }
    const response = await downloadFileAsPerProtocol(protocol, payload)
    // If downloading failes then retry 
    if (!response.state) {
        while (retryCount !== 0) {
            console.log("Download failed!")
            console.log("Retrying...")
            retryCount -= 1
            const result = await downloadFileAsPerProtocol(protocol, payload)
            if (result.state) return result
        }
        return { state: false, message: 'Something went wrong!' }
    }
    return response
}

// Download file from a list of URLs
async function downloadFromMultipleURL(body) {
    // Validate the download location
    if (body.location && !validateDirectoryPath(body.location)) {
        return { state: false, message: 'Invalid download location' }
    }
    // Loop over the list of URLs and download the files
    const result = []
    for (let i = 0; i < body.url.length; i++) {
        const url = body.url[i]
        let res = await downloadFromSingleURL({ ...body, url })
        result.push(res)
    }
    return result
}

/**
 * Params: 
 *  protocol: // the type of protocol to be used (HTTP, HTTPS etc)
 *  Payload: // Data required to download
 */
// Call the function as per the protocol and download the file
async function downloadFileAsPerProtocol(protocol, payload) {
    const response = {}
    try {
        switch (protocol) {
            case 'http':
                return await downloadFileForHTTP(payload)
            case 'https':
                return await downloadFileForHTTPS(payload)
            case 'ftp':
                return await downloadFileForFTP(payload)
            case 'sftp':
                return await downloadFileForFTP(payload)
            default:
                response.status = false
                response.message = 'Unknown protocol'
                break
        }
    } catch (error) {
        response.state = false
        response.message = "Download failed"
        return response
    }
}

module.exports = { downloadFromSingleURL, downloadFromMultipleURL }