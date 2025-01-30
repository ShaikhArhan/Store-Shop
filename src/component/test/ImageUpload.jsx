import React, { useState } from 'react';
import Compressor from 'compressorjs';

const ImageToBase64 = () => {
  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Compress the image with moderate settings for balance
      new Compressor(file, {
        quality: 0.6, // Moderate quality for decent balance between size and quality
        maxWidth: 300, // Resize the image to a moderate width (300px)
        maxHeight: 300, // Resize the image to a moderate height (300px)
        mimeType: 'image/webp', // Use WebP format for better compression
        success(result) {
          // Convert the compressed image to base64
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            console.log(base64String); // Log the base64 string (smaller size, decent quality)
            setDisplayImage(base64String);
          };
          reader.readAsDataURL(result); // Convert the image to base64
        },
        error(err) {
          console.error(err);
        }
      });
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {displayImage && (
        <img
          src={displayImage}
          alt="Preview"
          style={{ width: '300px', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default ImageToBase64;
