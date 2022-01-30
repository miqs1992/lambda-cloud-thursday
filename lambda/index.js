const git = require('./src/git');
const bash = require('./src/bash');
const { download } = require('./src/download');

exports.handler = async (event) => {
    // bash.clear('/tmp');
    // git.getFullRepo();
    // bash.list(".");
    
    bash.clear('/tmp');
    git.getRepoWithSparse('config/locales');
    bash.list(".");
    
    git.createBranch();
    await download('de.yml', 'config/locales', event.presignedUrl);
    await git.commitAndOpenPR('New commit');
    
    console.log('Finished!');
    return 'Finished!';
};