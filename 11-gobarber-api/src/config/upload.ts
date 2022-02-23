import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  uploadFolder: string;

  multer: {
    storage: StorageEngine
  }

  config: {
    disk: {}
    aws: {
      bucket: string;
      region: string;
    }
  }
}

export default {

  driver: process.env.STORAGE_DRIVER,
  // recebe informações da constante tmpFolder
  tmpFolder,
  uploadFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;
        return callback(null, filename);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: "mv-gobarber",
      region: 'us-east-1'
    }
  }

} as IUploadConfig;
