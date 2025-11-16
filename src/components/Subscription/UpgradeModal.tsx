import React, { useState } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { PricingCard } from './PricingCard'
import { CloseIcon } from '../icons'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

const PRICING_PLANS = [
  {
    name: 'Gratuit',
    price: '0€',
    period: 'mois',
    description: 'Parfait pour découvrir XELDA',
    features: [
      '10 générations par mois',
      '100 MB de stockage',
      'Tous les 10 styles',
      'Chat basique (5 messages)',
      'Galerie en lecture seule',
      'Support communautaire'
    ]
  },
  {
    name: 'Pro',
    price: '4.99€',
    period: 'mois',
    description: 'Pour les passionnés de décoration',
    features: [
      'Générations illimitées',
      '1 GB de stockage',
      'Tous les styles + futurs',
      'Chat illimité',
      'Accès complet à la galerie',
      'Support 48h',
      '3 types de pièces',
      'Qualité AR medium'
    ],
    isPopular: true
  },
  {
    name: 'Expert',
    price: '14.99€',
    period: 'mois',
    description: 'Pour les professionnels',
    features: [
      'Tout du plan Pro',
      'Stockage illimité',
      'Tous types de pièces',
      'Qualité AR haute + WebXR',
      'Génération vidéo (bientôt)',
      'Accès API (bientôt)',
      'Support 24/7 prioritaire',
      'Fonctionnalités bêta'
    ]
  }
]

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuthStore()

  if (!isOpen) return null

  const handlePlanSelect = async (planName: string) => {
    if (!user) return

    setSelectedPlan(planName)
    setLoading(true)

    try {
      // TODO: Integrate with FedaPay
      // For now, just simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to payment or update user plan
      console.log(`Upgrading to ${planName}`)
      
    } catch (error) {
      console.error('Upgrade error:', error)
    } finally {
      setLoading(false)
      setSelectedPlan(null)
    }
  }

  const currentUserPlan = user?.plan || 'free'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
        >
          <CloseIcon className="w-4 h-4 text-gray-400" />
        </button>

        <div className="bg-zinc-900/90 rounded-2xl border border-white/10 p-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Choisissez votre <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">Plan</span>
            </h2>
            <p className="text-xl text-gray-400">
              Libérez tout le potentiel de XELDA avec nos plans premium
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {PRICING_PLANS.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={{
                  ...plan,
                  isCurrentPlan: currentUserPlan === plan.name.toLowerCase()
                }}
                onSelect={handlePlanSelect}
                disabled={loading}
              />
            ))}
          </div>

          {loading && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/20 rounded-lg">
                <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Redirection vers le paiement...</span>
              </div>
            </div>
          )}

          <div className="mt-8 p-6 bg-zinc-800/50 rounded-xl border border-white/10">
            <h3 className="font-bold mb-4">💳 Paiement sécurisé</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <p className="font-medium text-white mb-2">Méthodes acceptées :</p>
                <ul className="space-y-1">
                  <li>• Cartes bancaires (Visa, Mastercard)</li>
                  <li>• Mobile Money (Orange Money, MTN)</li>
                  <li>• Paiement en ligne sécurisé</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Garanties :</p>
                <ul className="space-y-1">
                  <li>• Annulation à tout moment</li>
                  <li>• Remboursement sous 14 jours</li>
                  <li>• Données 100% sécurisées</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}