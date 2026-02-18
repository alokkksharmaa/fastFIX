import { ApiError } from '../utils/apiError.js';

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      throw new ApiError(400, 'Validation error', {
        details: result.error.errors,
      });
    }
    
    req.validated = result.data;
    next();
  };
}
