import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search,
  Upload,
  Palette,
  User,
  Settings,
  Crown,
  Sparkles,
  MessageSquare,
  Download,
  Eye,
  Heart,
  Zap,
  ArrowRight,
  Command
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { cn } from '../../lib/utils'

interface Command {
  id: string
  title: string
  description: string
  icon: React.ElementType
  shortcut?: string
  category: 'navigation' | 'actions' | 'settings' | 'help'
  action: () => void
  keywords: string[]
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (view: string) => void
  onNewDesign: () => void
  onShowUpgrade: () => void
  onShowHelp: () => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onNewDesign,
  onShowUpgrade,
  onShowHelp
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands: Command[] = [
    // Navigation
    {
      id: 'nav-creator',
      title: 'Go to Creator',
      description: 'Start creating a new design',
      icon: Sparkles,
      shortcut: '⌘+1',
      category: 'navigation',
      action: () => onNavigate('creator'),
      keywords: ['create', 'new', 'design', 'start', 'upload']
    },
    {
      id: 'nav-gallery',
      title: 'Go to Gallery',
      description: 'Browse community designs',
      icon: Eye,
      shortcut: '⌘+2',
      category: 'navigation',
      action: () => onNavigate('gallery'),
      keywords: ['gallery', 'browse', 'explore', 'community', 'inspiration']
    },
    {
      id: 'nav-profile',
      title: 'Go to Profile',
      description: 'View your profile and analytics',
      icon: User,
      shortcut: '⌘+3',
      category: 'navigation',
      action: () => onNavigate('profile'),
      keywords: ['profile', 'analytics', 'stats', 'account', 'dashboard']
    },

    // Actions
    {
      id: 'action-new-design',
      title: 'New Design',
      description: 'Start a fresh design project',
      icon: Upload,
      shortcut: '⌘+N',
      category: 'actions',
      action: onNewDesign,
      keywords: ['new', 'create', 'upload', 'start', 'fresh', 'project']
    },
    {
      id: 'action-surprise-me',
      title: 'Surprise Me',
      description: 'Generate a random style combination',
      icon: Zap,
      shortcut: '⌘+R',
      category: 'actions',
      action: () => {}, // TODO: Implement
      keywords: ['surprise', 'random', 'generate', 'style', 'fusion']
    },
    {
      id: 'action-upgrade',
      title: 'Upgrade to Pro',
      description: 'Unlock unlimited generations',
      icon: Crown,
      category: 'actions',
      action: onShowUpgrade,
      keywords: ['upgrade', 'pro', 'premium', 'unlimited', 'plan']
    },

    // Settings
    {
      id: 'settings-account',
      title: 'Account Settings',
      description: 'Manage your account preferences',
      icon: Settings,
      category: 'settings',
      action: () => onNavigate('profile'),
      keywords: ['settings', 'account', 'preferences', 'profile']
    },

    // Help
    {
      id: 'help-support',
      title: 'Get Help',
      description: 'Contact support or view docs',
      icon: MessageSquare,
      shortcut: '⌘+?',
      category: 'help',
      action: onShowHelp,
      keywords: ['help', 'support', 'docs', 'documentation', 'contact']
    }
  ]

  const filteredCommands = commands.filter(command => 
    searchQuery === '' || 
    command.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    command.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    command.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = []
    }
    acc[command.category].push(command)
    return acc
  }, {} as Record<string, Command[]>)

  const categoryLabels = {
    navigation: 'Navigation',
    actions: 'Actions',
    settings: 'Settings',
    help: 'Help & Support'
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action()
          onClose()
        }
        break
      case 'Escape':
        onClose()
        break
    }
  }, [isOpen, filteredCommands, selectedIndex, onClose])

  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          // Toggle command palette
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeydown)
    return () => document.removeEventListener('keydown', handleGlobalKeydown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[15vh]"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ type: "spring", duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl mx-4"
      >
        <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            {/* Search Input */}
            <div className="relative border-b">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Type a command or search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent border-0 focus:outline-none text-lg placeholder-gray-400"
                autoFocus
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 rounded px-2 py-1">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">No commands found</h3>
                  <p className="text-sm text-gray-600">Try searching for something else</p>
                </div>
              ) : (
                <div className="py-2">
                  {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                    <div key={category}>
                      <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </div>
                      {categoryCommands.map((command, index) => {
                        const globalIndex = filteredCommands.indexOf(command)
                        const Icon = command.icon
                        const isSelected = globalIndex === selectedIndex
                        
                        return (
                          <motion.div
                            key={command.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors",
                              isSelected ? "bg-blue-50 border-r-2 border-blue-500" : "hover:bg-gray-50"
                            )}
                            onClick={() => {
                              command.action()
                              onClose()
                            }}
                          >
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              isSelected 
                                ? "bg-blue-500 text-white" 
                                : "bg-gray-100 text-gray-600"
                            )}>
                              <Icon className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className={cn(
                                  "font-medium truncate",
                                  isSelected ? "text-blue-900" : "text-gray-900"
                                )}>
                                  {command.title}
                                </h3>
                                {command.shortcut && (
                                  <div className="text-xs text-gray-400 bg-gray-100 rounded px-2 py-1 font-mono">
                                    {command.shortcut}
                                  </div>
                                )}
                              </div>
                              <p className={cn(
                                "text-sm truncate",
                                isSelected ? "text-blue-700" : "text-gray-600"
                              )}>
                                {command.description}
                              </p>
                            </div>
                            
                            {isSelected && (
                              <ArrowRight className="w-4 h-4 text-blue-500" />
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 px-4 py-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="font-mono bg-white rounded px-1">↑↓</span>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono bg-white rounded px-1">⏎</span>
                    <span>Select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono bg-white rounded px-1">esc</span>
                    <span>Close</span>
                  </div>
                </div>
                <div>
                  {filteredCommands.length} result{filteredCommands.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}