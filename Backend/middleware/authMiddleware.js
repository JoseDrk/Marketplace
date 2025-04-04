const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tu_clave_secreta_super_segura';

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token no válido' });
    }
};
