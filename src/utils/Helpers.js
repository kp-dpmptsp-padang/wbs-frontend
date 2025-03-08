// src/utils/Helpers.js
// Generate a random string
export const generateRandomString = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
  // Delay function for simulating API calls during development
  export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Truncate text with ellipsis if it exceeds the specified length
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  // Convert file size to human-readable format
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Check file type by extension
  export const getFileType = (filename) => {
    if (!filename) return 'unknown';
    
    const extension = filename.split('.').pop().toLowerCase();
    
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
    const documentTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];
    const videoTypes = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'];
    
    if (imageTypes.includes(extension)) return 'image';
    if (documentTypes.includes(extension)) return 'document';
    if (videoTypes.includes(extension)) return 'video';
    
    return 'unknown';
};