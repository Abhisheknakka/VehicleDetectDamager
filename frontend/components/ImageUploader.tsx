'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploaderProps {
  label: string
  image: string | null
  onImageChange: (image: string | null) => void
  placeholder: string
}

export default function ImageUploader({ label, image, onImageChange, placeholder }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB')
        return
      }
      
      const reader = new FileReader()
      reader.onload = () => {
        onImageChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [onImageChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp']
    },
    multiple: false,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    onDropAccepted: () => setIsDragOver(false),
  })

  const removeImage = () => {
    onImageChange(null)
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {!image ? (
        <div
          {...getRootProps()}
          className={`image-upload-zone ${isDragActive || isDragOver ? 'dragover' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <div className="text-4xl text-gray-400">📷</div>
            <p className="text-gray-600 font-medium">
              {isDragActive ? 'Drop the image here' : 'Click to upload or drag & drop'}
            </p>
            <p className="text-sm text-gray-500">{placeholder}</p>
            <p className="text-xs text-gray-400">
              Supports: JPG, PNG, GIF, BMP (Max: 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={image}
            alt={label}
            className="image-preview"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors"
            title="Remove image"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
