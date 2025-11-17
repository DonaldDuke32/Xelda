import React from 'react'

interface ARViewModalProps {
  isOpen: boolean
  onClose: () => void
  itemName: string
}

export const ARViewModal: React.FC<ARViewModalProps> = ({ isOpen, onClose, itemName }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">AR View: {itemName}</h3>
        <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-6">
          <p className="text-gray-500">AR View Simulation</p>
        </div>
        <button 
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  )
}