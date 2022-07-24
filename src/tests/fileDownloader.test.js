const fileDownloader = require('../index')


test('Download file with invalid URL', async () => {
    const payload = {
        url: 'abcd'
    }
    const result = await fileDownloader(payload)
    expect(result.state).toBe(false)
    expect(result.message).toBe('Invalid URL')
})

test('Download file with valid URL', async () => {
    const payload = {
        url: "http://www.wikidot.com/common--theme/wikidot30/images/how3.png"
    }
    const result = await fileDownloader(payload)
    expect(result.state).toBe(true)
    expect(result.message).toBe('how3.png downloaded successfully!!')
})

test('Download files with array of URLs', async () => {
    const payload = {
        url: [
            "https://www.researchgate.net/profile/Diego-Pava-2/publication/268002308/figure/fig11/AS:295431528566789@1447447773169/Very-low-resolution-image-from-video-3.png",
            "https://www.researchgate.net/profile/Diego-Pava-2/publication/268002308/figure/fig11/AS:295431528566789@1447447773169/Very-low-resolution-image-from-video-3.png"
        ]
    }
    const result = await fileDownloader(payload)
    expect(result.length).toBe(2)
    expect(result[0].state).toBe(true)
    expect(result[0].message).toBe('Very-low-resolution-image-from-video-3.png downloaded successfully!!')
})

test('Download files with array of URLs with one invalid URL', async () => {
    const payload = {
        url: [
            "https://www.researchgate.net/profile/Diego-Pava-2/publication/268002308/figure/fig11/AS:295431528566789@1447447773169/Very-low-resolution-image-from-video-3.png",
            "https://www.researchgate.net/profile/Diego-Pava-2/publication/268002308/figure/fig11/AS:295431528566789@1447447773169/Very-low-resolution-image-from-video-3.png",
            "abcd"
        ]
    }
    const result = await fileDownloader(payload)
    expect(result.length).toBe(3)
    expect(result[0].state).toBe(true)
    expect(result[0].message).toBe('Very-low-resolution-image-from-video-3.png downloaded successfully!!')
    expect(result[2].message).toBe('Invalid URL')
})

test('Calling download function with empty array', async () => {
    const payload = {
        url: []
    }
    const result = await fileDownloader(payload)
    expect(result.length).toBe(0)
})

test('Calling download function with a valid download location', async () => {
    const payload = {
        url: [
            "https://www.researchgate.net/profile/Diego-Pava-2/publication/268002308/figure/fig11/AS:295431528566789@1447447773169/Very-low-resolution-image-from-video-3.png",
            "https://www.researchgate.net/profile/Diego-Pava-2/publication/268002308/figure/fig11/AS:295431528566789@1447447773169/Very-low-resolution-image-from-video-3.png",
        ],
        location: __dirname
    }
    const result = await fileDownloader(payload)
    expect(result.length).toBe(2)
    expect(result[0].state).toBe(true)
    expect(result[0].message).toBe('Very-low-resolution-image-from-video-3.png downloaded successfully!!')
})

test('Calling download function with an invalid download location', async () => {
    const payload = {
        url: [
            "https://www.researchgate.net/profile/Diego-Pava-2/publication/268002308/figure/fig11/AS:295431528566789@1447447773169/Very-low-resolution-image-from-video-3.png",
            "https://www.researchgate.net/profile/Diego-Pava-2/publication/268002308/figure/fig11/AS:295431528566789@1447447773169/Very-low-resolution-image-from-video-3.png",
        ],
        location: '/Users/khushab/asadwdw'
    }
    const result = await fileDownloader(payload)
    expect(result.state).toBe(false)
    expect(result.message).toBe('Invalid download location')
})
