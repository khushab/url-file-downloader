const http = require('http');
const https = require('https');
const fs = require('fs');

// For downloading files from HTTP
async function downloadFileForHTTP(payload) {
    let response
    await new Promise(function (resolve, reject) {
        http.get(payload.url, async function (res) {
            response = await saveFileOnDisk(res, payload)
            if (response.state) resolve()
            else reject()
        })
    })
    return response

}

// For downloading files from HTTPS
async function downloadFileForHTTPS(payload) {
    let response
    await new Promise(function (resolve, reject) {
        https.get(payload.url, async function (res) {
            response = await saveFileOnDisk(res, payload)
            if (response.state) resolve()
            else reject()
        })
    })
    return response
}

// For downloading and saving the file locally
async function saveFileOnDisk(res, payload) {
    const response = {}
    try {
        const location = payload.location ? payload.location + '/' + payload.fileName : payload.fileName
        console.log(location, "location")
        const fileStream = fs.createWriteStream(location)
        await res.pipe(fileStream)

        await new Promise(function (resolve, reject) {
            // On finish
            fileStream.on('finish', function () {
                fileStream.close()
                response.state = true
                response.message = `${payload.fileName} downloaded successfully!!`
                resolve()
            })
            // On error
            fileStream.on('error', function (err) {
                response.state = false
                response.message = `${payload.fileName} download failed!!`
                reject()
            })
        })
        return response
    } catch (err) {
        response.state = false
        response.message = `${payload.fileName} download failed!!`
        return { ...response, ...err }
    }
}

module.exports = { downloadFileForHTTP, downloadFileForHTTPS }