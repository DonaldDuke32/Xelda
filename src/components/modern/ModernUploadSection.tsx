import React, { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Image, 
  CheckCircle, 
  AlertCircle, 
  FileImage,
  Sparkles,
  Camera
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import type { UploadedFile } from '../../types'
import { cn } from '../../lib/utils'

interface ModernUploadSectionProps {
  onImageUpload: (file: UploadedFile) => void
}

const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string, name: string}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const dataUrl = reader.result as string
      const base64 = dataUrl.split(',')[1]
      resolve({ base64, mimeType: file.type, name: file.name })
    }
    reader.onerror = error => reject(error)
  })
}

export const ModernUploadSection: React.FC<ModernUploadSectionProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleFileChange = useCallback(async (files: FileList | null) => {
    if (!files || !files[0]) return

    const file = files[0]
    
    // Validate file
    if (!file.type.startsWith('image/')) {
      setUploadStatus('error')
      setErrorMessage('Please upload an image file')
      return
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus('error')
      setErrorMessage('File size must be less than 10MB')
      return
    }

    setUploadStatus('uploading')
    setUploadProgress(0)
    
    // Create preview
    const previewUrl = URL.createObjectURL(file)
    setPreviewImage(previewUrl)
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 20
      })
    }, 100)

    try {
      const uploadedFile = await fileToBase64(file)
      
      // Complete progress
      setUploadProgress(100)
      setTimeout(() => {
        setUploadStatus('success')
        onImageUpload(uploadedFile)
      }, 300)
      
    } catch (error) {
      clearInterval(progressInterval)
      setUploadStatus('error')
      setErrorMessage('Failed to process image')
      console.error('Upload error:', error)
    }
  }, [onImageUpload])

  const resetUpload = () => {
    setUploadStatus('idle')
    setUploadProgress(0)
    setErrorMessage('')
    setPreviewImage(null)
  }

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    handleFileChange(e.dataTransfer.files)
  }, [handleFileChange])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {uploadStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            key="success"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    Upload Successful!
                  </h3>
                  <p className="text-green-700 mb-6">
                    Your image is ready for transformation. Choose a style to begin.
                  </p>
                  
                  {previewImage && (
                    <div className="relative mb-6">
                      <img
                        src={previewImage}
                        alt="Uploaded preview"
                        className="w-full max-w-md mx-auto rounded-xl shadow-lg"
                      />
                    </div>
                  )}
                  
                  <Button onClick={resetUpload} variant="outline" className="mr-4">
                    Upload Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : uploadStatus === 'error' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            key="error"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-red-900 mb-2">
                    Upload Failed
                  </h3>
                  <p className="text-red-700 mb-6">
                    {errorMessage}
                  </p>
                  
                  <Button onClick={resetUpload} variant="outline">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : uploadStatus === 'uploading' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            key="uploading"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <Upload className="w-8 h-8 text-white animate-pulse" />
                    <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Processing Image...
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Analyzing your room photo
                  </p>
                  
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-sm text-gray-500">{Math.round(uploadProgress)}% complete</p>
                  </div>

                  {previewImage && (
                    <div className="mt-6 relative">
                      <img
                        src={previewImage}
                        alt="Upload preview"
                        className="w-full max-w-md mx-auto rounded-xl shadow-lg opacity-75"
                      />
                      <div className="absolute inset-0 bg-blue-500/10 rounded-xl animate-pulse"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            key="upload"
          >
            <Card
              className={cn(
                "transition-all duration-300 cursor-pointer group overflow-hidden",
                isDragging 
                  ? "border-orange-400 bg-orange-50/50 scale-105" 
                  : "border-gray-200 hover:border-orange-300 hover:bg-gray-50/50"
              )}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <CardContent className="p-12">
                <motion.div
                  animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
                  className="text-center"
                >
                  {/* Upload Icon */}
                  <div className="relative mb-6">
                    <div className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300",
                      isDragging 
                        ? "bg-gradient-to-br from-orange-400 to-pink-500" 
                        : "bg-gradient-to-br from-gray-400 to-gray-500 group-hover:from-orange-400 group-hover:to-pink-500"
                    )}>
                      {isDragging ? (
                        <FileImage className="w-10 h-10 text-white" />
                      ) : (
                        <Upload className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center float-animation">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -left-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center float-animation" style={{ animationDelay: '1s' }}>
                        <Camera className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {isDragging ? 'Drop your image here!' : 'Upload Your Room Photo'}
                    </h3>
                    
                    <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                      {isDragging 
                        ? 'Release to upload your image and start the transformation'
                        : 'Drag and drop your room photo here, or click to browse files'
                      }
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Image className="w-4 h-4" />
                        <span>JPG, PNG, WebP</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>Max 10MB</span>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>High quality recommended</span>
                    </div>
                  </div>

                  {/* Browse Button */}
                  <div className="mt-8">
                    <Button
                      variant="gradient"
                      size="lg"
                      className="relative overflow-hidden group shadow-lg"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Browse Files
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </Button>
                  </div>

                  {/* Hidden file input */}
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => handleFileChange(e.target.files)}
                    className="hidden"
                  />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      {uploadStatus === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-blue-50/50 border-blue-200">
            <CardContent className="p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Pro Tips for Best Results
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Take photos in good lighting for better AI analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Include the entire room for comprehensive redesign</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Higher resolution images yield better quality results</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}