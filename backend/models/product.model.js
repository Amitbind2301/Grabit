import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: [String],
        default: []
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }],
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory'
    }],
    unit: {
        type: String,
        default: ""
    },
    stock: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// text index with weights
productSchema.index(
    { name: "text", description: "text" },
    { weights: { name: 10, description: 5 } }
);

const ProductModel = mongoose.model('product', productSchema);

export default ProductModel;
