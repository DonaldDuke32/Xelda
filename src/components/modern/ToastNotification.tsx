import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, X, Info, Zap } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastNotificationProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: Zap
}

const styles = {
  success: {
    bg: 'bg-green-50 border-green-200',
    icon: 'text-green-500',
    text: 'text-green-800'
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: 'text-red-500',
    text: 'text-red-800'
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-500',
    text: 'text-blue-800'
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-500',
    text: 'text-yellow-800'
  }
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toasts,
  onRemove
}) => {
  return (
    <div className="fixed top-20 right-6 z-50 space-y-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

const ToastItem: React.FC<{
  toast: Toast
  onRemove: (id: string) => void
}> = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100)
  const Icon = icons[toast.type]
  const style = styles[toast.type]
  const duration = toast.duration || 5000

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100))
        if (newProgress <= 0) {
          clearInterval(timer)
          // Use setTimeout to avoid state update during render
          setTimeout(() => onRemove(toast.id), 0)
          return 0
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(timer)
  }, [toast.id, duration, onRemove])

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5 }}
      transition={{ type: "spring", duration: 0.4 }}
      className={cn(
        "relative w-96 bg-white border rounded-xl shadow-lg backdrop-blur-sm p-4",
        style.bg
      )}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
        <motion.div
          className={cn("h-full", toast.type === 'success' ? 'bg-green-500' : 
                       toast.type === 'error' ? 'bg-red-500' :
                       toast.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500')}
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn("flex-shrink-0", style.icon)}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={cn("font-semibold text-sm", style.text)}>
            {toast.title}
          </h4>
          <p className={cn("text-sm mt-1 opacity-90", style.text)}>
            {toast.message}
          </p>
          
          {/* Action */}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className={cn(
                "text-sm font-medium mt-2 hover:underline",
                style.text
              )}
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => onRemove(toast.id)}
          className={cn(
            "flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity",
            style.text
          )}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

// Toast hook for easy usage
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const success = (title: string, message: string, action?: Toast['action']) =>
    addToast({ type: 'success', title, message, action })

  const error = (title: string, message: string, action?: Toast['action']) =>
    addToast({ type: 'error', title, message, action })

  const info = (title: string, message: string, action?: Toast['action']) =>
    addToast({ type: 'info', title, message, action })

  const warning = (title: string, message: string, action?: Toast['action']) =>
    addToast({ type: 'warning', title, message, action })

  return {
    toasts,
    removeToast,
    success,
    error,
    info,
    warning
  }
}