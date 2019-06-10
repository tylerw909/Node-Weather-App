const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidHlsZXJ3OTA5IiwiYSI6ImNqd2w0eGI2ZjAycHU0N3ByZDNmNzMwYzIifQ._KTMFKSF1KfcvpDT6ruWJA&limit=1"
    
    request({ url , json:true}, (error, { body }) =>{
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.body === 0) {
            callback('Unable to find location. Try another serach.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode