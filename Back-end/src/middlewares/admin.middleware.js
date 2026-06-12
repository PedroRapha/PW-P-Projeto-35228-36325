const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    const error = new Error('Não tens permissão para este serviço!');
    error.statusCode = 403;
    return next(error);
  }

  next();
};

module.exports = adminMiddleware