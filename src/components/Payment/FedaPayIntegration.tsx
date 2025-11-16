import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { LoaderIcon, CheckIcon, XIcon } from '../icons';

interface FedaPayConfig {
  publicKey: string;
  environment: 'sandbox' | 'live';
  currency: 'XOF' | 'CFA';
}

interface PaymentProps {
  planName: 'pro' | 'expert';
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

export const FedaPayIntegration: React.FC<PaymentProps> = ({
  planName,
  amount,
  currency,
  billingCycle,
  onSuccess,
  onError,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuthStore();

  const fedaPayConfig: FedaPayConfig = {
    publicKey: import.meta.env.VITE_FEDAPAY_PUBLIC_KEY || '',
    environment: import.meta.env.VITE_ENV === 'production' ? 'live' : 'sandbox',
    currency: 'XOF'
  };

  const initiateFedaPayment = async () => {
    if (!user) return;

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Create payment transaction via our backend
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.auth_id}` // Adjust based on your auth system
        },
        body: JSON.stringify({
          planName,
          amount: amount * 100, // Convert to cents
          currency,
          billingCycle,
          customerEmail: user.email,
          customerName: user.username,
          description: `XELDA ${planName.toUpperCase()} Plan - ${billingCycle}`
        })
      });

      const paymentData = await response.json();

      if (!response.ok) {
        throw new Error(paymentData.message || 'Failed to initiate payment');
      }

      // Open FedaPay checkout
      if (window.FedaPay) {
        window.FedaPay.init({
          environment: fedaPayConfig.environment,
          token: paymentData.fedaPayToken
        });

        const checkout = window.FedaPay.checkout({
          transaction: {
            id: paymentData.transactionId,
            amount: amount * 100,
            currency: fedaPayConfig.currency,
            description: `XELDA ${planName.toUpperCase()} Plan`
          },
          customer: {
            email: user.email,
            firstname: user.username,
            lastname: user.username
          }
        });

        checkout.on('success', (transaction: any) => {
          setPaymentStatus('success');
          onSuccess(transaction.id);
        });

        checkout.on('error', (error: any) => {
          setPaymentStatus('error');
          setErrorMessage(error.message || 'Payment failed');
          onError(error.message);
        });

        checkout.on('cancel', () => {
          setPaymentStatus('idle');
          onCancel();
        });

        checkout.open();

      } else {
        throw new Error('FedaPay SDK not loaded');
      }

    } catch (error) {
      setPaymentStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Payment initialization failed';
      setErrorMessage(errorMsg);
      onError(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Load FedaPay SDK
  useEffect(() => {
    if (!window.FedaPay) {
      const script = document.createElement('script');
      script.src = 'https://cdn.fedapay.com/checkout.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const getPlanFeatures = (plan: string) => {
    const features = {
      pro: [
        'Générations illimitées',
        '1 GB de stockage',
        'Support prioritaire 48h',
        'Accès complet galerie',
        '3 types de pièces',
        'Chat illimité'
      ],
      expert: [
        'Tout du plan Pro',
        'Stockage illimité', 
        'Support 24/7 prioritaire',
        'Tous types de pièces',
        'Qualité AR haute',
        'Fonctionnalités bêta',
        'Génération vidéo (bientôt)'
      ]
    };
    return features[plan as keyof typeof features] || [];
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency === 'XOF' ? 'XOF' : 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-green-400 mb-2">Paiement réussi !</h3>
        <p className="text-gray-400">
          Votre plan {planName.toUpperCase()} est maintenant actif.
        </p>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <XIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-red-400 mb-2">Erreur de paiement</h3>
        <p className="text-gray-400 mb-4">{errorMessage}</p>
        <button
          onClick={() => {
            setPaymentStatus('idle');
            setErrorMessage('');
          }}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Payment Summary */}
      <div className="bg-zinc-800/50 rounded-xl p-6 mb-6 border border-white/10">
        <h3 className="text-lg font-bold mb-4 text-center">
          Résumé de commande
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Plan</span>
            <span className="font-medium capitalize">{planName}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Facturation</span>
            <span className="font-medium capitalize">{billingCycle}</span>
          </div>
          
          <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
            <span>Total</span>
            <span className="text-orange-400">{formatAmount(amount, currency)}</span>
          </div>
        </div>
      </div>

      {/* Plan Features */}
      <div className="bg-zinc-900/30 rounded-xl p-4 mb-6 border border-white/10">
        <h4 className="font-medium mb-3">Ce qui est inclus :</h4>
        <ul className="space-y-2 text-sm">
          {getPlanFeatures(planName).map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment Button */}
      <button
        onClick={initiateFedaPayment}
        disabled={isProcessing}
        className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
      >
        {isProcessing ? (
          <>
            <LoaderIcon className="w-5 h-5 animate-spin" />
            Traitement...
          </>
        ) : (
          <>
            Payer {formatAmount(amount, currency)}
          </>
        )}
      </button>

      {/* Payment Methods */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400 mb-3">Méthodes de paiement acceptées :</p>
        <div className="flex justify-center items-center gap-4">
          <div className="text-xs bg-zinc-800 px-3 py-1 rounded">
            💳 Cartes bancaires
          </div>
          <div className="text-xs bg-zinc-800 px-3 py-1 rounded">
            📱 Mobile Money
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-blue-400 text-sm">🔒</div>
          <div className="text-sm text-blue-300">
            <p className="font-medium mb-1">Paiement 100% sécurisé</p>
            <p className="text-xs text-blue-400">
              Vos données sont protégées par le chiffrement SSL et traitées par FedaPay.
              Aucune information bancaire n'est stockée sur nos serveurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};