const getPaging = (item) => ({
  page: item.page,
  pageCount: item.total_pages,
  totalResults: item.total_results,
});

export default getPaging;
