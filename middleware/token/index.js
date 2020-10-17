import { decrypt } from '../../crypto/exports';
const jwt = require('jsonwebtoken');

export const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    try {
      token = decrypt(token);
    } catch (error) {
      res.status(401);
      return res.json({
        success: false,
        message: 'Token is not valid'
      });
    }
  }
  if (token) {
    jwt.verify(token, 'kashish', (err, decoded) => {
      if (err) {
        res.status(401);
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

export default checkToken;