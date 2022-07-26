const http = require('http');
const https = require('https');
const ftp = require("basic-ftp");
const fs = require('fs');
const { removeFileFromPath, createNewNameIfFileAlreadyExits } = require('./utilities.service')

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
    const location = payload.location ? payload.location + '/' + payload.fileName : payload.fileName
    location = createNewNameIfFileAlreadyExits(location)
    try {
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
                response.message = `Download failed!!`
                // Delete the file if download fails
                removeFileFromPath(location)
                reject()
            })
        })
        return response
    } catch (err) {
        response.state = false
        response.message = `Download failed!!`
        // Delete the file if download fails
        removeFileFromPath(location)
        return { ...response, ...err }
    }
}

// For downloading from FTP/SFTP 
async function downloadFileForFTP(payload) {
    const client = new ftp.Client()
    client.ftp.verbose = true
    let response
    const location = payload.location || __dirname
    try {
        // setting up the FTP/SFTP connection
        await client.access({
            host: payload.url,
            usename: payload.config.username || '',
            password: payload.config.password || '',
            port: payload.config.port || 22,
            ...payload.config
        })
        await client.downloadTo(location, payload.config.remoteLocation);
        response.state = true
        response.message = 'downloaded successfully!!'
    }
    catch (err) {
        // Delete the file if download fails
        removeFileFromPath(location)
        response.state = false
        response.message = `Download failed!!`
    }
    client.close()
    return response

}
module.exports = { downloadFileForHTTP, downloadFileForHTTPS, downloadFileForFTP }