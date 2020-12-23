export function logger(req, res, next) {
  console.log('Middleware');
  next();
}
