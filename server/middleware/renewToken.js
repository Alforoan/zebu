import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const renewToken = (req, res, callback) => {
  const refreshtoken = req.cookies.refreshToken;
  
  if (!refreshtoken) {
    return res.json({ valid: false, message: 'No Refresh token' });
  } else {
    jwt.verify(
      refreshtoken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.json({ valid: false, message: 'Invalid Refresh Token' });
        } else {
          const email = decoded.email;
          const accessToken = jwt.sign(
            { email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
          );
          res.cookie('accessToken', accessToken, { maxAge: 20 * 1000 });
          callback();
        }
      }
    );
  }
};

export {renewToken}