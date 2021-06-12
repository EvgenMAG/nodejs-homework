const cloudinary = require('cloudinary').v2
const { promisify } = require('util')
require('dotenv').config()
cloudinary.config({
cloud_name: process.env.CLOUD_NAME_CLOUDINARY, 
  api_key: process.env.API_KEY_CLOUDINARY, 
  api_secret: process.env.API_SECRET_CLOUDINARY
})

const uploadCloud = promisify(cloudinary.uploader.upload)
class UploadService {
  
    async saveAvatar(pathFile, oldIdClaudAvatar) {
        const { public_id: idClaudAvatar, secure_url:avatarUrl  } = await uploadCloud(pathFile, {
            public_id: oldIdClaudAvatar?.replace('CloudAvatar/', ''),
            folder: 'CloudAvatar',
            transformation: {width: 250, height: 250, crop: "pad"}
        })
        return {idClaudAvatar, avatarUrl }
    }
}

module.exports = UploadService