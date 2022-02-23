
import { container } from 'tsyringe';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';
import IStorageProvider from './models/IStorageProvider';

import uploadConfig from '@config/upload'
const provider = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  provider[uploadConfig.driver],
)
