import { ApiError } from './apiError.js';

export function parsePagination(query, options = {}) {
  const pageRaw = query.page ?? '1';
  const limitRaw = query.limit ?? String(options.defaultLimit ?? 10);

  const page = Number(pageRaw);
  const limit = Number(limitRaw);
  const maxLimit = options.maxLimit ?? 50;

  if (!Number.isFinite(page) || page < 1) throw new ApiError(400, 'Invalid page');
  if (!Number.isFinite(limit) || limit < 1) throw new ApiError(400, 'Invalid limit');

  const safeLimit = Math.min(limit, maxLimit);
  const skip = (page - 1) * safeLimit;

  return { page, limit: safeLimit, skip };
}

export function buildPageMeta({ page, limit, total }) {
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  return { page, limit, total, totalPages };
}

