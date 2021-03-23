import React, { useCallback, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export const PhotoCropper = React.memo(({ imagePreview }) => {
  const cropperRef = useRef(null);

  const onCrop = useCallback(() => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (cropper.getCroppedCanvas() === undefined) return;

    cropper
      .getCroppedCanvas({
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high',
      })
      ?.toBlob((blob) => {
        console.log(blob);
      });
  }, []);

  const debounce = useCallback((fn, ms, forceNow = true) => {
    let interval;
    return () => {
      if (interval && !forceNow) clearTimeout(interval);

      interval = setTimeout(() => {
        fn();
        if (forceNow) interval = null;
      }, ms);

      if (forceNow && !interval) fn();
    };
  }, []);

  return (
    <Cropper
      src={imagePreview || 'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg'}
      style={{ height: 400, width: '100%' }}
      zoomTo={0}
      initialAspectRatio={16 / 9}
      preview='.img-preview'
      viewMode={1}
      guides={false}
      minCropBoxHeight={200}
      minCropBoxWidth={200}
      background={false}
      responsive={true}
      autoCropArea={1}
      checkOrientation={false}
      crop={debounce(onCrop, 200, false)}
      ref={cropperRef}
    />
  );
});
