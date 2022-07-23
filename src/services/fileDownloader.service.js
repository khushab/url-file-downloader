const http = require('http');
const https = require('https');
const fs = require('fs');


const { validateUrl } = require('./utilities.service')

// For downloading files from HTTP
function downloadFileForHTTP(payload) {
    try {
        // Validate the URL
        if (!validateUrl(payload.url)) {
            throw new Error('Invalid URL')
        }
        http.get(payload.url, function (res) {
            saveFileOnDisk(res, payload)
        })
    } catch (error) {
        throw new Error('Something went wrong!')
    }

}

// For downloading files from HTTPS
function downloadFileForHTTPS(payload) {
    try {
        // Validate the URL
        if (!validateUrl(payload.url)) {
            throw new Error('Invalid URL')
        }
        https.get(payload.url, function (res) {
            saveFileOnDisk(res, payload)
        })
    } catch (error) {
        throw new Error('Something went wrong!')
    }
}

// For downloading and saving the file locally
function saveFileOnDisk(res, payload) {
    try {
        const fileStream = fs.createWriteStream(payload.fileName)
        res.pipe(fileStream)

        // On error
        fileStream.on('error', function (err) {
            throw new Error("Error Writing to the stream")
        })
        // On finish
        fileStream.on('finish', function () {
            fileStream.close()
            console.log("File downloaded!!")
        })
    } catch (error) {
        throw new Error('Something went wrong!')
    }
}

module.exports = { downloadFileForHTTP, downloadFileForHTTPS }