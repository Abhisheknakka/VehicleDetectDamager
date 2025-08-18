'use client'

import { useState, useEffect } from 'react'
import ImageUploader from '../components/ImageUploader'
import DamageReport from '../components/DamageReport'
import { DamageResult } from '../types/damage'

export default function Home() {
  const [beforeImage, setBeforeImage] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [damageResult, setDamageResult] = useState<DamageResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')

  // Check backend connection on component mount
  useEffect(() => {
    checkBackendConnection()
  }, [])

  const checkBackendConnection = async () => {
    try {
      const response = await fetch('/api/health')
      if (response.ok) {
        setBackendStatus('connected')
      } else {
        setBackendStatus('disconnected')
      }
    } catch (err) {
      console.error('Backend connection check failed:', err)
      setBackendStatus('disconnected')
    }
  }

  const handleAnalysis = async () => {
    if (!beforeImage || !afterImage) {
      setError('Please upload both images before analyzing')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setDamageResult(null)

    try {
      // Extract base64 data from the data URLs
      const beforeBase64 = beforeImage.split(',')[1]
      const afterBase64 = afterImage.split(',')[1]

      const formData = new FormData()
      formData.append('before_image', beforeBase64)
      formData.append('after_image', afterBase64)

      const response = await fetch('/api/detect-damage', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to analyze images: ${errorText}`)
      }

      const result = await response.json()
      setDamageResult(result)
    } catch (err) {
      console.error('Analysis error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetImages = () => {
    setBeforeImage(null)
    setAfterImage(null)
    setDamageResult(null)
    setError(null)
  }

  const canAnalyze = beforeImage && afterImage && !isAnalyzing

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vehicle Damage Detector
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Upload before and after images of a vehicle to detect damage, scratches, dents, and other changes.
          </p>
          
          {/* Backend Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium">
            <div className={`w-2 h-2 rounded-full ${
              backendStatus === 'connected' ? 'bg-green-500' : 
              backendStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className={
              backendStatus === 'connected' ? 'text-green-700' : 
              backendStatus === 'disconnected' ? 'text-red-700' : 'text-yellow-700'
            }>
              Backend: {backendStatus === 'connected' ? 'Connected' : 
                       backendStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
            </span>
            {backendStatus === 'disconnected' && (
              <button 
                onClick={checkBackendConnection}
                className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
              >
                Retry
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Upload */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Upload Images
              </h2>
              
              <div className="space-y-4">
                <ImageUploader
                  label="Before Image"
                  image={beforeImage}
                  onImageChange={setBeforeImage}
                  placeholder="Upload the original vehicle image"
                />
                
                <ImageUploader
                  label="After Image"
                  image={afterImage}
                  onImageChange={setAfterImage}
                  placeholder="Upload the current vehicle image"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAnalysis}
                  disabled={!canAnalyze}
                  className="btn-primary flex-1"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Detect Damage'}
                </button>
                
                <button
                  onClick={resetImages}
                  className="btn-secondary"
                >
                  Reset
                </button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {damageResult && (
              <DamageReport result={damageResult} />
            )}
            
            {!damageResult && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Analysis Results
                </h2>
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p>Upload two images and click "Detect Damage" to analyze</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📋 How to Use
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <p className="font-medium mb-2">1. Upload Before Image:</p>
              <p>• Take a photo of the vehicle in good condition</p>
              <p>• Ensure good lighting and clear visibility</p>
              <p>• Include the entire vehicle or specific area</p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Upload After Image:</p>
              <p>• Take a photo from the same angle</p>
              <p>• Maintain similar lighting conditions</p>
              <p>• Focus on the area you suspect has damage</p>
            </div>
          </div>
        </div>

        {/* Debug Information */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">🔧 Debug Information</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Frontend URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Unknown'}</p>
            <p><strong>Backend URL:</strong> http://localhost:8000</p>
            <p><strong>API Endpoint:</strong> /api/detect-damage</p>
            <p><strong>Backend Status:</strong> {backendStatus}</p>
            <p><strong>Next.js Config:</strong> Proxy enabled for /api/* → http://localhost:8000/api/*</p>
          </div>
        </div>
      </div>
    </div>
  )
}
