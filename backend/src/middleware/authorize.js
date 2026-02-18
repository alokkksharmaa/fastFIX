import { ApiError } from '../utils/apiError.js';
import { USER_ROLES } from '../utils/constants.js';

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, 'Insufficient permissions');
    }
    
    next();
  };
}

export const requireAdmin = authorize(USER_ROLES.Admin, USER_ROLES.SuperAdmin);
export const requireSuperAdmin = authorize(USER_ROLES.SuperAdmin);
