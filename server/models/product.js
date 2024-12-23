const mongoose = require('mongoose')
const ResumeSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        type: String,
        image: String
    },
    {
        collection: 'Product'
    }
)
const Product = mongoose.model('Product', ResumeSchema);
module.exports = Product