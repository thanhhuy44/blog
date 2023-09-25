export interface Pagination {
  page: number;
  pageSize: number;
  totalPage: number;
  total?: number;
}

export const ReactionType = {
  LIKE: "like",
  UNLIKE: "unlike",
};
