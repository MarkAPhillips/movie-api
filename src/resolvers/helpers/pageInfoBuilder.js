const getPageInfo = (page, totalCount, noOfPages) => {
  const PAGE_SIZE = 20; // API Default page size
  const hasPreviousPage = false;
  const hasNextPage = false;

  console.log(page, totalCount, noOfPages, PAGE_SIZE);

  return {
    hasPreviousPage,
    hasNextPage,
  };
};

export default getPageInfo;
