import React from 'react'
import { CheckIcon } from '../icons'

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  isPopular?: boolean
  isCurrentPlan?: boolean
}

interface PricingCardProps {
  plan: PricingPlan
  onSelect: (planName: string) => void
  disabled?: boolean
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect, disabled = false }) => {
  return (
    <div className={`relative bg-zinc-900/50 rounded-2xl border p-8 transition-all duration-300 hover:scale-105 ${
      plan.isPopular 
        ? 'border-orange-500 shadow-xl shadow-orange-500/20' 
        : 'border-white/10 hover:border-orange-500/50'
    }`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
            POPULAIRE
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-gray-400">/{plan.period}</span>
        </div>
        <p className="text-gray-400">{plan.description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan.name)}
        disabled={disabled || plan.isCurrentPlan}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          plan.isCurrentPlan
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : plan.isPopular
            ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white hover:scale-105'
            : 'bg-zinc-800 text-white hover:bg-zinc-700'
        }`}
      >
        {plan.isCurrentPlan ? 'Plan Actuel' : `Choisir ${plan.name}`}
      </button>
    </div>
  )
}