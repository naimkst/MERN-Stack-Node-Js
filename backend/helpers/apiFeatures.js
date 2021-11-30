class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i',
            },
        } : {};
        console.log(keyword);
        this.query = this.query.find({
            ...keyword
        });
        return this;
    }

    //For Filter 
    filter() {
        const queryFilter = {...this.queryStr }

        //Remove some field from category
        const removeFields = ['keyword', 'page', 'limit'];

        removeFields.forEach(key => delete queryFilter[key])

        //Price Filter
        let queryStr = JSON.stringify(queryFilter);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    //Pagination 
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        console.log(currentPage);
        return this;


    }
}

module.exports = ApiFeatures;