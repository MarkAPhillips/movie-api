const getPageInfo = (page, noOfPages) => {
  let hasPreviousPage = false;
  let hasNextPage = false;

  if (page === 1 && noOfPages > page) {
    hasNextPage = true;
  }

  if (page > 1 && noOfPages > page) {
    hasNextPage = true;
    hasPreviousPage = true;
  }

  if (page !== 1 && page === noOfPages) {
    hasPreviousPage = true;
  }

  return {
    hasPreviousPage,
    hasNextPage,
  };
};

export default getPageInfo;
