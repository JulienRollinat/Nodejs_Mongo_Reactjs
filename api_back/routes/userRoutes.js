const UserController = require('../controllers/userController');
const withAuth = require('../middleware');

module.exports = function (app) {
    
    app.post('/api/user/signup', UserController.signup)
    
    app.post('/api/user/signin', UserController.signin);
    
    app.get('/api/user/checkToken', withAuth, UserController.checkToken);

    
    app.get('/api/user', (req, res, next)=>{
        res.json({user: 'route opé'})
    })
    
}