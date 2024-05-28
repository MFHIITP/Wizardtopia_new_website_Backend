export function authMiddleware(req, res, next) {
    if (req.session && req.session.user) {
      next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
      res.status(401).send("Unauthorized access. Please log in.");
    }
  }