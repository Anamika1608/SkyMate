import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function UploadForm() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [url, setUrl] = useState({ image: '' }); 

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const Base64 = await convertToBase64(file);
    setUrl((prevUrl) => ({ ...prevUrl, image: Base64 }));
  };

  const submitPost = async () => {
    try {
      console.log('Submitting post with URL:', url);
      const response = await axios.post(
        'http://localhost:3000/upload',
        {
          image: url.image, 
          caption,
        },
        {
          withCredentials: true,
        }
      );
      if (response) {
        console.log('Upload successful');
        navigate('/weather-gallery');
      }
    } catch (error) {
      console.log('Error during submission:', error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="file"
          name="myFile"
          accept=".png, .jpg, .jpeg"
          onChange={handleChange}
        />
      </div>

      <input
        type="text"
        id="caption"
        name="caption"
        value={caption}
        placeholder="Enter caption"
        onChange={(e) => setCaption(e.target.value)}
      />

      <button onClick={submitPost}>Submit</button>
    </div>
  );
}

export default UploadForm;
