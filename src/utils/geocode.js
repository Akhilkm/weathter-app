const request = require("request")

const geocode = (address, callback) => {
    const access_token = "pk.eyJ1IjoiYWtoaWx1MDExIiwiYSI6ImNqdjd5MnBnYzBsMGQzeXBha3Nyejl0MnkifQ.GGPeGNU0tigBpKZuX9EDlw"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=${access_token}`

    request({url, json: true}, (err, res, body) => {
        if (err) {
            callback("Unable to connect to location service!", undefined)
        } else if (res.body.features.length === 0) {
            callback("Unable to find location. Try another searc.", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    
    })
}

module.exports = geocode