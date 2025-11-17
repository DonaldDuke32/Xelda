import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowRight, Lightbulb } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

interface Feature {
  id: string
  title: string
  description: string
  benefits: string[]
  cta: string
  visual: React.ReactNode
  newUser?: boolean
  userPlan?: 'free' | 'pro' | 'expert'
}

interface FeatureSpotlightProps {
  userPlan: 'free' | 'pro' | 'expert' | null
  isNewUser: boolean
  onDismiss: (featureId: string) => void
  onAction: (featureId: string) => void
}

const features: Feature[] = [
  {
    id: 'ai-chat',
    title: 'AI Chat Refinement',
    description: 'Fine-tune your designs with natural language. Just describe what you want to change!',
    benefits: [
      'Instant modifications with AI chat',
      'Natural language commands',
      'Real-time preview updates'
    ],
    cta: 'Try AI Chat',
    visual: (
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-4 h-32 flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-xs text-blue-800">💬 "Add more plants"</div>
          </div>
        </div>
      </div>
    ),
    newUser: true
  },
  {
    id: 'pro-upgrade',
    title: 'Unlimited Generations',
    description: 'Upgrade to Pro for unlimited AI generations and premium features.',
    benefits: [
      'Unlimited design generations',
      '1GB storage space',
      'Priority support',
      'Advanced AR features'
    ],
    cta: 'Upgrade to Pro',
    visual: (
      <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg p-4 h-32 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">∞</div>
          <div className="text-xs text-orange-800 mt-1">Unlimited</div>
        </div>
      </div>
    ),
    userPlan: 'free'
  },
  {
    id: 'style-fusion',
    title: 'Style Fusion Magic',
    description: 'Combine multiple design styles for unique, personalized spaces.',
    benefits: [
      'Mix 2+ styles intelligently',
      'AI-powered recommendations',
      'Unique design combinations'
    ],
    cta: 'Explore Fusion',
    visual: (
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4 h-32 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center gap-1 text-purple-600">
            <span className="text-sm">Modern</span>
            <span className="text-xs">+</span>
            <span className="text-sm">Cozy</span>
          </div>
          <div className="text-xs text-purple-800 mt-1">= Unique Style</div>
        </div>
      </div>
    )
  }
]

export const FeatureSpotlight: React.FC<FeatureSpotlightProps> = ({
  userPlan,
  isNewUser,
  onDismiss,
  onAction
}) => {
  const [currentFeature, setCurrentFeature] = useState<Feature | null>(null)
  const [dismissedFeatures, setDismissedFeatures] = useState<string[]>([])

  useEffect(() => {
    // Determine which features to show based on user state
    const relevantFeatures = features.filter(feature => {
      if (dismissedFeatures.includes(feature.id)) return false
      
      if (feature.newUser && !isNewUser) return false
      if (feature.userPlan && feature.userPlan !== userPlan) return false
      
      return true
    })

    if (relevantFeatures.length > 0 && !currentFeature) {
      // Show the first relevant feature after a much longer delay (or disable for now)
      const timer = setTimeout(() => {
        // Disabled for demo - too annoying
        // setCurrentFeature(relevantFeatures[0])
      }, 30000)
      return () => clearTimeout(timer)
    }
  }, [userPlan, isNewUser, dismissedFeatures, currentFeature])

  const handleDismiss = () => {
    if (currentFeature) {
      setDismissedFeatures(prev => [...prev, currentFeature.id])
      onDismiss(currentFeature.id)
      setCurrentFeature(null)
    }
  }

  const handleAction = () => {
    if (currentFeature) {
      onAction(currentFeature.id)
      setCurrentFeature(null)
    }
  }

  return (
    <AnimatePresence>
      {currentFeature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Card className="w-full max-w-lg bg-white/95 backdrop-blur-md shadow-2xl">
              <CardContent className="p-0">
                {/* Header */}
                <div className="relative bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-6 text-white">
                  <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{currentFeature.title}</h3>
                      <p className="text-white/80 text-sm">New Feature Spotlight</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Visual */}
                  <div className="mb-4">
                    {currentFeature.visual}
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      {currentFeature.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What you'll get:</h4>
                    <ul className="space-y-2">
                      {currentFeature.benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-sm text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleDismiss}
                      variant="outline"
                      className="flex-1"
                    >
                      Maybe Later
                    </Button>
                    <Button
                      onClick={handleAction}
                      variant="gradient"
                      className="flex-1"
                    >
                      <span>{currentFeature.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}