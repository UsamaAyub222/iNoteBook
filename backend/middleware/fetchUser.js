const jwt = require('jsonwebtoken');

const JWT_SECRET = 'HelloWorld';
const fetchUsers = (req, res, next) => {
    //Get the User from JWT and add id to req object

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Authenticate using a valid token' });
    }

}

module.exports = fetchUsers;