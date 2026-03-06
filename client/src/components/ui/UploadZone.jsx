// src/components/ui/UploadZone.jsx
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUploadCloud, FiCamera, FiImage } from 'react-icons/fi'
import { BsFillCameraFill } from 'react-icons/bs'

const UploadZone = ({ onFileSelect, isProcessing }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1,
    disabled: isProcessing
  })

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          {...getRootProps()}
          className={`
            relative overflow-hidden
            border-2 border-dashed rounded-3xl
            transition-all duration-300 cursor-pointer
            ${isDragActive 
              ? 'border-primary bg-primary/10 scale-105' 
              : 'border-muted hover:border-primary/50 hover:bg-primary/5'
            }
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} disabled={isProcessing} />
          
          <div className="p-12 text-center">
            <AnimatePresence mode="wait">
              {isDragActive ? (
                <motion.div
                  key="drag"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="space-y-4"
                >
                  <FiUploadCloud className="w-16 h-16 mx-auto text-primary" />
                  <p className="text-lg font-medium">Drop your image here</p>
                  <p className="text-sm text-foreground/60">Release to upload</p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="relative inline-block">
                    <FiImage className="w-16 h-16 mx-auto text-foreground/40" />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                    />
                  </div>
                  <p className="text-lg font-medium">
                    Drag & drop or <span className="text-primary">browse</span>
                  </p>
                  <p className="text-sm text-foreground/60">
                    Supports: JPG, PNG, GIF, BMP, WEBP
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />
        </div>
      </motion.div>

      {/* Camera button - Alternative input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-card-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-foreground/60">or</span>
          </div>
        </div>

        <button
          onClick={() => {/* Handle camera */}}
          disabled={isProcessing}
          className="mt-6 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-card hover:bg-card-hover border border-card-border transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <BsFillCameraFill className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
          <span className="font-medium">Use Camera</span>
        </button>
      </motion.div>
    </div>
  )
}

export default UploadZone