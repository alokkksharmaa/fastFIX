import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';

export async function getUsers(filters, pagination) {
  const { page, limit, skip } = pagination;
  const { role, status } = filters;
  
  const query = {};
  if (role) {
    query.role = role;
  }
  if (status) {
    query.status = status;
  }
  
  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments(query),
  ]);
  
  return { users, total, page, limit };
}

export async function updateUserRole(userId, role) {
  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).select('-password');
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  
  return user;
}

export async function updateUserStatus(userId, status) {
  const user = await User.findByIdAndUpdate(
    userId,
    { status },
    { new: true }
  ).select('-password');
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  
  return user;
}
