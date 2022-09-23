export function getPagination(page?: any, size?: any) {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
}

interface PaginDataObject {
  rows: any[];
  count: number;
}

export function getPaginData(data: PaginDataObject, page: any, limit: number) {
  const { count: totalItems, rows: dataPaginated } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, totalPages, currentPage, dataPaginated };
}
