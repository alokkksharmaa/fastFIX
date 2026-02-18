import { ApiError } from '../utils/apiError.js';

export function notFound(req, res, next) {
  throw new ApiError(404, `Route ${req.method} ${req.path} not found`);
}
