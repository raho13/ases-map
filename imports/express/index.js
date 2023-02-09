import { LocationsCollection } from "../api/locations/collection"

const express = require("express")
WebApp.rawConnectHandlers.use(express.json())
WebApp.rawConnectHandlers.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    return next()
})
export const app = express()
WebApp.connectHandlers.use(app)


app.get('/api/locations', (req, res) => {
    const costomData = []
    const data = LocationsCollection.find({status:true}, { limit: 10 }).fetch()
    data.map((item) => {
        const costomDataItem = {}
        costomDataItem.address=item.name;
        costomDataItem.lat=item.lat;
        costomDataItem.lon=item.lon;
        costomData.push(costomDataItem)
    })
    res.json(costomData)
});


