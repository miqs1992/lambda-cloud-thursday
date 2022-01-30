const Downloader = require('nodejs-file-downloader');

async function download(filename, path, url) {
	const downloader = new Downloader({
		url: url,
		directory: path,
		fileName: `${filename}`,
		cloneFiles: false 
	})
	try {
	    console.log('Downloading file...');
		await downloader.download();
		console.log(`File ${filename} downloaded successfully`);
	} catch (error) {
		console.log(`Download of ${filename} failed`, error)
	}
}

module.exports = { download };