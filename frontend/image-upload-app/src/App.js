import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      axios
        .post('YOUR_API_ENDPOINT', formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <center>
      <div>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className="image-preview" />
          ) : (
            <p>Drag and drop an image here, or click to select</p>
          )}
        </div>
        <button onClick={handleUpload} disabled={!selectedImage}>
          Upload Image
        </button>
    </div>
    </center>
  );
}

export default App;
