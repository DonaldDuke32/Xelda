import React from 'react'

interface InspirationPromptProps {
  onInspirationSelect: (file: any) => void
}

export const InspirationPrompt: React.FC<InspirationPromptProps> = ({ onInspirationSelect }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Add Inspiration (Optional)</h3>
        <p className="text-gray-600 mb-6">
          Upload an inspiration image to extract colors and mood, or skip to use the default style.
        </p>
        <div className="flex gap-3">
          <button 
            onClick={() => onInspirationSelect(null)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Skip
          </button>
          <button 
            onClick={() => {
              // Would open file picker in real implementation
              onInspirationSelect(null)
            }}
            className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Add Inspiration
          </button>
        </div>
      </div>
    </div>
  )
}