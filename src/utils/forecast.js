const request = require("request")

const temperatureCelsius = (fahrenheit) => {
   return  (fahrenheit-32)*5/9
}

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/b8ae5a297fc25b85480d5b7cc10b0d2c/${latitude},${longitude}`
    request({url, json: true}, (err, res, body) => {
        if (err) {
           callback("Unable to connect to weather service!", undefined)
        } else if (!res.body) {
            callback("Unable to find the location!", undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${temperatureCelsius(body.currently.temperature).toFixed(2)} degrees out. There is chance of ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast