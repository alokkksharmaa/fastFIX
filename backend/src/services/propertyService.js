import { Property } from '../models/Property.js';
import { ApiError } from '../utils/apiError.js';
import { PROPERTY_STATUSES } from '../utils/constants.js';

export async function createProperty(data, ownerId) {
  const property = await Property.create({
    ...data,
    owner: ownerId,
  });
  
  return await Property.findById(property._id).populate('owner', 'name email');
}

export async function getProperties(filters, pagination) {
  const { page, limit, skip } = pagination;
  const { location, minPrice, maxPrice, type, status, search } = filters;
  
  const query = {};
  
  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }
  
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  
  if (type) {
    query.type = type;
  }
  
  if (status) {
    query.status = status;
  } else {
    query.status = PROPERTY_STATUSES.approved;
  }
  
  if (search) {
    query.$text = { $search: search };
  }
  
  const [properties, total] = await Promise.all([
    Property.find(query)
      .populate('owner', 'name email')
      .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Property.countDocuments(query),
  ]);
  
  return { properties, total, page, limit };
}

export async function getPropertyById(id) {
  const property = await Property.findById(id).populate('owner', 'name email');
  
  if (!property) {
    throw new ApiError(404, 'Property not found');
  }
  
  return property;
}

export async function updateProperty(id, data, userId, userRole) {
  const property = await Property.findById(id);
  
  if (!property) {
    throw new ApiError(404, 'Property not found');
  }
  
  if (property.owner.toString() !== userId.toString() && userRole !== 'Admin' && userRole !== 'SuperAdmin') {
    throw new ApiError(403, 'Not authorized to update this property');
  }
  
  Object.assign(property, data);
  await property.save();
  
  return await Property.findById(id).populate('owner', 'name email');
}

export async function deleteProperty(id, userId, userRole) {
  const property = await Property.findById(id);
  
  if (!property) {
    throw new ApiError(404, 'Property not found');
  }
  
  if (property.owner.toString() !== userId.toString() && userRole !== 'Admin' && userRole !== 'SuperAdmin') {
    throw new ApiError(403, 'Not authorized to delete this property');
  }
  
  await Property.findByIdAndDelete(id);
  
  return { message: 'Property deleted successfully' };
}

export async function approveProperty(id) {
  const property = await Property.findByIdAndUpdate(
    id,
    { status: PROPERTY_STATUSES.approved },
    { new: true }
  ).populate('owner', 'name email');
  
  if (!property) {
    throw new ApiError(404, 'Property not found');
  }
  
  return property;
}

export async function rejectProperty(id) {
  const property = await Property.findByIdAndUpdate(
    id,
    { status: PROPERTY_STATUSES.rejected },
    { new: true }
  ).populate('owner', 'name email');
  
  if (!property) {
    throw new ApiError(404, 'Property not found');
  }
  
  return property;
}
