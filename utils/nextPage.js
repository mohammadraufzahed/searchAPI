function nextPage(pageNumber) {
  if (isNaN(pageNumber) || pageNumber == 0 || pageNumber == 1) {
    return 0;
  } else {
    return --pageNumber * 10;
  }
}
module.exports = nextPage;
