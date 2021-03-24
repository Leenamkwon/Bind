import React, { memo } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

export default memo(function PhotoDropzone({ setImage }) {
  return (
    <DropzoneArea
      clearOnUnmount={true}
      filesLimit={1}
      acceptedFiles={['image/jpg', 'image/png', 'image/jpeg']}
      dropzoneText={'이미지를 드래그 앤 드랍 또는 클릭하여 가져올 수 있어요.'}
      onChange={(files) => {
        const imgData = files.map((imgFile) => ({ ...imgFile, preview: window.URL.createObjectURL(imgFile) }));
        setImage(imgData);
      }}
      maxFileSize={3000000}
      showPreviews={true}
      showFileNames={true}
      getFileAddedMessage={(fileName) => `이미지 ${fileName}가 추가되었습니다.`}
      getFileLimitExceedMessage={(filesLimit) => `허용된 용량을 초과하였습니다. ${filesLimit} 이하만 가능합니다`}
      getFileRemovedMessage={(fileName) => `파일 ${fileName}가 제거되었습니다.`}
    />
  );
});
