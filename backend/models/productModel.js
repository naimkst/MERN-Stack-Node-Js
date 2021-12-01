const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please Enter Your Description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter your price']
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, 'Please enter your category']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter your stock'],
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
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Products', productSchema);