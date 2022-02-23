import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// formatação de nomes 65000b => 65kb
import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    /* Passado como parametro o nome do parametro recebido pelo back-end (file),
    o arquivo (uploadedFiles[0].file) e o nome do arquivo (uploadedFiles[0].name)
    */
    data.append('file', uploadedFiles[0].file, uploadedFiles[0].name);

    try {
      // faz a requisão para o back-end
      await api.post('/transactions/import', data);

      // Direciona para a pagina de listagem
      history.push('/');
    } catch (err) {
      console.log(err.response.error);
    }
  }

  /* Recebe como parametro um file e e adiciona no state (uploadedFiles) com
  a tipagem desejada pelo componente FileList
  Função também é passada como parametro para o componente Upload
  */
  function submitFile(files: File[]): void {
    const uploadFiles = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    setUploadedFiles(uploadFiles);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
