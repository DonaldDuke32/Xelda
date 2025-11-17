import React from 'react'

interface GenerationViewProps {
  originalImage: string
  generatedImage: string
  onSendMessage: (message: string) => void
  chatHistory: any[]
  isRefining: boolean
  selectedStyle: any
  onTryAnotherStyle: () => void
  originalFileName: string
  furnitureItems: any[]
  isAnalyzing: boolean
  inspirationFile?: any
  onAmbianceChange: (prompt: string) => void
  isChangingAmbiance: boolean
  onPublish: () => void
  onViewInAR: (itemName: string) => void
}

export const GenerationView: React.FC<GenerationViewProps> = (props) => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Design Generation Complete!</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Original</h3>
          <img src={props.originalImage} alt="Original" className="w-full rounded-lg" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Generated</h3>
          <img 
            src={`data:image/svg+xml;base64,${props.generatedImage}`} 
            alt="Generated" 
            className="w-full rounded-lg" 
          />
        </div>
      </div>
      <button 
        onClick={props.onTryAnotherStyle}
        className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
      >
        Try Another Style
      </button>
    </div>
  )
}