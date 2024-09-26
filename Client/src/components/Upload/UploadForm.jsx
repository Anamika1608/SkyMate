import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UploadForm() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/curiousdevs/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  };

  const submitPost = async () => {
    if (!file || !caption) {
      alert('Please select an image and add a caption');
      return;
    }

    setIsUploading(true);
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
      alert('Failed to upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-[#eded8c] rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center">Share Your Moment</h2>
        
        <div className="mb-6">
          <label htmlFor="file-upload" className="flex flex-col items-center px-4 py-6 bg-teal-50 text-teal-700 rounded-lg shadow-inner cursor-pointer hover:bg-teal-100 transition duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="mt-2 text-base leading-normal">Select an image</span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".png, .jpg, .jpeg, .webp, .svg"
              onChange={handleChange}
            />
          </label>
        </div>

        {previewUrl && (
          <div className="mb-6">
            <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
          <textarea
            id="caption"
            rows="3"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-teal-500 resize-none"
            placeholder="Share your thoughts..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={submitPost}
          disabled={isUploading}
          className={`w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-lg 
                      ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'} 
                      transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50`}
        >
          {isUploading ? 'Uploading...' : 'Share Post'}
        </button>
      </div>
    </div>
  );
}

export default UploadForm;