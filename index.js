//import for needed modules
const http = require('http') 
const fs = require('fs')
const url = require('url')
const replaceTemplete = require('./replaceTemp')

//Read file of data.json
const dataFile = fs.readFileSync(`${__dirname}/data.json`,'utf-8')
const productData =JSON.parse(dataFile)

//import for html templetes
const tempCard = fs.readFileSync(`${__dirname}/templetes/card.html`,'utf-8')
const tempOverview = fs.readFileSync(`${__dirname}/templetes/overview.html`,'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templetes/product.html`,'utf-8')

const newServer = http.createServer((req,res)=>{
    const pathName = req.url
    const query = url.parse(req.url,true)
    if(pathName === '/overview' || pathName === '/'){
        res.writeHead(200,{'Content-type':'text/html'})
        const cardHtml = productData.map(element => replaceTemplete(tempCard,element)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml)
        res.end(output)
    }
    else if (pathName === `/product?id=${query.query.id}`){
        const productId = productData[query.query['id']]
        const output = replaceTemplete(tempProduct,productId)
        res.end(output)
    }
    else if (pathName === '/api'){
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(dataFile)  
    }
    else{
        res.writeHead(404,{'content_type':'text/html','my-own-header':'hello-world' })
        res.end('<h1>page not found</h1>')
    }
})

newServer.listen(5000,'127.0.0.1',()=>{console.log('Waiting For request on port 5000')})




