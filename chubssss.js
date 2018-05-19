// Libaries.
const NodeID3 = require('node-id3');
const fs = require('fs');

// Constants.
const songsDir = './songs/';
const fileExtension = '.mp3';

fs.readdir(songsDir, (err, arrOfFileName) => {
	if (err) {
		console.log(err);
		return;
	}

	let counter = 1;

	arrOfFileName.forEach(fileName => {
		const filePath = songsDir + fileName; // Full directory to song file.
		const songId3Tag = createId3Tag(fileName);	// JSON object of ID3 tags.

		// Write ID3 tags to song file.
		const success = NodeID3.write(songId3Tag, filePath);
		console.log(`Song #${counter} status: ${success ? 'Success' : 'Failed'}`);

		// String of the new song file name.
		const newSongsDir = songsDir + songId3Tag.title + fileExtension;

		// Rename the file.
		fs.rename(filePath, newSongsDir, (err) => {
			if (err) {
			 console.log(err);
			};
		});

		counter++;
	});
  })	

 /**
  * Function to parse out all the information given in file name.
  * @param { String } songFileName.
  * @returns { Object } JSON of the parsed information with ID3 specification.
  * E.G { artist: '', title: '' }
  */
function createId3Tag(songFileName) {
	const delimitedFileName = songFileName.split('-');
	const songTitleWithoutExtension = delimitedFileName[1].trim().split('.')[0];

	// Create JSON with ID3 specs.
	const fileInfoJson = {
		artist: delimitedFileName[0].trim(),
		title: songTitleWithoutExtension
	};

	return fileInfoJson;
}
