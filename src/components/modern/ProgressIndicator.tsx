import React from 'react'
import { motion } from 'framer-motion'
import { Check, Upload, Palette, Sparkles, Download } from 'lucide-react'
import { cn } from '../../lib/utils'

interface Step {
  id: string
  label: string
  icon: React.ElementType
  description: string
}

interface ProgressIndicatorProps {
  currentStep: string
  completedSteps: string[]
}

const steps: Step[] = [
  {
    id: 'upload',
    label: 'Upload',
    icon: Upload,
    description: 'Upload your room photo'
  },
  {
    id: 'style',
    label: 'Style',
    icon: Palette,
    description: 'Choose design style'
  },
  {
    id: 'generate',
    label: 'Generate',
    icon: Sparkles,
    description: 'AI creates design'
  },
  {
    id: 'result',
    label: 'Result',
    icon: Download,
    description: 'Download & share'
  }
]

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  completedSteps
}) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 transform -translate-y-1/2"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        
        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = step.id === currentStep
            const isUpcoming = index > currentIndex
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 mb-2",
                    isCompleted
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white"
                      : isCurrent
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 border-orange-500 text-white"
                      : isUpcoming
                      ? "bg-gray-100 border-gray-300 text-gray-400"
                      : "bg-white border-gray-300 text-gray-500"
                  )}
                  whileHover={{ scale: 1.1 }}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: isCurrent ? Infinity : 0, duration: 2 }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </motion.div>
                
                {/* Step Label */}
                <div className="text-center">
                  <div className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isCompleted || isCurrent ? "text-gray-900" : "text-gray-500"
                  )}>
                    {step.label}
                  </div>
                  <div className={cn(
                    "text-xs mt-1 transition-colors duration-300 max-w-20",
                    isCompleted || isCurrent ? "text-gray-600" : "text-gray-400"
                  )}>
                    {step.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}