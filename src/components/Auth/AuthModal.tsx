import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { CloseIcon } from '../icons'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'signup'
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'forgot'>(defaultTab)

  if (!isOpen) return null

  const handleForgotPassword = () => {
    setActiveTab('forgot')
  }

  const ForgotPasswordForm = () => (
    <div className="w-full max-w-md mx-auto bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
          Récupération
        </h1>
        <p className="text-gray-400 mt-2">Entrez votre email pour recevoir un lien de réinitialisation</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            placeholder="votre@email.com"
          />
        </div>
        
        <button className="w-full py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold rounded-lg hover:scale-105 transition-all">
          Envoyer le lien
        </button>
        
        <div className="text-center">
          <button
            onClick={() => setActiveTab('login')}
            className="text-orange-400 hover:text-orange-300 text-sm font-semibold transition-colors"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
        >
          <CloseIcon className="w-4 h-4 text-gray-400" />
        </button>
        
        {activeTab === 'login' && (
          <LoginForm
            onSwitchToSignup={() => setActiveTab('signup')}
            onForgotPassword={handleForgotPassword}
          />
        )}
        
        {activeTab === 'signup' && (
          <SignupForm onSwitchToLogin={() => setActiveTab('login')} />
        )}
        
        {activeTab === 'forgot' && <ForgotPasswordForm />}
      </div>
    </div>
  )
}