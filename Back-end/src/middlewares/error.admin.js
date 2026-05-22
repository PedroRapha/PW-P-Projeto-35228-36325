const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    const error = new Error('Não tens permissão para este serviço!');
    error.status = 403;
    throw error;
    return next(error);
  }

  next();
};

module.exports = adminMiddleware