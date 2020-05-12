import getPageInfo from './pageInfoBuilder';

describe('pageInfoBuilder tests', () => {
  it.each`
    page     |  totalCount  |   noOfPages | result
    ${1}        ${10}           ${1}        ${{ hasPreviousPage: false, hasNextPage: false }}
    `('should return a valid pageInfo object for page $page, totalCount $totalCount and noOfPages $noOfPages',
  ({
    page, totalCount, noOfPages, result,
  }) => {
    expect(getPageInfo(page, totalCount, noOfPages)).toEqual(result);
  });
});
