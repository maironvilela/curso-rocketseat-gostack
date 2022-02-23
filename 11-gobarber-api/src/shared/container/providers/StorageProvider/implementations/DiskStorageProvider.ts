import IStorageProvider from "../models/IStorageProvider";
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    //remove o arquivo do diretorio temp para temp/upload
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file)
    );
    return file;
  }
  public async deleteFile(file: string): Promise<void> {
    //caminho do arquivo
    const filePath = path.resolve(uploadConfig.uploadFolder, file)


    //verifica se o arquivo existe, caso na existi retorna um exceção
    try {
      await fs.promises.stat(filePath)
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

}

export default DiskStorageProvider;
