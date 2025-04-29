const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const coursesSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Courses', coursesSchema);

async function getCourses() {
    const courses = await Course.find({isPublished: true, tags: {$in: ['frontend', 'backend']}}).sort({price: -1}).select({name: 1, author: 1});
    console.log(courses);
}

getCourses();
