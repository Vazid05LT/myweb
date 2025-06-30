import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image, Download, RotateCw, ZoomIn, ZoomOut, Trash2, Camera } from 'lucide-react';

interface ImageData {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  type: string;
}

const ImageInjection: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [canvasImage, setCanvasImage] = useState<string>('');
  const [canvasRotation, setCanvasRotation] = useState(0);
  const [canvasZoom, setCanvasZoom] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState<ImageData | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Handle file selection
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData: ImageData = {
            id: Date.now().toString() + Math.random(),
            file,
            url: e.target?.result as string,
            name: file.name,
            size: file.size,
            type: file.type
          };
          setImages(prev => [...prev, imageData]);
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  // Canvas manipulation
  const loadImageToCanvas = useCallback((imageUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply transformations
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((canvasRotation * Math.PI) / 180);
      ctx.scale(canvasZoom, canvasZoom);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();
      
      setCanvasImage(canvas.toDataURL());
    };
    img.src = imageUrl;
  }, [canvasRotation, canvasZoom]);

  // Image operations
  const rotateImage = () => {
    setCanvasRotation(prev => prev + 90);
  };

  const zoomIn = () => {
    setCanvasZoom(prev => Math.min(prev + 0.1, 3));
  };

  const zoomOut = () => {
    setCanvasZoom(prev => Math.max(prev - 0.1, 0.1));
  };

  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'processed-image.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    if (selectedImage?.id === id) {
      setSelectedImage(null);
      setCanvasImage('');
    }
  };

  const openImageModal = (image: ImageData) => {
    setModalImage(image);
    setShowImageModal(true);
    
    // Get image dimensions
    const img = new window.Image();
    img.onload = () => {
      const dimensionsElement = document.querySelector('[data-testid="image-dimensions"]');
      if (dimensionsElement) {
        dimensionsElement.textContent = `${img.width} × ${img.height} pixels`;
      }
    };
    img.src = image.url;
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setModalImage(null);
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  // Simulate image processing
  const processImage = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Simulate processing steps
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }
    
    setIsProcessing(false);
    setUploadProgress(100);
  };

  // Generate test images
  const generateTestImages = () => {
    const testImages = [
      { name: 'Test Image 1', width: 300, height: 200, color: '#ff6b6b' },
      { name: 'Test Image 2', width: 400, height: 300, color: '#4ecdc4' },
      { name: 'Test Image 3', width: 250, height: 250, color: '#45b7d1' }
    ];

    testImages.forEach((testImg, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = testImg.width;
      canvas.height = testImg.height;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.fillStyle = testImg.color;
        ctx.fillRect(0, 0, testImg.width, testImg.height);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(testImg.name, testImg.width / 2, testImg.height / 2);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `${testImg.name}.png`, { type: 'image/png' });
            const imageData: ImageData = {
              id: Date.now().toString() + index,
              file,
              url: canvas.toDataURL(),
              name: `${testImg.name}.png`,
              size: blob.size,
              type: 'image/png'
            };
            setImages(prev => [...prev, imageData]);
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4" data-testid="image-injection-title">
          Image Injection & Testing
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Test image upload, manipulation, and processing features. Perfect for testing file uploads, 
          drag & drop functionality, and image processing workflows.
        </p>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Drag & Drop Zone */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Image Upload</h2>
          
          <div
            ref={dropZoneRef}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            data-testid="drop-zone"
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag & drop images here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse files
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              data-testid="browse-button"
            >
              Browse Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              data-testid="file-input"
            />
          </div>

          {/* Generate Test Images */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Quick Test Images</h3>
            <button
              onClick={generateTestImages}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              data-testid="generate-test-images"
            >
              <Camera className="h-4 w-4" />
              Generate Test Images
            </button>
          </div>
        </div>

        {/* Image List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Uploaded Images</h2>
              {images.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {images.length} image{images.length !== 1 ? 's' : ''} uploaded
                </p>
              )}
            </div>
            {images.length > 0 && (
              <button
                onClick={toggleViewMode}
                className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                data-testid="toggle-view-mode"
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </button>
            )}
          </div>
          
          {images.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Image className="mx-auto h-12 w-12 mb-4" />
              <p>No images uploaded yet</p>
            </div>
          ) : (
            <div className={`space-y-3 max-h-96 overflow-y-auto ${
              viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : ''
            }`}>
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    selectedImage?.id === image.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${viewMode === 'grid' ? 'flex flex-col' : 'flex items-center gap-3'}`}
                  onClick={() => setSelectedImage(image)}
                  data-testid={`image-item-${image.id}`}
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <>
                      <div className="relative group">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-auto max-w-full object-contain rounded mb-2"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded flex items-center justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openImageModal(image);
                            }}
                            className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-2 py-1 rounded text-xs transition-opacity"
                            data-testid={`view-image-${image.id}`}
                          >
                            View
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate text-sm">{image.name}</p>
                        <p className="text-xs text-gray-500">
                          {(image.size / 1024).toFixed(1)} KB • {image.type}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(image.id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1 self-end"
                        data-testid={`remove-image-${image.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    // List View
                    <>
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-auto max-w-full object-contain rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{image.name}</p>
                        <p className="text-sm text-gray-500">
                          {(image.size / 1024).toFixed(1)} KB • {image.type}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageModal(image);
                          }}
                          className="text-blue-500 hover:text-blue-700 p-1"
                          data-testid={`view-image-${image.id}`}
                        >
                          <Image className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(image.id);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          data-testid={`remove-image-${image.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Canvas Editor */}
      {selectedImage && (
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Image Editor</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Original Image */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Original</h3>
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="w-full h-auto max-w-full object-contain rounded"
                data-testid="original-image"
              />
            </div>

            {/* Canvas */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Canvas Preview</h3>
              <div className="border rounded-lg p-2 bg-gray-50">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto max-w-full"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  data-testid="canvas-element"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 mb-2">Controls</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => loadImageToCanvas(selectedImage.url)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  data-testid="load-to-canvas"
                >
                  Load to Canvas
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={rotateImage}
                    className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
                    data-testid="rotate-button"
                  >
                    <RotateCw className="h-4 w-4" />
                    Rotate
                  </button>
                  <button
                    onClick={zoomIn}
                    className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
                    data-testid="zoom-in-button"
                  >
                    <ZoomIn className="h-4 w-4" />
                    Zoom In
                  </button>
                  <button
                    onClick={zoomOut}
                    className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
                    data-testid="zoom-out-button"
                  >
                    <ZoomOut className="h-4 w-4" />
                    Zoom Out
                  </button>
                </div>

                <button
                  onClick={downloadCanvas}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  data-testid="download-button"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>

                <button
                  onClick={processImage}
                  disabled={isProcessing}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  data-testid="process-button"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    'Process Image'
                  )}
                </button>

                {isProcessing && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                      data-testid="progress-bar"
                    ></div>
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>Rotation: {canvasRotation}°</p>
                <p>Zoom: {(canvasZoom * 100).toFixed(0)}%</p>
                {uploadProgress > 0 && <p>Progress: {uploadProgress}%</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testing Features */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Testing Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Drag & Drop</h3>
            <p className="text-sm text-gray-600">
              Test drag and drop functionality with various image formats
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">File Upload</h3>
            <p className="text-sm text-gray-600">
              Test file input and upload progress tracking
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Image Processing</h3>
            <p className="text-sm text-gray-600">
              Test canvas manipulation and image transformations
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Download</h3>
            <p className="text-sm text-gray-600">
              Test file download functionality
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Progress Tracking</h3>
            <p className="text-sm text-gray-600">
              Test progress bars and loading states
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-2">Error Handling</h3>
            <p className="text-sm text-gray-600">
              Test error scenarios and validation
            </p>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={closeImageModal}
          data-testid="image-modal"
        >
          <div 
            className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{modalImage.name}</h3>
              <button
                onClick={closeImageModal}
                className="text-gray-500 hover:text-gray-700 p-1"
                data-testid="close-image-modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <img
                src={modalImage.url}
                alt={modalImage.name}
                className="w-full h-auto max-h-[80vh] object-contain rounded"
                data-testid="modal-image"
              />
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>File Name:</strong> {modalImage.name}</p>
                <p><strong>File Size:</strong> {(modalImage.size / 1024).toFixed(1)} KB</p>
                <p><strong>File Type:</strong> {modalImage.type}</p>
                <p><strong>Dimensions:</strong> <span data-testid="image-dimensions">Loading...</span></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInjection; 