const { execSync, spawnSync } = require('child_process');

function clear(path) {
    execSync(`rm -rf /${path}/*`);
}

function list(path) {
    var child = spawnSync("ls", ["-hl", path], { encoding : 'utf8' });
    console.log(child.stdout);
}

function createFile(path, filename) {
    execSync(`cd ${path} && touch ${filename}`)
}

module.exports = {
    clear,
    list,
    createFile
}