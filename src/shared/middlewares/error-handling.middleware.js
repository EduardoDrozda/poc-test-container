import { HttpStatusEnum } from "../enums/http-status.enum";

export default function errorHandlingMiddleware(error, req, res, next) {
  const exceptions = {
    [HttpStatusEnum.NOT_FOUND]: handlingNotFoundException,
  };

  console.log(error);
  const { status } = error;

  return exceptions[Number(status)]
    ? exceptions[Number(status)](error, res)
    : next();
}

function handlingNotFoundException(err, res) {
  const { message } = err;
  const status = HttpStatusEnum.NOT_FOUND;
  return res.status(HttpStatusEnum.NOT_FOUND).json({ message, status });
}
