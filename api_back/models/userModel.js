const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String,
	firstName: String,
	lastName: String
});


// methode pre permet d'effectuer une action avant la sauvegarde type middleware
userSchema.pre("save", function(next){
    const user = this;
    bcrypt.hash(user.password, saltRounds)
        .then((hash, err)=> {
            if(err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    
});

//nom de la table et quel schéma utiliser
const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;