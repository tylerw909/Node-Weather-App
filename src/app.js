const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve thru express
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {       // express goes and finds this in the VIEWS folder and converts to HTML
        title: "Weather App",
        name: "Tyler Weisner"
    })         
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Created by Tyler Weisner"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Help I've fallen and I can't get up!",
        title: "Help",
        name: "Tyler Weisner"
    })         
})

app.get('/weather', (req, res) => {         //  SEND sends JSON data, RENDER displays actually page
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address." 
        })
    }
    const location = req.query.address

    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: "You must provide an address."
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: "You must provide an address."
                })
            }
            res.send({
                forecastData: forecastData,
                location: location,
                address: req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({           // we use return here so that if no search term then the if statement executes and
            error: "You must provide a search term"         // DOES NOT continue to send 2nd HTTP request (not allowed)
        })
    }
    res.send({
        products: []
    })
})

// This will go off for any link from help that DNE
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tyler Weisner did not cause your error',
        errorMessage: 'Help article not found'
    })
})

// the * means to render for anything that isn't a page already made(err 404)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tyler Weisner did not cause your error',
        errorMessage: 'ERROR 404 PAGE NOT FOUND'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})