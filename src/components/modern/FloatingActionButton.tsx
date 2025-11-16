import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Sparkles, 
  Upload, 
  Palette, 
  MessageSquare,
  ArrowUp,
  HelpCircle,
  Zap
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { cn } from '../../lib/utils'

interface FloatingActionButtonProps {
  onNewDesign: () => void
  onHelp: () => void
  currentStep: string
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onNewDesign,
  onHelp,
  currentStep
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const fabActions = [
    {
      icon: Upload,
      label: 'New Design',
      action: onNewDesign,
      color: 'from-orange-500 to-pink-500'
    },
    {
      icon: Sparkles,
      label: 'Quick Generate',
      action: () => {},
      color: 'from-purple-500 to-blue-500'
    },
    {
      icon: HelpCircle,
      label: 'Get Help',
      action: onHelp,
      color: 'from-green-500 to-teal-500'
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <Button
              onClick={scrollToTop}
              size="sm"
              variant="outline"
              className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-3"
          >
            {fabActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
                    <CardContent className="px-3 py-2">
                      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        {action.label}
                      </span>
                    </CardContent>
                  </Card>
                  
                  <Button
                    onClick={() => {
                      action.action()
                      setIsOpen(false)
                    }}
                    className={cn(
                      "h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r",
                      action.color
                    )}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <Plus className="w-6 h-6 text-white" /> : <Zap className="w-6 h-6 text-white" />}
          </motion.div>
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 animate-ping opacity-20"></div>
        </Button>
      </motion.div>
    </div>
  )
}