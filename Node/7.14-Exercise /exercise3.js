const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const coursesSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Courses', coursesSchema);

async function getRequiredDocs() {
    const courses = await Course.find({
        isPublished: true
    }).or([{
        price: {
            $gte: 15
        }
    }, {
        name: /.*by.*/i
    }]).select('name author price');
    console.log(courses);
}

getRequiredDocs();
