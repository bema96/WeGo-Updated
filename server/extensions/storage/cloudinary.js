import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export default {
  driver: 'cloudinary',
  init: () => {
    cloudinary.config({
      cloud_name: process.env.STORAGE_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.STORAGE_CLOUDINARY_API_KEY,
      api_secret: process.env.STORAGE_CLOUDINARY_API_SECRET,
    });

    return {
      async write(fileName, data) {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { public_id: fileName },
            (error, result) => {
              if (error) reject(error);
              else resolve({
                location: result.secure_url,
              });
            }
          );

          Readable.from(data).pipe(uploadStream);
        });
      },

      async delete(fileName) {
        await cloudinary.uploader.destroy(fileName);
      },
    };
  },
};
