import getPageInfo from './pageInfoBuilder';

describe('pageInfoBuilder tests', () => {
  it.each`
    page     |  noOfPages | result
    ${1}        ${1}        ${{ hasPreviousPage: false, hasNextPage: false }}
    ${1}        ${5}        ${{ hasPreviousPage: false, hasNextPage: true }}
    ${2}        ${5}        ${{ hasPreviousPage: true, hasNextPage: true }}
    ${5}        ${5}        ${{ hasPreviousPage: true, hasNextPage: false }}
    `('should return a valid pageInfo object for page $page and noOfPages $noOfPages',
  ({
    page, noOfPages, result,
  }) => {
    expect(getPageInfo(page, noOfPages)).toEqual(result);
  });
});
