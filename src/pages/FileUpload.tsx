import React, { useState, useRef } from 'react'
import toast from 'react-hot-toast'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: Date
}

const FileUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return
    
    setUploading(true)
    const fileArray = Array.from(files)
    
    // Simulate upload delay
    setTimeout(() => {
      const newFiles: UploadedFile[] = fileArray.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date()
      }))
      
      setUploadedFiles(prev => [...prev, ...newFiles])
      setUploading(false)
      toast.success(`${fileArray.length} file(s) uploaded successfully!`)
    }, 1000)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
    toast.success('File removed successfully!')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="section">
      <h1>File Upload Testing</h1>
      <p>This page demonstrates file upload functionality with drag-and-drop and file selection.</p>

      <div className="grid">
        <div className="item">
          <h3>Drag & Drop Upload</h3>
          <div
            className={`file-upload ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              borderColor: isDragOver ? '#646cff' : '#ddd',
              background: isDragOver ? '#f0f8ff' : 'transparent'
            }}
            data-testid="drag-drop-area"
          >
            {uploading ? (
              <div>
                <div className="loading"></div>
                <p>Uploading files...</p>
              </div>
            ) : (
              <div>
                <p>📁 Drag and drop files here</p>
                <p>or click to select files</p>
              </div>
            )}
          </div>
        </div>

        <div className="item">
          <h3>File Selection</h3>
          <p>Use the button below to select files manually.</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
            data-testid="file-input"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            data-testid="select-files-button"
          >
            Select Files
          </button>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="section">
          <h3>Uploaded Files ({uploadedFiles.length})</h3>
          <div className="grid">
            {uploadedFiles.map(file => (
              <div key={file.id} className="item" data-testid={`file-${file.id}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4>{file.name}</h4>
                    <p>Size: {formatFileSize(file.size)}</p>
                    <p>Type: {file.type || 'Unknown'}</p>
                    <p>Uploaded: {file.uploadedAt.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    style={{ background: '#e74c3c', padding: '0.5rem' }}
                    data-testid={`remove-file-${file.id}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="section">
        <h3>File Upload Features</h3>
        <ul>
          <li><strong>Drag & Drop:</strong> Drag files directly onto the upload area</li>
          <li><strong>File Selection:</strong> Click to open file picker dialog</li>
          <li><strong>Multiple Files:</strong> Upload multiple files at once</li>
          <li><strong>File Information:</strong> Display file name, size, type, and upload time</li>
          <li><strong>File Removal:</strong> Remove uploaded files individually</li>
          <li><strong>Upload Progress:</strong> Visual feedback during upload process</li>
        </ul>
      </div>
    </div>
  )
}

export default FileUpload 