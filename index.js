const express = require('express')
const fs = require('fs')
const Mustache = require('mustache');
const crypto = require("crypto");

const app = express()
const port = 3000

app.get('/', (req, res) => {
    fs.readFile('./templates/template.html', 'utf8', (err, content) => {
        // should be a dynamically generated value but using a cookie value for demo purposes
        const nonceVal = '2726c7f26c'
        // e.g. for production purposes, use something like: crypto.randomBytes(20).toString('hex');
        const csp = req.query.cspPolicy?req.query.cspPolicy: "default-src 'self'; report-uri /csp-report; img-src 'self' *.imgur.com; script-src 'self' code.jquery.com 'nonce-" + nonceVal + "' cdn.jsdelivr.net"
        res.set("Content-Security-Policy", csp)
        res.set("Content-Type", "text/html; charset=UTF-8")
        res.cookie("csp_guide_cookie", nonceVal)
        res.send(Mustache.render(content, {nonce: nonceVal, policy: csp}, {}, [ '<%', '%>' ]))
    })
  
})

app.get('/a', (req, res)=>{
    console.log("recieved call to /a")
    res.send("hi");
})

app.post('/csp-report', (req, res) => {
    res.send('')
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})