const users = require('./data/users');

module.exports = (req, res, next) => {
  // Handle login endpoint
  if (req.method === 'POST' && req.path === '/login') {
    const { username, password } = req.body;

    // Find user with matching credentials
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Return user data matching AuthService format
      res.json({
        username: user.username,
        isAuthenticated: true,
        token: user.token
      });
    } else {
      // Return error for invalid credentials
      res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
  } 
  // Handle /auth/me endpoint
  else if (req.method === 'GET' && req.path === '/auth/me') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    const user = users.find(u => u.token === token);

    if (user) {
      res.json({
        username: user.username,
        isAuthenticated: true,
        token: user.token
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  }
  else {
    // Continue to JSON Server router for other requests
    next();
  }
}; 