import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};


/* Token verification, role checking
import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded.payload;
        
        next();
    } catch (err) {
        res.status(401).json({ err: 'Invalid token.' });
    }
}

export default verifyToken;

*/
