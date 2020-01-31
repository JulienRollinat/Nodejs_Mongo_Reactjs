const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter = require("./routes/userRoutes");


app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());

mongoose.connect('mongodb+srv://admin:sombra9395@cluster0-lkbtj.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', ()=> {
	console.log('connecté à mongodb');
	
})
.on('error', (err)=> {
	console.log('erreur de connexion à mongodb', err);
})

UserRouter(app);

app.get('/', (req, res, next)=>{
	res.json({'api': 'votre api est opé'})
})

const port = process.env.PORT || 3090;
app.listen(port, ()=>{
	console.log('listening port '+port+' all is ok bitch <=3');

})