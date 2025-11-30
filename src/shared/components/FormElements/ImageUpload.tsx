import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
} from 'react';

import Button from './Button';

import './ImageUpload.css';

type ImageUploadProps = {
  id: string;
  center?: boolean;
  errorText?: string;
  error?: string;
  onInput: (id: string, file: File | undefined, isValid: boolean) => void;
};


function ImageUpload(props: ImageUploadProps) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(false);

  const filePickerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        setPreviewUrl(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let pickedFile: File | undefined;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  return (
    <div className='form-control'>
      <input
        id={props.id}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg, .png, .jpeg'
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='Preview' />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.error}</p>}
    </div>
  );
}

export default ImageUpload;
