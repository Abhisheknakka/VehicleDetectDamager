'use client'

import { DamageResult } from '../types/damage'

interface DamageReportProps {
  result: DamageResult
}

export default function DamageReport({ result }: DamageReportProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'minor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'moderate':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'major':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'minor':
        return '⚠️'
      case 'moderate':
        return '🚨'
      case 'major':
        return '💥'
      default:
        return 'ℹ️'
    }
  }

  const getDamageTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'scratch':
        return '🔪'
      case 'dent':
        return '🔨'
      case 'paint_damage':
        return '🎨'
      default:
        return '❓'
    }
  }

  if (result.error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Analysis Results
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-medium">Error occurred during analysis:</p>
          <p className="text-red-600 text-sm mt-1">{result.error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Analysis Results
      </h2>

      {/* Overall Result */}
      <div className={`mb-6 p-4 rounded-lg border ${
        result.damage_detected 
          ? 'bg-red-50 border-red-200' 
          : 'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {result.damage_detected ? '🚨' : '✅'}
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {result.damage_detected ? 'Damage Detected' : 'No Damage Found'}
            </h3>
            <p className="text-sm opacity-80">
              {result.message}
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {(result.similarity_score * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Similarity Score</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {result.damage_percentage.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Damage Area</div>
        </div>
      </div>

      {/* Damage Details */}
      {result.damage_detected && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">Damage Details</h3>
          
          {/* Severity */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">{getSeverityIcon(result.severity)}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(result.severity)}`}>
              {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
            </span>
          </div>

          {/* Damage Types */}
          {result.damage_types.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Types of Damage:</h4>
              <div className="flex flex-wrap gap-2">
                {result.damage_types.map((type, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    <span>{getDamageTypeIcon(type)}</span>
                    {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Damage Count */}
          <div className="text-sm text-gray-600">
            <span className="font-medium">Damage Count:</span> {result.damage_count} area(s) affected
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">Summary</h3>
        <p className="text-gray-700 leading-relaxed">
          {result.message}
        </p>
      </div>
    </div>
  )
}
