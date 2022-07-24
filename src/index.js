const { downloadFromSingleURL, downloadFromMultipleURL } = require('./controller/fileDownloader.controller')

/**
 * Params: 
 * {
 *      url: // can be either a URL or an array of URLs,
 *      retries: // Number of times of retries, default is 1
 *      location: // Location where the file should be downloaded, default is current directory
 *      config: {
 *          username: // this is optional, default is '',
 *          password: // this is optional, default is ''
 *          port: // this is optional, default is 22,
 *     } // should contain the config for FTP/SFTP connection
 * }
 */
async function fileDownloader(body) {
    let response
    if (Array.isArray(body.url)) {
        response = await downloadFromMultipleURL(body)
    } else {
        response = await downloadFromSingleURL(body)
    }
    console.log(response)
    return response
}

module.exports = fileDownloader

const url0 = "http://www.wikidot.com/common--theme/wikidot30/images/how3.png"
const url1 = "https://images.pexels.com/photos/4113831/pexels-photo-4113831.jpeg"
const url2 = "https://images.pexels.com/photos/12270237/pexels-photo-12270237.jpeg"

const body = {
    url: [url0, url2, url1, ''],
    retries: 2,
    location: '/Usfnsdj'
}

fileDownloader(body)


