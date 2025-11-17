import React from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  User, 
  Settings, 
  Crown, 
  Zap,
  Menu,
  X
} from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'
import { cn } from '../../lib/utils'

interface ModernHeaderProps {
  currentView: 'creator' | 'gallery' | 'profile'
  onViewChange: (view: 'creator' | 'gallery' | 'profile') => void
  onAuthOpen: () => void
}

export const ModernHeader: React.FC<ModernHeaderProps> = ({ 
  currentView, 
  onViewChange, 
  onAuthOpen 
}) => {
  const { user, signOut } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const navItems = [
    { key: 'creator', label: 'Create', icon: Sparkles },
    { key: 'gallery', label: 'Explore', icon: Zap },
    { key: 'profile', label: 'Profile', icon: User },
  ]

  const getPlanBadge = (plan: string) => {
    const badges = {
      free: { color: 'bg-gray-100 text-gray-800', label: 'Free' },
      pro: { color: 'bg-gradient-to-r from-orange-400 to-pink-400 text-white', label: 'Pro' },
      expert: { color: 'bg-gradient-to-r from-purple-400 to-blue-400 text-white', label: 'Expert' }
    }
    return badges[plan as keyof typeof badges] || badges.free
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold text-gray-900">
            XELDA
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.key
            
            return (
              <Button
                key={item.key}
                variant="ghost"
                size="sm"
                onClick={() => onViewChange(item.key as any)}
                className={cn(
                  "relative px-4 py-2 transition-all duration-200",
                  isActive 
                    ? "bg-gray-100 text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-lg"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Button>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Plan Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "hidden sm:flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                  getPlanBadge(user.plan).color
                )}
              >
                {user.plan === 'expert' && <Crown className="w-3 h-3" />}
                {getPlanBadge(user.plan).label}
              </motion.div>

              {/* Quota Progress */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="text-xs text-gray-600">
                  {user.monthly_generations_used}/{user.monthly_generations_limit === -1 ? '∞' : user.monthly_generations_limit}
                </div>
                <Progress 
                  value={
                    user.monthly_generations_limit === -1 
                      ? 100 
                      : (user.monthly_generations_used / user.monthly_generations_limit) * 100
                  }
                  className="w-16 h-1"
                />
              </div>

              {/* User Avatar */}
              <div className="relative group">
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Dropdown Menu */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 0, scale: 0.95, y: -10 }}
                  whileHover={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <div className="p-3 border-b">
                    <p className="font-medium text-gray-900">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="space-y-1 py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewChange('profile')}
                      className="w-full justify-start"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                  <div className="border-t pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={signOut}
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Sign out
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            <Button 
              onClick={onAuthOpen}
              variant="gradient"
              size="sm"
              className="shadow-lg"
            >
              Sign in
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t bg-white/95 backdrop-blur-xl"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.key
              
              return (
                <Button
                  key={item.key}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onViewChange(item.key as any)
                    setIsMenuOpen(false)
                  }}
                  className="w-full justify-start"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}