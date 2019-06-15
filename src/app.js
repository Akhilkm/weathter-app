const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const parialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(parialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akhil KM'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext: 'This is a helpful text',
        name: "Akhil KM"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Akhil KM'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        } else {
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send({error: error})
                } else {
                    res.send({
                        data: data,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({products: []})
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: "404",
        name: "Akhil KM",
        errorMessage: 'Help message not found'
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: "404",
        name: "Akhil KM",
        errorMessage: '404 page not found'
    })
})

app.listen("3000", () => {
    console.log("Server starts on port 3000")
})