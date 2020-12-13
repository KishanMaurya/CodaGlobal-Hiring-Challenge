import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Routes from './routes/web.js'
const app=express()
const __dirname = path.resolve();
dotenv.config()



//Database Connection
mongoose.connect(process.env.MONGO_CONNECTION_URL,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:true
})
const connection = mongoose.connection;
connection.once('open', ()=>{
console.log('Database connected')
}).catch(err =>{
console.log("connection field"+err)
})


app.use(express.static('public'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.set('views',path.join(__dirname , '/resources/views'))
app.set('view engine' , 'ejs')



// add breadcrumbs
const get_breadcrumbs = function (url) {
  var rtn = [{ name: "Home", url: "/" }],
    acc = "", // accumulative url
    arr = url.substring(1).split("/");

  for (let i = 0; i < arr.length; i++) {
    acc = i != arr.length - 1 ? acc + "/" + arr[i] : null;
    rtn[i + 1] = {
      name: arr[i].charAt(0).toUpperCase() + arr[i].slice(1),
      url: acc,
    };
  }
  return rtn;
};
app.use(function (req, res, next) {
  req.breadcrumbs = get_breadcrumbs(req.originalUrl);
  next();
});



Routes(app)

const PORT=process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is running on localhost//${PORT}`)
})