let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongodb = require('./database/db')


mongoose.Promise = global.Promise;
mongoose.connect(mongodb.db, {
  useNewUrlParser : true,
  useFindAndModify : false,
  useUnifiedTopology:true,
}).then(()=>{
   console.log('Database successfully connnected')
}, error=>{
   console.log('Datbase error')
})

const bookRoute = require('./routes/book.routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended :false }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist/')));

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})


//API Route
app.use('/api', bookRoute);

const port = process.env.POST || 8000;

app.listen(port, ()=>{
    console.log('Listening on port '+port)
})

//404 error
app.use((req, res, next)=>{
  next(createError(404))
})

app.use(function(err, req, res, next) {
  console.error(err.message)
  if(!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})
