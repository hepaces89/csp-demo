const express = require('express')
const fs = require('fs')
var Mustache = require('mustache');
var crypto = require("crypto");

const app = express()
const port = 3000

app.get('/', (req, res) => {
    fs.readFile('./templates/template.html', 'utf8', (err, content) => {
        let nonceVal = crypto.randomBytes(20).toString('hex');
        res.set("Content-Security-Policy-Report-Only", "default-src 'self' 'nonce" + nonceVal + "" + "; report-uri /csp-report")
        res.send(Mustache.render(content, {nonce: nonceVal}))
    })
  
})

app.post('/csp-report', (req, res) => {
    res.send('')
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})