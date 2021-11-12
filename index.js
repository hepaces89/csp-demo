const express = require('express')
const fs = require('fs')
var Mustache = require('mustache');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.set("Content-Security-Policy-Report-Only", "default-src 'self'; report-uri /csp-report")
    fs.readFile('./templates/template.html', 'utf8', (err, content) => {
        res.send(Mustache.render(content, {nonce: 'bob'}))
    })
  
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})