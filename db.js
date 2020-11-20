const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(function () {
    console.log("data base connected successfully")
})
.catch(function (err) {
    console.log(err.message)
})