const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please Enter Product Name'],
        trim: true
    },
    description: {
        type: String,
        require: [true, 'Please Enter Your Description']
    },
    price: {
        type: Number,
        require: [true, 'Please enter your price']
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        }
    }],
    category: {
        type: String,
        require: [true, 'Please enter your category']
    },
    stock: {
        type: Number,
        require: [true, 'Please enter your stock'],
        maxLength: 4,
        default: 1
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        name: {
            type: String,
            require: true
        },
        rating: {
            type: Number,
            require: true
        },
        comment: {
            type: String,
            require: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Products', productSchema);