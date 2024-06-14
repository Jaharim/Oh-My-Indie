import React, { useRef, useState, useEffect } from 'react';

import Button from '../../shared/components/UIElements/Button';
//import previewIcon from '/icon-img.svg';
import './ImageUpload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState('/icon-img.svg');
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    event.preventDefault();
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files || event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    if (props.mode) {
      props.checkEditImg();
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className='image-input__container'>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <div className='image-input__form'>
        <div className='image-input__form-img'>
          <img src={previewUrl} alt='미리보기' />
        </div>
        <Button
          className='image-input__form-button'
          type='button'
          onClick={pickImageHandler}
        >
          이미지 선택
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
