const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connected to MongoDB...')).catch((err) => console.log('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {

    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    // Comparison Operators
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than and equal)
    // lt (less than)
    // lte (less than and equal)
    // in (in)
    // nin (not in)

    // Logical Operators
    // or
    // and

    // Regular Expressions
    // .* (anything before or after)
    // $ (end of string)
    // ^ (start of a string)
    // i (case insensitive)

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
    
    //.find({author: 'Mosh', isPublished: true})
    // .find({price: {$gte: 10, $lte: 20}})
    // .find({price: {$in: [10, 15, 20]}})

    // .or([{author: 'Mosh'}, {isPublished: true}])
    // .and([])

    // Starts with 'Mosh'
    // .find({author: /^Mosh/ })

    // Ends with 'Hamedani'
    // .find({author: /Hamedani$/i })

    // Contains 'Mosh' or 'mosh'
    // .find({author: /.*Mosh.*/i })

    .find({author: 'Mosh', isPublished: true})

    // Skips X qty of documents (e.g., separating by pages)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({name: 1})

    // Counts the documets returned
    .count();

    // .select({name: 1, tags: 1});

    console.log(courses);
}

getCourses();
