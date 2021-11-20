const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://shopee.vn/';

rp(URL, (err, res, html)=>{
    if(!err && res.statusCode === 200){
        const $ = cheerio.load(html);
        console.log(a);
    }
});



