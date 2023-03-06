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
                      $options: 'i',
                  },
              }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        // let copyQueryStr = { ...this.queryStr };
        // //remove fields
        // const removeFields = ['keyword', 'page', 'limit'];
        // removeFields.forEach((key) => delete copyQueryStr[key]);
        // // filter for price anh rating

        // let queryStr = JSON.stringify(copyQueryStr);
        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        // this.query = this.query.find(JSON.parse(queryStr));

        // return this;

        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        const removeFields = ['keyword', 'page', 'limit'];

        removeFields.forEach((key) => delete queryCopy[key]);

        // Filter For Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultsPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage * (currentPage - 1);
        this.query = this.query.limit(resultsPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;
