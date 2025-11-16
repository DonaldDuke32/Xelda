import React, { useState } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { EyeIcon, EyeSlashIcon, GoogleIcon, CheckIcon } from '../icons'

interface SignupFormProps {
  onSwitchToLogin: () => void
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  
  const { signUp, signInWithGoogle, loading, error, clearError } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) return
    
    clearError()
    await signUp(email, password, username)
  }

  const handleGoogleSignup = async () => {
    if (!acceptedTerms) return
    clearError()
    await signInWithGoogle()
  }

  const isPasswordValid = password.length >= 8
  const isUsernameValid = username.length >= 3
  const canSubmit = email && isPasswordValid && isUsernameValid && acceptedTerms

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
          Rejoindre XELDA
        </h1>
        <p className="text-gray-400 mt-2">Créez votre compte et commencez à transformer vos espaces</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            placeholder="votrenom"
          />
          {username && (
            <div className="mt-1 flex items-center gap-2">
              {isUsernameValid ? (
                <CheckIcon className="w-4 h-4 text-green-400" />
              ) : (
                <span className="text-red-400 text-sm">Minimum 3 caractères</span>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all pr-12"
              placeholder="Minimum 8 caractères"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>
          {password && (
            <div className="mt-1 flex items-center gap-2">
              {isPasswordValid ? (
                <CheckIcon className="w-4 h-4 text-green-400" />
              ) : (
                <span className="text-red-400 text-sm">Minimum 8 caractères requis</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500 bg-zinc-800"
            />
          </div>
          <div className="text-sm text-gray-400">
            J'accepte les{' '}
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
              conditions d'utilisation
            </a>{' '}
            et la{' '}
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
              politique de confidentialité
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !canSubmit}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Création du compte...' : 'Créer mon compte'}
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-600"></div>
        <div className="px-4 text-gray-400 text-sm">ou</div>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>

      <button
        onClick={handleGoogleSignup}
        disabled={loading || !acceptedTerms}
        className="w-full py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        <GoogleIcon className="w-5 h-5" />
        Continuer avec Google
      </button>

      <div className="mt-6 text-center">
        <span className="text-gray-400 text-sm">Déjà un compte ? </span>
        <button
          onClick={onSwitchToLogin}
          className="text-orange-400 hover:text-orange-300 text-sm font-semibold transition-colors"
        >
          Se connecter
        </button>
      </div>
    </div>
  )
}