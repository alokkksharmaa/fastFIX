export function ok(res, message, data = undefined, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

