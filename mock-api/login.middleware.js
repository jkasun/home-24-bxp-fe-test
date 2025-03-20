const users = require('./data/users');

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    const { username, password } = req.body;

    // Find user with matching credentials
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Return success with token
      res.json({
        success: true,
        token: user.token,
        message: 'Login successful'
      });
    } else {
      // Return error for invalid credentials
      res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
  } else {
    // Continue to JSON Server router for other requests
    next();
  }
}; 