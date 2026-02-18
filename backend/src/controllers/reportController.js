import * as reportService from '../services/reportService.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildPageMeta } from '../utils/pagination.js';

export const createReport = asyncHandler(async (req, res) => {
  const report = await reportService.createReport(
    req.validated.params.id,
    req.user._id,
    req.validated.body.reason
  );
  ok(res, 'Report created successfully', { report }, 201);
});

export const getReports = asyncHandler(async (req, res) => {
  const { reports, total, page, limit } = await reportService.getReports(
    req.validated.query,
    req.pagination
  );
  ok(res, 'Reports retrieved successfully', {
    reports,
    pagination: buildPageMeta({ page, limit, total }),
  });
});

export const updateReportStatus = asyncHandler(async (req, res) => {
  const report = await reportService.updateReportStatus(
    req.validated.params.id,
    req.validated.body.status
  );
  ok(res, 'Report status updated successfully', { report });
});
