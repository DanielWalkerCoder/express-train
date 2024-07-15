const express = require('express')
const logger = require('morgan')
const app = express()
app.use(logger("dev"))
app.use(express.json())

let store = [
    {
        name: 'apple',
        price: 1.5
    }
]

app.get('/', (req, res)=>{
    res.json({message: "Here is the store menu:", payload: store})
})

app.get('/get-all-products', (req, res)=>{
    let storeList = []
    for(each of store){
        storeList.push(each.name)
    }
    res.json({message: 'Here is a list of store items:', payload: storeList})
})

app.get('/get-product/:productName', (req, res)=>{
    let item = store.find(thing => thing.name === req.params.productName)
    res.json({payload: item})
})

app.post('/create-product', (req, res)=>{
    let newItem = {
        name: req.body.name,
        price: req.body.price
    }
    store.push(newItem)
    res.json({message: "Produce added", payload: store})
})

app.delete('/delete-product/:productName', (req, res)=>{
    let item = store.find(thing => thing.name === req.params.productName)
    let place = store.indexOf(item)
    store.splice(place, 1)
    res.json({message: "Product deleted", payload: store})
})

app.listen(3000, ()=>{
    console.log('Listening...')
})