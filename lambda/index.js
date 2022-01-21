const git = require('./src/git');
const bash = require('./src/bash');

exports.handler = async (event) => {
    // bash.clear('/tmp');
    // git.getFullRepo();
    // bash.list(".");
    
    bash.clear('/tmp');
    git.getRepoWithSparse('config/locales');
    bash.list(".");
    
    git.createBranch();
    bash.createFile('config/locales', 'wojtek.txt');
    await git.commitAndOpenPR("New commit");
    
    console.log('Finished!');
    return 'Finished!';
};