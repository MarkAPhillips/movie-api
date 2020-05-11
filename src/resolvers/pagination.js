// TODO: Need to determine hasNextPage and hasPreviousPage
const getPageInfo = (endCursor, startCursor) => ({
  endCursor,
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor,
});

export default getPageInfo;
