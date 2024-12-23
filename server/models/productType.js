const mongoose = require('mongoose')
const ProductTypeSchema = mongoose.Schema(
    {
        typename: String
    },
    {
        collection: 'ProductType'
    }
)
const ProductType = mongoose.model('ProductType', ProductTypeSchema);
module.exports = ProductType
