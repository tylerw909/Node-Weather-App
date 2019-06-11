const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/c0f7f882ed1ce55840fdb4ece799f2bc/" + longitude + "," + latitude + "?lang=en"
    
    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to forecast.", undefined)
        } else if (body.error) {
            callback("Unable to find that position.", undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out, with a " + body.currently.precipProbability + "% chance of rain. Today there is a low of " + body.daily.data[0].temperatureLow + " and a high of " + body.daily.data[0].temperatureHigh + ".")
        }
    })
}

module.exports = forecast