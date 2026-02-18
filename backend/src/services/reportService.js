import { Report } from '../models/Report.js';
import { Property } from '../models/Property.js';
import { ApiError } from '../utils/apiError.js';
import { parsePagination, buildPageMeta } from '../utils/pagination.js';

export async function createReport(propertyId, reporterId, reason) {
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new ApiError(404, 'Property not found');
  }
  
  const existingReport = await Report.findOne({
    property: propertyId,
    reporter: reporterId,
    status: 'open',
  });
  
  if (existingReport) {
    throw new ApiError(409, 'You have already reported this property');
  }
  
  const report = await Report.create({
    property: propertyId,
    reporter: reporterId,
    reason,
  });
  
  return await Report.findById(report._id)
    .populate('property', 'title location')
    .populate('reporter', 'name email');
}

export async function getReports(filters, pagination) {
  const { page, limit, skip } = pagination;
  const { status } = filters;
  
  const query = {};
  if (status) {
    query.status = status;
  }
  
  const [reports, total] = await Promise.all([
    Report.find(query)
      .populate('property', 'title location status')
      .populate('reporter', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Report.countDocuments(query),
  ]);
  
  return { reports, total, page, limit };
}

export async function updateReportStatus(id, status) {
  const report = await Report.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .populate('property', 'title location')
    .populate('reporter', 'name email');
  
  if (!report) {
    throw new ApiError(404, 'Report not found');
  }
  
  return report;
}
