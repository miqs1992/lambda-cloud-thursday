const { execSync } = require('child_process');
const { Octokit } = require('@octokit/core');
const { GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_EMAIL } = process.env;
const repo = 'lambda-cloud-thursday';
const owner = GITHUB_USERNAME;
const gitRepositoryURL = `github.com/miqs1992/${repo}.git`;
const base = 'main'
const head = `cloud-thursday-${new Date().toISOString().slice(0, 16).replace(':', '-')}`;

function getRepoWithSparse(path) {
    console.log("Fetching repo with sparse...");
    process.chdir(`/tmp`);
    execSync(`git clone --filter=blob:none --no-checkout --quiet https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@${gitRepositoryURL}`);
	execSync(`cd ${repo}`);
    process.chdir(`/tmp/${repo}`);
	execSync(`git sparse-checkout set ${path}`);
	execSync(`git read-tree -mu HEAD`);
	console.log("Done!");
}

function getFullRepo() {
    console.log("Fetching full repo...");
    process.chdir(`/tmp`);
    execSync(`git clone --quiet https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@${gitRepositoryURL}`);
    execSync(`cd ${repo}`);
    process.chdir(`/tmp/${repo}`);
    console.log("Done!");
}

function createBranch() {
  console.log("Creating branch...");
  process.chdir(`/tmp/${repo}`);
	execSync(`git config user.name "${GITHUB_USERNAME}" && git config user.email "${GITHUB_EMAIL}"`);
	execSync(`git checkout -b ${head} --quiet`);
	console.log("Done!");;
}

async function commitAndOpenPR(commitName) {
    console.log("Creating commit...");
    process.chdir(`/tmp/${repo}`);
    execSync(`git add . && git commit --quiet -m "${commitName}"`)
    console.log("Pushing changes...");
	execSync(`git push --quiet --set-upstream origin ${head}`)
	const octokit = new Octokit({ auth: GITHUB_TOKEN }),
		title = 'Update from lambda',
	    body  = 'Update';

	await octokit.request(
		`POST /repos/{owner}/{repo}/pulls`, { owner, repo, title, body, head, base }
	);
	console.log("Done!");
}

module.exports = {
  getFullRepo,
  getRepoWithSparse,
  createBranch,
  commitAndOpenPR
}