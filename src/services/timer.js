const mailer = require('./mailer.js');
const TIME_INTERVAL = 15000; 

const start = () => 
    setInterval(()=> {
        mailer.sendMail()
    }, TIME_INTERVAL);


module.exports = {start};