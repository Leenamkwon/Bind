import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

export default function PhotoDropzone({ setImage }) {
  return (
    <DropzoneArea
      clearOnUnmount={true}
      filesLimit={1}
      acceptedFiles={['image/*']}
      dropzoneText={'이미지를 드래그 앤 드랍 또는 클릭하여 가져올 수 있어요.'}
      onChange={(files) => {
        const imgData = files.map((imgFile) => ({ ...imgFile, preview: window.URL.createObjectURL(imgFile) }));
        setImage(imgData);
      }}
      maxFileSize={3000000}
      showFileNamesInPreview={true}
    />
  );
}
