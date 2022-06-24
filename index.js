const express = require('express');
const cors = require('cors');
const fs = require('fs');
const exec = require('child_process').exec;

const app = express()
app.use(cors());
app.use(express.json())

app.post('/codeJS', (req, res) => {
    fs.writeFileSync('input.js', req.body.code);
    new Promise((res, rej) => {
        exec(`node input.js`, (err, stdout, stderr) => {
            if(stderr) rej(stderr);
            else if(err) rej(err);
            res(stdout);    
        })
    })
    .then(respo => {
        res.json({output: respo})
        fs.unlinkSync('input.js');
    })
    .catch(error => {
        res.json({error})
        fs.unlinkSync('input.js');
    })
})

app.listen(process.env.PORT || 5000, () => console.log('Server started on port 5000'))