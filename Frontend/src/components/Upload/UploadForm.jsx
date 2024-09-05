import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UploadForm() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      console.log("before cloudinary req");
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/curiousdevs/image/upload',
        formData
      );

      console.log(response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  };


  const submitPost = async () => {
    try {
      const imageUrl = await uploadToCloudinary(file);

      const response = await axios.post(
        'http://localhost:3000/upload',
        {
          image: imageUrl,
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
