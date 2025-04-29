// For handling async operations:
// 1) Callback
// 2) Promises
// 3) Async/await

// Asynchronous
// console.log('Before');
// getUser(1, (user) => {
//     getRepositories(user.githubUsername, (repos) => {
//         getCommits(repo, (commits) => {
//             // CALBACK HELL (or Christmas Tree problem)
//         });
//     });
// });

// Synchronous
// console.log('Before');
// const user = getUser(1);
// const repos = getRepositories(user.githubUsername);
// const commits = getCommits(repos[0]);
// console.log("After");


// Functions
function getRepositories() {
    getRepositories(user.githubUsername, getCommits);
}
function getCommits(repo) {
    getCommits(repo, displayCommits);
}
function displayCommits(commits) {
    console.log(commits);
}
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from the database...');
        callback({id: id, githubUsername: 'franfonse'});
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

console.log('After');