const jwt = require('jsonwebtoken');
const secret = 'pro06';


const withAuth = function(req, res, next) {
  const token = req.headers['x-access-token'] ||


  console.log('token middleware',token);

  if (!token) {
    res.json({
          status: 404,
          msg: "token not found"
        })
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.json({
          status: 401,
          msg: "error, your token is invalid"
        })


      } else {
        next();
      }
    });
  }
}

module.exports = withAuth;