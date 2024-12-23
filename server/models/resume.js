const mongoose = require('mongoose')
const ResumeSchema = mongoose.Schema(
    {
        name: String,
        lastName: String,
        studentId: String
    },
    {
        collection: 'Resume'
    }
)
const Resume = mongoose.model('Resume', ResumeSchema);
module.exports = Resume