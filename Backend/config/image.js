const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

generatePhotoMulti = async (files) => {
	try {
		if ( !files ) 
            return;

		const promiseList = [];
        files.forEach(image => {
            promiseList.push( generateWEBP(image, 80, 480) );
        });
		await Promise.all(promiseList);
	} catch (error) {
		return error.message
	}
}

generateWEBP = (file) => {
    return new Promise(async ( resolve, reject ) => {
        const filename = file.filename.replace(/\.[^/.]+$/, '');
        const fileNameResult = `static/uploads/image/${filename}.webp`

        sharp.cache(false);
		await sharp(file.path)
            .webp({ quality: 100 })
            .toFile(fileNameResult);
        
        fs.unlinkSync(`${file.path}`);
		resolve();
    });
}

generateWEBPresize = (file, resizeW, resizeH) => {
    return new Promise(async ( resolve, reject ) => {
        const filename = file.filename.replace(/\.[^/.]+$/, '');
        const fileNameResult = `static/uploads/image/${filename}.webp`

        sharp.cache(false);
		await sharp(file.path)
            .resize(resizeW, resizeH, { fit:"inside"})
            .webp({ quality: 100 })
            .toFile(fileNameResult);
        
        fs.unlinkSync(`${file.path}`);
		resolve();
    });
}

checkType = ( mimetype ) => {
    const mimetypes = {
        'image/png': '.png',
        'image/gif': '.gif',
        'image/jpg': '.jpg',
        'image/jpeg': '.jpg'
    }
    return mimetypes[mimetype]
}

module.exports = ({ type, file}) => {
    if (file && file.length > 0) {
        return generatePhotoMulti(file)
    } else if( type == 'thumbnail' ) {
        return generateThumbnail(file)
    } else if( type == 'webp' ) {
        return generateWEBP(file)
    } else if( type == 'avatar' ) {
        return generateWEBPresize(file, resizeW = 300, resizeH = 300)
    } else if( type == 'logo' ) {
        return generateWEBPresize(file, resizeW = 150, resizeH = 150)
    }
};