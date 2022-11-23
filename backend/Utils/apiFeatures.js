class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find(keyword);
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => {
      delete queryStrCopy[key];
    });

    //Price and Rating Filteration
    let queryStrTemp = JSON.stringify(queryStrCopy);

    queryStrTemp = queryStrTemp.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(queryStrTemp));

    return this;
  }

  pagination(resultPerPage) {
    let currentPage = this.queryStr.page || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
