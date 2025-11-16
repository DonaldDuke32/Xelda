import React from 'react'
import { useAuthStore } from '../../stores/authStore'
import { LogoIcon, ProfileIcon, UserIcon } from '../icons'

interface HeaderProps {
  currentView: 'creator' | 'gallery' | 'profile'
  onViewChange: (view: 'creator' | 'gallery' | 'profile') => void
  onAuthOpen: () => void
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, onAuthOpen }) => {
  const { user, signOut } = useAuthStore()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="w-full bg-black/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <LogoIcon className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
              XELDA
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onViewChange('creator')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentView === 'creator'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Créateur
            </button>
            <button
              onClick={() => onViewChange('gallery')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentView === 'gallery'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Galerie
            </button>
            <button
              onClick={() => onViewChange('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentView === 'profile'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Profil
            </button>
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Plan Badge */}
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  user.plan === 'expert' 
                    ? 'bg-purple-500 text-white'
                    : user.plan === 'pro'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {user.plan.toUpperCase()}
                </span>

                {/* Quota */}
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-300">
                  <span>{user.monthly_generations_used}/{user.monthly_generations_limit}</span>
                  <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
                      style={{ 
                        width: `${Math.min((user.monthly_generations_used / user.monthly_generations_limit) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800 transition-colors">
                    {user.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="hidden sm:block text-sm font-medium">{user.username}</span>
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 rounded-lg border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-3 border-b border-white/10">
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => onViewChange('profile')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-800 rounded transition-colors flex items-center gap-2"
                      >
                        <ProfileIcon className="w-4 h-4" />
                        Mon Profil
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-800 rounded transition-colors text-red-400"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onAuthOpen}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-200 shadow-lg shadow-orange-500/30"
              >
                Connexion
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-center gap-1 py-3 border-t border-white/10">
          <button
            onClick={() => onViewChange('creator')}
            className={`flex-1 py-2 text-center rounded-lg font-medium transition-all duration-200 ${
              currentView === 'creator'
                ? 'bg-orange-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Créateur
          </button>
          <button
            onClick={() => onViewChange('gallery')}
            className={`flex-1 py-2 text-center rounded-lg font-medium transition-all duration-200 ${
              currentView === 'gallery'
                ? 'bg-orange-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Galerie
          </button>
          <button
            onClick={() => onViewChange('profile')}
            className={`flex-1 py-2 text-center rounded-lg font-medium transition-all duration-200 ${
              currentView === 'profile'
                ? 'bg-orange-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Profil
          </button>
        </div>
      </div>
    </header>
  )
}