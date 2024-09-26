import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate  = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            console.log('No token found in cookies');
            return res.status(401).json({ message: 'No token provided' });
        }

        console.log('Token found:', token);

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
            console.log('Decoded token:', decoded);
        } catch (jwtError) {
            console.error('JWT verification failed:', jwtError);
            return res.status(401).json({ message: 'Invalid token', error: jwtError.message });
        }
        req.user = await User.findById(decoded.id);
        next();
    }
    catch (error) {
        console.error('Error in getUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
