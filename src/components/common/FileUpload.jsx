import React, { useState, useRef, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

const FileUpload = forwardRef(({
  id,
  url = '/upload',
  maxFileSize = 2, // MB
  multiple = false,
  accept,
  onStart,
  onProgress,
  onSuccess,
  onError,
  onRemove,
  customExtensions = {},
  uploadText = 'Drop your file here or',
  browseText = 'browse',
  sizeDescription = `Pick a file up to ${maxFileSize}MB.`,
  className = '',
  previewClassName = '',
  uploadClassName = '',
  progressClassName = '',
  disabled = false,
  autoUpload = true,
  showPreview = true,
  ...rest
}, ref) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);
  const previewsRef = useRef(null);
  const uploadId = id || `file-upload-${Math.random().toString(36).substring(2, 10)}`;
  const combinedRef = ref || fileInputRef;
  
  // Default file type icons
  const defaultExtensions = {
    default: {
      icon: (
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
          <path d="M10 9H8"></path>
        </svg>
      ),
      class: "shrink-0 size-5"
    },
    pdf: {
      icon: (
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M5 15h14"></path>
          <path d="M5 11h14"></path>
        </svg>
      ),
      class: "shrink-0 size-5 text-red-500"
    },
    doc: {
      icon: (
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
          <path d="M10 9H8"></path>
        </svg>
      ),
      class: "shrink-0 size-5 text-blue-500"
    },
    image: {
      icon: (
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
      ),
      class: "shrink-0 size-5 text-green-500"
    },
    xls: {
      icon: (
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="m8 13 2 2 6-6"></path>
        </svg>
      ),
      class: "shrink-0 size-5 text-green-600"
    },
    zip: {
      icon: (
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="m16 16-2-2 4-4-4-4 2-2 6 6z"></path>
          <path d="M8 8 6 6l4-4 4 4-2 2-4-4z"></path>
        </svg>
      ),
      class: "shrink-0 size-5 text-yellow-500"
    },
    csv: {
      icon: (
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="m5 12-3 3 3 3"></path>
          <path d="m9 18 3-3-3-3"></path>
        </svg>
      ),
      class: "shrink-0 size-5 text-blue-400"
    }
  };

  // Merge default extensions with custom extensions
  const extensionsConfig = { ...defaultExtensions, ...customExtensions };
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get file extension
  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };
  
  // Get icon for file type
  const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
    const docExtensions = ['doc', 'docx', 'rtf'];
    
    if (imageExtensions.includes(ext)) {
      return extensionsConfig.image || extensionsConfig.default;
    } else if (ext === 'pdf') {
      return extensionsConfig.pdf || extensionsConfig.default;
    } else if (docExtensions.includes(ext)) {
      return extensionsConfig.doc || extensionsConfig.default;
    } else if (['xls', 'xlsx'].includes(ext)) {
      return extensionsConfig.xls || extensionsConfig.default;
    } else if (['zip', 'rar', '7z'].includes(ext)) {
      return extensionsConfig.zip || extensionsConfig.default;
    } else if (ext === 'csv') {
      return extensionsConfig.csv || extensionsConfig.default;
    }
    
    return extensionsConfig.default;
  };
  
  // Create file object with additional properties
  const createFileObject = (file) => {
    const id = Math.random().toString(36).substring(2, 10);
    const extension = getFileExtension(file.name);
    const icon = getFileIcon(file.name);
    
    return {
      id,
      file,
      name: file.name,
      size: file.size,
      extension,
      progress: 0,
      uploaded: false,
      error: null,
      icon
    };
  };
  
  // Handle file selection
  const handleFileSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const selectedFiles = e.target.files || e.dataTransfer.files;
    if (!selectedFiles.length) return;
    
    const newFiles = Array.from(selectedFiles).map(createFileObject);
    
    // Filter files that are too large
    const validFiles = newFiles.filter(fileObj => {
      const isValid = fileObj.size <= maxFileSize * 1024 * 1024;
      if (!isValid) {
        fileObj.error = `File size exceeds ${maxFileSize}MB limit`;
        if (onError) onError(fileObj, 'size');
      }
      return isValid;
    });
    
    if (multiple) {
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
      if (autoUpload) validFiles.forEach(fileObj => uploadFile(fileObj));
    } else {
      setFiles(validFiles);
      if (autoUpload && validFiles.length > 0) uploadFile(validFiles[0]);
    }
  };
  
  // Upload file
  const uploadFile = (fileObj) => {
    if (fileObj.uploaded || fileObj.error) return;
    
    const formData = new FormData();
    formData.append('file', fileObj.file);
    
    // Create XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    
    // Track upload progress
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = Math.round((e.loaded / e.total) * 100);
        updateFileProgress(fileObj.id, progress);
        if (onProgress) onProgress(fileObj, progress);
      }
    };
    
    // Handle response
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        updateFileStatus(fileObj.id, true);
        if (onSuccess) onSuccess(fileObj, xhr.response);
      } else {
        updateFileError(fileObj.id, 'Upload failed');
        if (onError) onError(fileObj, 'server', xhr.statusText);
      }
    };
    
    // Handle error
    xhr.onerror = () => {
      updateFileError(fileObj.id, 'Network error');
      if (onError) onError(fileObj, 'network');
    };
    
    // Send the upload
    xhr.send(formData);
    if (onStart) onStart(fileObj);
  };
  
  // Update file progress
  const updateFileProgress = (id, progress) => {
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.id === id ? { ...f, progress } : f
      )
    );
  };
  
  // Update file status
  const updateFileStatus = (id, uploaded) => {
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.id === id ? { ...f, uploaded, progress: 100 } : f
      )
    );
  };
  
  // Update file error
  const updateFileError = (id, error) => {
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.id === id ? { ...f, error } : f
      )
    );
  };
  
  // Remove file
  const removeFile = (id) => {
    const fileToRemove = files.find(f => f.id === id);
    setFiles(prevFiles => prevFiles.filter(f => f.id !== id));
    if (onRemove && fileToRemove) onRemove(fileToRemove);
  };
  
  // Handle drag events
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;
    
    const highlight = () => {
      dropArea.classList.add('border-primary');
    };
    
    const unhighlight = () => {
      dropArea.classList.remove('border-primary');
    };
    
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      unhighlight();
      handleFileSelect(e);
    };
    
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    dropArea.addEventListener('drop', handleDrop, false);
    
    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.removeEventListener(eventName, preventDefaults, false);
      });
      
      ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.removeEventListener(eventName, highlight, false);
      });
      
      ['dragleave', 'drop'].forEach(eventName => {
        dropArea.removeEventListener(eventName, unhighlight, false);
      });
      
      dropArea.removeEventListener('drop', handleDrop, false);
    };
  }, []);
  
  // Trigger file browser when clicking the dropzone
  const openFileBrowser = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };
  
  // File preview component
  const FilePreviewItem = ({ fileObj }) => {
    const { id, name, size, extension, progress, uploaded, error, icon } = fileObj;
    const fileNameWithoutExt = name.substring(0, name.lastIndexOf('.')) || name;
    
    return (
      <div className={`p-3 bg-white border border-solid ${error ? 'border-red-300' : 'border-gray-300'} rounded-xl ${previewClassName}`}>
        <div className="mb-1 flex justify-between items-center">
          <div className="flex items-center gap-x-3">
            <span className="size-10 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg">
              {icon.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-gray-800">
                <span className="truncate inline-block max-w-75 align-bottom">
                  {fileNameWithoutExt}
                </span>.<span>{extension}</span>
              </p>
              <p className="text-xs text-gray-500">{formatFileSize(size)}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800"
              onClick={() => removeFile(id)}
              aria-label="Remove file"
            >
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" x2="10" y1="11" y2="17"></line>
                <line x1="14" x2="14" y1="11" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>

        {error ? (
          <div className="mt-1 text-xs text-red-500">{error}</div>
        ) : (
          <div className="flex items-center gap-x-3 whitespace-nowrap">
            <div className={`flex w-full h-2 bg-gray-200 rounded-full overflow-hidden ${progressClassName}`} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
              <div 
                className={`flex flex-col justify-center rounded-full overflow-hidden ${uploaded ? 'bg-success' : 'bg-primary'} text-xs text-white text-center whitespace-nowrap transition-all duration-500`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800">
                {progress}%
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={`file-upload-component ${className}`} id={uploadId} {...rest}>
      {/* Hidden file input */}
      <input
        ref={combinedRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
      />
      
      {/* Drop area */}
      <div 
        ref={dropAreaRef}
        className={`cursor-pointer p-12 flex justify-center bg-white border border-dashed border-gray-300 rounded-xl transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'} ${uploadClassName}`}
        onClick={openFileBrowser}
      >
        <div className="text-center">
          <span className="inline-flex justify-center items-center size-16 bg-gray-100 text-gray-800 rounded-full">
            <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
          </span>

          <div className="mt-4 flex flex-wrap justify-center text-sm/6 text-gray-600">
            <span className="pe-1 font-medium text-gray-800">
              {uploadText}
            </span>
            <span className="bg-white font-semibold text-primary hover:text-primary-dark rounded-lg decoration-2 hover:underline focus-within:outline-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
              {browseText}
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-400">
            {sizeDescription}
          </p>
        </div>
      </div>

      {/* File previews */}
      {showPreview && (
        <div ref={previewsRef} className="mt-4 space-y-2 empty:mt-0">
          {files.map(fileObj => (
            <FilePreviewItem key={fileObj.id} fileObj={fileObj} />
          ))}
        </div>
      )}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';

FileUpload.propTypes = {
  /** Component ID */
  id: PropTypes.string,
  /** Upload URL endpoint */
  url: PropTypes.string,
  /** Maximum file size in MB */
  maxFileSize: PropTypes.number,
  /** Whether to allow multiple file selection */
  multiple: PropTypes.bool,
  /** Accepted file types */
  accept: PropTypes.string,
  /** Callback when upload starts */
  onStart: PropTypes.func,
  /** Callback during upload progress */
  onProgress: PropTypes.func,
  /** Callback when upload succeeds */
  onSuccess: PropTypes.func,
  /** Callback when upload fails */
  onError: PropTypes.func,
  /** Callback when a file is removed */
  onRemove: PropTypes.func,
  /** Custom extensions configuration */
  customExtensions: PropTypes.object,
  /** Text for upload area */
  uploadText: PropTypes.string,
  /** Text for browse button */
  browseText: PropTypes.string,
  /** Text for file size description */
  sizeDescription: PropTypes.string,
  /** Additional CSS class */
  className: PropTypes.string,
  /** CSS class for preview items */
  previewClassName: PropTypes.string,
  /** CSS class for upload area */
  uploadClassName: PropTypes.string,
  /** CSS class for progress bar */
  progressClassName: PropTypes.string,
  /** Whether the component is disabled */
  disabled: PropTypes.bool,
  /** Whether to automatically upload files when selected */
  autoUpload: PropTypes.bool,
  /** Whether to show file previews */
  showPreview: PropTypes.bool,
};

export default FileUpload;