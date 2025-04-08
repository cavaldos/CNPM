

import React, { useState } from 'react';

import axios from 'axios';

const CLOUD_NAME = 'deo6kaqhj';


const uploadService = {
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'UploadImage'); // Cấu hình upload preset trong Cloudinary

    try {
      // Đảm bảo rằng bạn đang gọi đúng API và endpoint của Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      return { url: response.data.secure_url };

    } catch (err) {
      // throw new Error('Upload failed: ' + err.message);
      console.error('Upload failed:', err.response ? err.response.data : err.message);
      throw new Error('Upload failed: ' + (err.response ? err.response.data : err.message));
    }
  }
};

export default uploadService;