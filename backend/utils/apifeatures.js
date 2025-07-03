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

        this.keywordFilter = keyword; // Save for later
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        // Convert gt/gte/lt/lte to MongoDB format
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        const filters = JSON.parse(queryStr);

        // Combine filters with keyword search
        const finalQuery = {
            ...this.keywordFilter,
            ...filters,
        };

        console.log("Final Filter Query:", finalQuery);

        this.query = this.query.find(finalQuery);
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = this.queryStr.page || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;
