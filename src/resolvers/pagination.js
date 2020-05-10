const getPageInfo = (endCursor, startCursor) => ({
  endCursor,
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor,
});

export default getPageInfo;
