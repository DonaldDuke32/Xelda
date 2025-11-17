# 🚀 XELDA-AI v2.0 - Guide de Démarrage EXHAUSTIF

## 📋 Vue d'ensemble du Projet

**XELDA-AI** est une plateforme SaaS premium de design d'intérieur alimentée par l'IA, spécialisée dans la transformation intelligente de chambres à coucher. Cette v2.0 modernise entièrement l'architecture avec Next.js 14, ShadCN UI et Magic UI pour une expérience utilisateur de classe mondiale.

### 🎯 Vision & Objectifs Stratégiques

- **Démocratiser** le design d'intérieur professionnel via l'IA générative
- **Créer** le plus grand écosystème social de design d'intérieur au monde
- **Générer** €20K+ MRR dans les 12 premiers mois
- **Devenir** la référence mondiale du design d'intérieur IA
- **Capturer** 5% du marché global du design d'intérieur (€150B)
- **Lancer** l'expansion vers autres pièces (salon, cuisine, bureau)

### 🌟 Proposition de Valeur Unique

1. **IA Créative Avancée** : Transformation réaliste en 30 secondes
2. **Social Design** : Première plateforme sociale dédiée au design d'intérieur
3. **Personnalisation Extrême** : 10 styles + fusion intelligente + palette personnalisée
4. **Chat IA Conversationnel** : Affinage en langage naturel
5. **AR/3D Preview** : Visualisation immersive avant achat
6. **Marketplace Intégré** : Achat direct des meubles recommandés

## 🛠️ Stack Technique (v2.0)

### Frontend
```typescript
// Core Framework
Next.js 14 (App Router)
TypeScript 5.0+
React 18+

// UI & Design System
ShadCN UI (Base components)
Magic UI (Premium animations & effects)
Tailwind CSS (Styling)
Framer Motion (Animations avancées)

// State Management
Zustand (Global state)
React Query/TanStack Query (Server state)

// Auth & Backend
Supabase (Auth + Database)
Clerk (Alternative auth - évaluer)

// AI Services
Google Gemini API
OpenAI API (Backup/Alternative)

// Payments
FedaPay (Marché africain)
Stripe (Marché global)

// Utils
Zod (Validation)
React Hook Form (Forms)
Sonner (Toasts)
```

## 🌐 ROUTES & NAVIGATION COMPLÈTE

### Structure de Routes Next.js 14

```typescript
// Route Groups & Pages Architecture
app/
├── (marketing)/                 # Marketing Pages (Non-auth)
│   ├── page.tsx                # Landing Page [/]
│   ├── about/                  
│   │   └── page.tsx           # À Propos [/about]
│   ├── pricing/               
│   │   └── page.tsx           # Tarification [/pricing]
│   ├── features/              
│   │   └── page.tsx           # Fonctionnalités [/features]
│   ├── showcase/              
│   │   └── page.tsx           # Vitrine [/showcase]
│   ├── blog/                  
│   │   ├── page.tsx           # Blog [/blog]
│   │   └── [slug]/            
│   │       └── page.tsx       # Article [/blog/[slug]]
│   ├── contact/               
│   │   └── page.tsx           # Contact [/contact]
│   ├── legal/                 
│   │   ├── privacy/           
│   │   │   └── page.tsx       # Confidentialité [/legal/privacy]
│   │   ├── terms/             
│   │   │   └── page.tsx       # CGU [/legal/terms]
│   │   └── cookies/           
│   │       └── page.tsx       # Cookies [/legal/cookies]
│   └── layout.tsx             # Marketing Layout
│
├── (auth)/                     # Authentication Pages
│   ├── signin/                
│   │   └── page.tsx           # Connexion [/signin]
│   ├── signup/                
│   │   └── page.tsx           # Inscription [/signup]
│   ├── forgot-password/       
│   │   └── page.tsx           # Mot de passe oublié [/forgot-password]
│   ├── reset-password/        
│   │   └── page.tsx           # Reset Password [/reset-password]
│   ├── verify-email/          
│   │   └── page.tsx           # Vérification Email [/verify-email]
│   ├── callback/              
│   │   └── page.tsx           # Auth Callback [/callback]
│   └── layout.tsx             # Auth Layout
│
├── (dashboard)/               # Protected Dashboard
│   ├── dashboard/             
│   │   └── page.tsx           # Dashboard Home [/dashboard]
│   ├── creator/               
│   │   ├── page.tsx           # Espace Créateur [/creator]
│   │   ├── [projectId]/       
│   │   │   └── page.tsx       # Projet Spécifique [/creator/[projectId]]
│   │   └── new/               
│   │       └── page.tsx       # Nouveau Projet [/creator/new]
│   ├── gallery/               
│   │   ├── page.tsx           # Galerie [/gallery]
│   │   ├── trending/          
│   │   │   └── page.tsx       # Tendances [/gallery/trending]
│   │   ├── following/         
│   │   │   └── page.tsx       # Abonnements [/gallery/following]
│   │   └── [designId]/        
│   │       └── page.tsx       # Design Détail [/gallery/[designId]]
│   ├── profile/               
│   │   ├── page.tsx           # Profil [/profile]
│   │   ├── edit/              
│   │   │   └── page.tsx       # Éditer Profil [/profile/edit]
│   │   ├── projects/          
│   │   │   └── page.tsx       # Mes Projets [/profile/projects]
│   │   ├── liked/             
│   │   │   └── page.tsx       # Mes Likes [/profile/liked]
│   │   └── [username]/        
│   │       └── page.tsx       # Profil Public [/profile/[username]]
│   ├── settings/              
│   │   ├── page.tsx           # Paramètres [/settings]
│   │   ├── account/           
│   │   │   └── page.tsx       # Compte [/settings/account]
│   │   ├── billing/           
│   │   │   └── page.tsx       # Facturation [/settings/billing]
│   │   ├── notifications/     
│   │   │   └── page.tsx       # Notifications [/settings/notifications]
│   │   └── api-keys/          
│   │       └── page.tsx       # Clés API [/settings/api-keys]
│   ├── subscription/          
│   │   ├── page.tsx           # Abonnement [/subscription]
│   │   ├── upgrade/           
│   │   │   └── page.tsx       # Upgrade [/subscription/upgrade]
│   │   └── success/           
│   │       └── page.tsx       # Succès [/subscription/success]
│   └── layout.tsx             # Dashboard Layout
│
├── api/                       # API Routes
│   ├── auth/                  
│   │   ├── signin/            
│   │   │   └── route.ts       # POST /api/auth/signin
│   │   ├── signup/            
│   │   │   └── route.ts       # POST /api/auth/signup
│   │   ├── logout/            
│   │   │   └── route.ts       # POST /api/auth/logout
│   │   └── session/           
│   │       └── route.ts       # GET /api/auth/session
│   ├── ai/                    
│   │   ├── analyze-furniture/ 
│   │   │   └── route.ts       # POST /api/ai/analyze-furniture
│   │   ├── generate-design/   
│   │   │   └── route.ts       # POST /api/ai/generate-design
│   │   ├── chat/              
│   │   │   └── route.ts       # POST /api/ai/chat
│   │   └── style-fusion/      
│   │       └── route.ts       # POST /api/ai/style-fusion
│   ├── upload/                
│   │   ├── image/             
│   │   │   └── route.ts       # POST /api/upload/image
│   │   └── avatar/            
│   │       └── route.ts       # POST /api/upload/avatar
│   ├── projects/              
│   │   ├── route.ts           # GET/POST /api/projects
│   │   ├── [id]/              
│   │   │   └── route.ts       # GET/PATCH/DELETE /api/projects/[id]
│   │   └── public/            
│   │       └── route.ts       # GET /api/projects/public
│   ├── gallery/               
│   │   ├── route.ts           # GET /api/gallery
│   │   ├── trending/          
│   │   │   └── route.ts       # GET /api/gallery/trending
│   │   ├── [id]/              
│   │   │   ├── route.ts       # GET /api/gallery/[id]
│   │   │   ├── like/          
│   │   │   │   └── route.ts   # POST/DELETE /api/gallery/[id]/like
│   │   │   └── download/      
│   │   │       └── route.ts   # POST /api/gallery/[id]/download
│   │   └── search/            
│   │       └── route.ts       # GET /api/gallery/search
│   ├── profile/               
│   │   ├── route.ts           # GET/PATCH /api/profile
│   │   ├── [username]/        
│   │   │   └── route.ts       # GET /api/profile/[username]
│   │   └── style-preferences/ 
│   │       └── route.ts       # PATCH /api/profile/style-preferences
│   ├── subscription/          
│   │   ├── create-session/    
│   │   │   └── route.ts       # POST /api/subscription/create-session
│   │   ├── portal/            
│   │   │   └── route.ts       # POST /api/subscription/portal
│   │   └── status/            
│   │       └── route.ts       # GET /api/subscription/status
│   ├── webhooks/              
│   │   ├── fedapay/           
│   │   │   └── route.ts       # POST /api/webhooks/fedapay
│   │   └── supabase/          
│   │       └── route.ts       # POST /api/webhooks/supabase
│   ├── admin/                 
│   │   ├── users/             
│   │   │   └── route.ts       # GET /api/admin/users
│   │   ├── analytics/         
│   │   │   └── route.ts       # GET /api/admin/analytics
│   │   └── content-moderation/
│   │       └── route.ts       # POST /api/admin/content-moderation
│   └── health/                
│       └── route.ts           # GET /api/health
│
└── globals.css               # Global Styles
```

## 🏛️ ARCHITECTURE DÉTAILLÉE

### Layouts Hiérarchiques

```typescript
// app/layout.tsx - Root Layout
export default function RootLayout({ children }: Props) {
  return (
    <html lang="fr" className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers>
          <Toaster />
          <Analytics />
          {children}
        </Providers>
      </body>
    </html>
  )
}

// app/(marketing)/layout.tsx - Marketing Layout
export default function MarketingLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        {children}
      </main>
      <MarketingFooter />
    </div>
  )
}

// app/(dashboard)/layout.tsx - Dashboard Layout
export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Middleware de Protection

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  if (req.nextUrl.pathname.startsWith('/dashboard') || 
      req.nextUrl.pathname.startsWith('/creator') ||
      req.nextUrl.pathname.startsWith('/profile') ||
      req.nextUrl.pathname.startsWith('/settings')) {
    if (!session) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }

  // Auth routes (redirect if already logged in)
  if (req.nextUrl.pathname.startsWith('/signin') ||
      req.nextUrl.pathname.startsWith('/signup')) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
```

## 🎨 Design System avec Magic UI

### Composants Magic UI à Utiliser

```typescript
// Navigation & Layout
import { DockDemo } from "@/components/magicui/dock"
import { SidebarDemo } from "@/components/magicui/sidebar"

// Hero & Landing
import { HeroVideoDialog } from "@/components/magicui/hero-video-dialog"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { BorderBeam } from "@/components/magicui/border-beam"

// Animations & Effects
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { RainbowButton } from "@/components/magicui/rainbow-button"
import { SparklesText } from "@/components/magicui/sparkles-text"
import { BlurIn } from "@/components/magicui/blur-in"
import { TypingAnimation } from "@/components/magicui/typing-animation"

// Data Display
import { Marquee } from "@/components/magicui/marquee"
import { BentoGrid } from "@/components/magicui/bento-grid"
import { OrbitingCircles } from "@/components/magicui/orbiting-circles"

// Interactive
import { FileUpload } from "@/components/magicui/file-upload"
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button"
```

### Palette Couleurs XELDA

```css
/* CSS Variables - Thème Complet */
:root {
  /* Primary Gradient */
  --xelda-gradient: linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #DC143C 100%);
  --xelda-gradient-soft: linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,140,0,0.1) 50%, rgba(220,20,60,0.1) 100%);
  
  /* Brand Colors */
  --xelda-gold: #FFD700;
  --xelda-gold-dark: #E6C200;
  --xelda-orange: #FF8C00;
  --xelda-orange-dark: #E67E00;
  --xelda-red: #DC143C;
  --xelda-red-dark: #C41E3A;
  
  /* Background Colors */
  --xelda-dark: #0A0A0B;
  --xelda-gray: #1A1A1B;
  --xelda-gray-light: #2A2A2B;
  --xelda-gray-lighter: #3A3A3B;
  
  /* Surface Colors */
  --surface-primary: rgba(26, 26, 27, 0.8);
  --surface-secondary: rgba(42, 42, 43, 0.6);
  --surface-glass: rgba(255, 255, 255, 0.05);
  --surface-border: rgba(255, 215, 0, 0.2);
  
  /* Text Colors */
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-muted: rgba(255, 255, 255, 0.6);
  --text-inverse: #0A0A0B;
  
  /* Semantic Colors */
  --success: #10B981;
  --success-bg: rgba(16, 185, 129, 0.1);
  --warning: #F59E0B;
  --warning-bg: rgba(245, 158, 11, 0.1);
  --error: #EF4444;
  --error-bg: rgba(239, 68, 68, 0.1);
  --info: #3B82F6;
  --info-bg: rgba(59, 130, 246, 0.1);
  
  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
  --shadow-gold: 0 10px 20px rgba(255, 215, 0, 0.3);
  
  /* Blur Effects */
  --blur-sm: blur(4px);
  --blur-md: blur(8px);
  --blur-lg: blur(16px);
  --blur-xl: blur(24px);
}

/* Tailwind Custom Classes */
.bg-xelda-gradient {
  background: var(--xelda-gradient);
}

.text-xelda-gradient {
  background: var(--xelda-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.border-xelda-gradient {
  border: 2px solid transparent;
  background: linear-gradient(var(--xelda-dark), var(--xelda-dark)) padding-box,
              var(--xelda-gradient) border-box;
}

.glass-surface {
  background: var(--surface-glass);
  backdrop-filter: var(--blur-md);
  border: 1px solid var(--surface-border);
}

.shadow-xelda {
  box-shadow: var(--shadow-gold);
}
```

## 💰 STRATÉGIE PRICING COMPLÈTE

### Plans d'Abonnement

```typescript
// config/pricing.ts
export const PRICING_PLANS = {
  FREE: {
    id: 'free',
    name: 'Découverte',
    price: 0,
    currency: 'EUR',
    interval: 'month',
    features: {
      designs_per_month: 3,
      ai_chat_messages: 10,
      gallery_uploads: 1,
      styles_available: 5,
      export_quality: 'standard',
      watermark: true,
      support: 'community',
      storage_gb: 0.5
    },
    popular: false,
    cta: 'Commencer Gratuitement',
    description: 'Découvrez la magie du design IA'
  },
  
  PRO: {
    id: 'pro',
    name: 'Créateur',
    price: 19,
    currency: 'EUR',
    interval: 'month',
    features: {
      designs_per_month: 50,
      ai_chat_messages: 200,
      gallery_uploads: 20,
      styles_available: 10,
      export_quality: 'high',
      watermark: false,
      support: 'priority',
      storage_gb: 10,
      style_fusion: true,
      before_after_comparison: true,
      color_palette_extraction: true,
      mobile_app_access: true
    },
    popular: true,
    cta: 'Devenir Créateur',
    description: 'Pour les passionnés de design',
    yearly_discount: 0.2 // 20% de réduction
  },
  
  PREMIUM: {
    id: 'premium',
    name: 'Designer Pro',
    price: 49,
    currency: 'EUR',
    interval: 'month',
    features: {
      designs_per_month: -1, // Unlimited
      ai_chat_messages: -1,
      gallery_uploads: -1,
      styles_available: -1,
      export_quality: '4k',
      watermark: false,
      support: 'vip',
      storage_gb: 100,
      style_fusion: true,
      before_after_comparison: true,
      color_palette_extraction: true,
      mobile_app_access: true,
      ar_visualization: true,
      video_generation: true,
      api_access: true,
      white_label: true,
      analytics_dashboard: true,
      team_collaboration: 5
    },
    popular: false,
    cta: 'Devenir Pro',
    description: 'Solution complète pour professionnels',
    yearly_discount: 0.25 // 25% de réduction
  },
  
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: null, // Contact us
    currency: 'EUR',
    interval: 'custom',
    features: {
      designs_per_month: -1,
      ai_chat_messages: -1,
      gallery_uploads: -1,
      styles_available: -1,
      export_quality: '8k',
      watermark: false,
      support: 'dedicated',
      storage_gb: -1,
      style_fusion: true,
      before_after_comparison: true,
      color_palette_extraction: true,
      mobile_app_access: true,
      ar_visualization: true,
      video_generation: true,
      api_access: true,
      white_label: true,
      analytics_dashboard: true,
      team_collaboration: -1,
      custom_ai_models: true,
      sso_integration: true,
      priority_support: true,
      custom_integrations: true,
      dedicated_account_manager: true
    },
    popular: false,
    cta: 'Nous Contacter',
    description: 'Solution sur mesure pour entreprises'
  }
}

// Tarification régionale (Afrique vs Global)
export const REGIONAL_PRICING = {
  africa: {
    currency: 'XOF',
    multiplier: 655.957, // EUR to XOF
    payment_methods: ['fedapay', 'mobile_money', 'bank_transfer']
  },
  global: {
    currency: 'EUR',
    multiplier: 1,
    payment_methods: ['stripe', 'paypal', 'apple_pay', 'google_pay']
  }
}
```

### Interface Pricing

```typescript
// types/pricing.ts
export interface PricingFeatures {
  designs_per_month: number | -1 // -1 = unlimited
  ai_chat_messages: number | -1
  gallery_uploads: number | -1
  styles_available: number | -1
  export_quality: 'standard' | 'high' | '4k' | '8k'
  watermark: boolean
  support: 'community' | 'priority' | 'vip' | 'dedicated'
  storage_gb: number | -1
  style_fusion?: boolean
  before_after_comparison?: boolean
  color_palette_extraction?: boolean
  mobile_app_access?: boolean
  ar_visualization?: boolean
  video_generation?: boolean
  api_access?: boolean
  white_label?: boolean
  analytics_dashboard?: boolean
  team_collaboration?: number | -1
  custom_ai_models?: boolean
  sso_integration?: boolean
  priority_support?: boolean
  custom_integrations?: boolean
  dedicated_account_manager?: boolean
}

export interface PricingPlan {
  id: string
  name: string
  price: number | null
  currency: string
  interval: 'month' | 'year' | 'custom'
  features: PricingFeatures
  popular: boolean
  cta: string
  description: string
  yearly_discount?: number
}
```

## 📝 COPY & TEXTES COMPLETS

### Textes Marketing Landing Page

```typescript
// content/marketing.ts
export const MARKETING_COPY = {
  hero: {
    headline: "Transformez Votre Chambre en 30 Secondes",
    subheadline: "L'IA qui révolutionne le design d'intérieur. Uploadez une photo, choisissez un style, et découvrez votre chambre transformée.",
    cta_primary: "Créer Gratuitement",
    cta_secondary: "Voir la Démo",
    video_placeholder: "Regardez la magie opérer"
  },
  
  features: {
    title: "Pourquoi Choisir XELDA ?",
    subtitle: "La technologie IA la plus avancée au service de votre créativité",
    
    items: [
      {
        icon: "🎨",
        title: "IA Créative Avancée",
        description: "Algorithmes propriétaires entraînés sur millions de designs d'intérieur",
        details: "Notre IA comprend l'espace, la lumière, et harmonise couleurs et mobilier"
      },
      {
        icon: "⚡",
        title: "Résultats Instantanés",
        description: "Transformation complète de votre chambre en moins de 30 secondes",
        details: "Technologie de génération d'images optimisée pour la rapidité"
      },
      {
        icon: "🎭",
        title: "10 Styles Uniques",
        description: "Du minimalisme scandinave au futurisme cyberpunk",
        details: "Chaque style est crafté par nos designers experts"
      },
      {
        icon: "🗣️",
        title: "Chat IA Conversationnel",
        description: "Affinez votre design en langage naturel",
        details: "\"Ajoute plus de plantes\" ou \"Change la couleur du mur\""
      },
      {
        icon: "📱",
        title: "AR & 3D Preview",
        description: "Visualisez vos meubles en réalité augmentée",
        details: "Placez virtuellement chaque élément avant achat"
      },
      {
        icon: "🛒",
        title: "Shopping Intégré",
        description: "Achetez directement les meubles recommandés",
        details: "Partenariats avec +50 boutiques de mobilier"
      }
    ]
  },
  
  social_proof: {
    title: "Rejoingnez +10,000 Créateurs",
    subtitle: "Découvrez pourquoi XELDA devient la référence mondiale",
    
    testimonials: [
      {
        name: "Marie Dubois",
        role: "Architecte d'Intérieur",
        avatar: "/testimonials/marie.jpg",
        content: "XELDA a révolutionné mon processus créatif. Je peux maintenant présenter 5 options de design à mes clients en quelques minutes."
      },
      {
        name: "Ahmed Hassan",
        role: "Propriétaire",
        avatar: "/testimonials/ahmed.jpg",
        content: "J'ai économisé €3000 en frais de designer. Le résultat est bluffant, ma chambre est méconnaissable !"
      },
      {
        name: "Sophie Laurent",
        role: "Influenceuse Déco",
        avatar: "/testimonials/sophie.jpg",
        content: "Mes abonnés adorent mes transformations XELDA. C'est devenu ma signature créative."
      }
    ],
    
    stats: [
      { value: "10K+", label: "Créateurs Actifs" },
      { value: "50K+", label: "Designs Générés" },
      { value: "98%", label: "Satisfaction Client" },
      { value: "30s", label: "Temps Moyen" }
    ]
  },
  
  pricing_section: {
    title: "Choisissez Votre Aventure Créative",
    subtitle: "Plans flexibles pour tous les créateurs, des débutants aux professionnels",
    
    faq: [
      {
        question: "Puis-je changer de plan à tout moment ?",
        answer: "Absolument ! Vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre dashboard."
      },
      {
        question: "Que se passe-t-il si j'atteints mes limites ?",
        answer: "Vous recevrez une notification et pourrez soit attendre le mois suivant, soit upgrader instantanément."
      },
      {
        question: "Les designs sont-ils vraiment illimités en Premium ?",
        answer: "Oui, aucune restriction sur le nombre de designs, de styles ou de chat IA."
      },
      {
        question: "Puis-je utiliser XELDA commercialement ?",
        answer: "Les plans Pro et Premium incluent l'usage commercial. Le plan gratuit est strictement personnel."
      }
    ]
  },
  
  cta_final: {
    title: "Prêt à Transformer Votre Espace ?",
    subtitle: "Rejoignez des milliers de créateurs qui ont déjà révolutionné leur intérieur",
    cta_primary: "Commencer Maintenant",
    guarantee: "Garantie 30 jours satisfait ou remboursé"
  }
}

// Textes d'interface utilisateur
export const UI_COPY = {
  nav: {
    home: "Accueil",
    features: "Fonctionnalités",
    pricing: "Tarifs",
    gallery: "Galerie",
    blog: "Blog",
    about: "À Propos",
    contact: "Contact",
    signin: "Se connecter",
    signup: "S'inscrire",
    dashboard: "Dashboard"
  },
  
  auth: {
    signin: {
      title: "Bon Retour !",
      subtitle: "Connectez-vous pour continuer votre aventure créative",
      email_placeholder: "votre@email.com",
      password_placeholder: "Votre mot de passe",
      forgot_password: "Mot de passe oublié ?",
      no_account: "Pas encore de compte ?",
      signup_link: "Créer un compte",
      signin_button: "Se connecter",
      google_signin: "Continuer avec Google"
    },
    
    signup: {
      title: "Créez Votre Compte",
      subtitle: "Rejoignez la communauté des créateurs XELDA",
      name_placeholder: "Votre nom complet",
      email_placeholder: "votre@email.com",
      password_placeholder: "Choisissez un mot de passe fort",
      confirm_password_placeholder: "Confirmez votre mot de passe",
      terms_text: "En créant un compte, vous acceptez nos",
      terms_link: "Conditions d'utilisation",
      privacy_link: "Politique de confidentialité",
      signup_button: "Créer mon compte",
      already_account: "Déjà un compte ?",
      signin_link: "Se connecter"
    }
  },
  
  creator: {
    upload: {
      title: "Uploadez Votre Chambre",
      subtitle: "Glissez-déposez ou cliquez pour sélectionner",
      requirements: "Format: JPG, PNG • Taille max: 10MB • Résolution min: 800x600",
      processing: "Analyse de votre image en cours...",
      success: "Image analysée avec succès !"
    },
    
    styles: {
      title: "Choisissez Votre Style",
      subtitle: "Sélectionnez parmi nos styles signatures ou surprenez-vous",
      surprise_button: "Me Surprendre !",
      fusion_title: "Fusion de Styles",
      fusion_subtitle: "Combinez jusqu'à 3 styles pour un résultat unique"
    },
    
    results: {
      title: "Votre Nouvelle Chambre",
      subtitle: "Glissez pour comparer avant/après",
      download: "Télécharger",
      share: "Partager",
      edit: "Modifier",
      regenerate: "Régénérer",
      chat_placeholder: "Décrivez vos modifications...",
      chat_examples: [
        "Ajoute plus de plantes vertes",
        "Change la couleur du mur en bleu",
        "Remplace le lit par un lit king size",
        "Ajoute un fauteuil de lecture"
      ]
    }
  },
  
  gallery: {
    title: "Galerie d'Inspiration",
    subtitle: "Découvrez les créations de notre communauté",
    filters: {
      all: "Tous",
      trending: "Tendances",
      recent: "Récents",
      liked: "Mes Favoris"
    },
    search_placeholder: "Rechercher par style, couleur...",
    like_button: "Aimer",
    download_button: "Télécharger",
    view_button: "Voir les détails"
  },
  
  notifications: {
    design_ready: "Votre design est prêt !",
    quota_reached: "Limite mensuelle atteinte",
    welcome: "Bienvenue sur XELDA !",
    subscription_success: "Abonnement activé avec succès"
  },
  
  errors: {
    generic: "Une erreur s'est produite",
    network: "Problème de connexion",
    upload_failed: "Échec de l'upload",
    ai_error: "Erreur IA, veuillez réessayer",
    quota_exceeded: "Quota dépassé",
    subscription_required: "Abonnement requis"
  }
}
```

## 🏗️ Structure de Dossiers Next.js 14

```
xelda-ai-v2/
├── app/                          # App Router (Next.js 14)
│   ├── (auth)/                  # Route Group - Auth
│   │   ├── signin/
│   │   └── signup/
│   ├── (dashboard)/             # Route Group - Dashboard
│   │   ├── creator/             # Espace Créateur
│   │   ├── gallery/             # Galerie
│   │   ├── profile/             # Profil
│   │   └── settings/            # Paramètres
│   ├── (marketing)/             # Route Group - Marketing
│   │   ├── page.tsx             # Landing Page
│   │   ├── pricing/
│   │   └── about/
│   ├── api/                     # API Routes
│   │   ├── auth/
│   │   ├── ai/
│   │   ├── upload/
│   │   └── webhooks/
│   ├── globals.css
│   ├── layout.tsx               # Root Layout
│   └── loading.tsx              # Global Loading
├── components/                   # Composants
│   ├── ui/                      # ShadCN UI Base
│   ├── magicui/                 # Magic UI Components
│   ├── xelda/                   # Composants Spécifiques XELDA
│   │   ├── creator/             # Espace Créateur
│   │   ├── gallery/             # Galerie
│   │   ├── auth/                # Authentification
│   │   └── common/              # Composants Communs
│   └── providers/               # Context Providers
├── lib/                         # Utilitaires
│   ├── ai/                      # Services IA
│   ├── auth/                    # Configuration Auth
│   ├── db/                      # Database Utils
│   ├── utils.ts                 # Utilitaires généraux
│   └── validations/             # Schémas Zod
├── hooks/                       # Custom Hooks
├── stores/                      # Zustand Stores
├── types/                       # Types TypeScript
├── public/                      # Assets statiques
└── config/                      # Configurations
```

## 🔧 CONSTANTS & CONFIGURATION

### Design Styles Constants

```typescript
// constants/design-styles.ts
export const DESIGN_STYLES = [
  {
    id: 'minimalist',
    name: 'Minimaliste',
    description: 'Lignes épurées, couleurs neutres, espaces ouverts',
    thumbnail: '/styles/minimalist.jpg',
    colors: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#BDBDBD'],
    characteristics: ['clean', 'spacious', 'neutral', 'functional'],
    prompt_keywords: 'minimalist, clean, white, spacious, modern, simple',
    popularity: 95
  },
  {
    id: 'bohemian',
    name: 'Bohème',
    description: 'Textures riches, couleurs chaudes, éléments artisanaux',
    thumbnail: '/styles/bohemian.jpg',
    colors: ['#8B4513', '#CD853F', '#DEB887', '#F4A460'],
    characteristics: ['textured', 'warm', 'eclectic', 'artistic'],
    prompt_keywords: 'bohemian, boho, textiles, plants, warm colors, eclectic',
    popularity: 88
  },
  {
    id: 'scandinavian',
    name: 'Scandinave',
    description: 'Bois clair, hygge, fonctionnalité et confort',
    thumbnail: '/styles/scandinavian.jpg',
    colors: ['#F0F8FF', '#E6F3FF', '#DDEEFF', '#B8C5D1'],
    characteristics: ['cozy', 'functional', 'light', 'natural'],
    prompt_keywords: 'scandinavian, hygge, light wood, white, cozy, functional',
    popularity: 92
  },
  {
    id: 'industrial',
    name: 'Industriel',
    description: 'Métal, béton, couleurs sombres, style urbain',
    thumbnail: '/styles/industrial.jpg',
    colors: ['#2F2F2F', '#404040', '#606060', '#808080'],
    characteristics: ['raw', 'urban', 'metallic', 'exposed'],
    prompt_keywords: 'industrial, metal, concrete, dark, urban, exposed brick',
    popularity: 79
  },
  {
    id: 'luxury',
    name: 'Luxe',
    description: 'Matériaux nobles, or, velours, élégance raffinée',
    thumbnail: '/styles/luxury.jpg',
    colors: ['#FFD700', '#B8860B', '#8B7500', '#556B2F'],
    characteristics: ['elegant', 'opulent', 'refined', 'premium'],
    prompt_keywords: 'luxury, gold, velvet, elegant, premium, sophisticated',
    popularity: 85
  },
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Formes géométriques, technologies, couleurs vives',
    thumbnail: '/styles/modern.jpg',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    characteristics: ['geometric', 'tech', 'colorful', 'contemporary'],
    prompt_keywords: 'modern, contemporary, geometric, technology, colorful',
    popularity: 90
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Antiquités, patine, couleurs passées, nostalgie',
    thumbnail: '/styles/vintage.jpg',
    colors: ['#D2B48C', '#BC9A6A', '#A0522D', '#8B4513'],
    characteristics: ['nostalgic', 'aged', 'classic', 'timeless'],
    prompt_keywords: 'vintage, antique, retro, aged, classic, nostalgic',
    popularity: 73
  },
  {
    id: 'gamer',
    name: 'Gamer',
    description: 'LED, RGB, noir et rouge, setup gaming immersif',
    thumbnail: '/styles/gamer.jpg',
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FF00FF'],
    characteristics: ['rgb', 'tech', 'immersive', 'energetic'],
    prompt_keywords: 'gaming, RGB, LED, neon, black, red, tech setup',
    popularity: 82
  },
  {
    id: 'futuristic',
    name: 'Futuriste',
    description: 'Formes organiques, hologrammes, blanc et chrome',
    thumbnail: '/styles/futuristic.jpg',
    colors: ['#C0C0C0', '#E5E5E5', '#F0F0F0', '#FFFFFF'],
    characteristics: ['organic', 'tech', 'sleek', 'innovative'],
    prompt_keywords: 'futuristic, sci-fi, organic shapes, chrome, white, technology',
    popularity: 77
  },
  {
    id: 'rustic',
    name: 'Rustique',
    description: 'Bois brut, pierre naturelle, ambiance campagne',
    thumbnail: '/styles/rustic.jpg',
    colors: ['#8B4513', '#A0522D', '#CD853F', '#D2B48C'],
    characteristics: ['natural', 'rough', 'country', 'authentic'],
    prompt_keywords: 'rustic, wood, stone, country, natural, rough textures',
    popularity: 71
  }
] as const

// Style Fusion Combinations
export const STYLE_FUSION_PRESETS = [
  {
    id: 'modern-minimalist',
    name: 'Minimalisme Moderne',
    styles: ['minimalist', 'modern'],
    description: 'Épuré avec des touches contemporaines'
  },
  {
    id: 'luxury-vintage',
    name: 'Luxe Vintage',
    styles: ['luxury', 'vintage'],
    description: 'Élégance intemporelle et raffinement'
  },
  {
    id: 'scandinavian-bohemian',
    name: 'Scandi-Bohème',
    styles: ['scandinavian', 'bohemian'],
    description: 'Hygge avec une touche artistique'
  },
  {
    id: 'gamer-futuristic',
    name: 'Cyber Gaming',
    styles: ['gamer', 'futuristic'],
    description: 'Setup gaming de science-fiction'
  }
]
```

### Application Constants

```typescript
// constants/app.ts
export const APP_CONFIG = {
  name: 'XELDA',
  version: '2.0.0',
  description: 'Design d\'intérieur alimenté par l\'IA',
  url: 'https://xelda.ai',
  
  // Limites techniques
  limits: {
    image: {
      maxSize: 10 * 1024 * 1024, // 10MB
      minResolution: { width: 800, height: 600 },
      maxResolution: { width: 4096, height: 4096 },
      allowedFormats: ['jpeg', 'jpg', 'png', 'webp']
    },
    generation: {
      timeoutMs: 120000, // 2 minutes
      maxRetries: 3,
      concurrentJobs: 5
    }
  },
  
  // Métriques business
  metrics: {
    targetMRR: 20000, // €20K
    freemiumConversion: 0.15, // 15%
    churnRateTarget: 0.05, // 5% monthly
    avgRevenuePerUser: 25 // €25/month
  },
  
  // Fonctionnalités par environnement
  features: {
    development: {
      aiMockMode: true,
      debugMode: true,
      analytics: false
    },
    production: {
      aiMockMode: false,
      debugMode: false,
      analytics: true
    }
  }
}

export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  PRICING: '/pricing',
  FEATURES: '/features',
  SHOWCASE: '/showcase',
  BLOG: '/blog',
  CONTACT: '/contact',
  
  // Auth routes
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  CREATOR: '/creator',
  GALLERY: '/gallery',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  SUBSCRIPTION: '/subscription',
  
  // Legal
  PRIVACY: '/legal/privacy',
  TERMS: '/legal/terms',
  COOKIES: '/legal/cookies'
} as const

export const API_ENDPOINTS = {
  // Auth
  AUTH_SIGNIN: '/api/auth/signin',
  AUTH_SIGNUP: '/api/auth/signup',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_SESSION: '/api/auth/session',
  
  // AI Services
  AI_ANALYZE: '/api/ai/analyze-furniture',
  AI_GENERATE: '/api/ai/generate-design',
  AI_CHAT: '/api/ai/chat',
  AI_STYLE_FUSION: '/api/ai/style-fusion',
  
  // Upload
  UPLOAD_IMAGE: '/api/upload/image',
  UPLOAD_AVATAR: '/api/upload/avatar',
  
  // Projects
  PROJECTS: '/api/projects',
  PROJECTS_PUBLIC: '/api/projects/public',
  
  // Gallery
  GALLERY: '/api/gallery',
  GALLERY_TRENDING: '/api/gallery/trending',
  GALLERY_SEARCH: '/api/gallery/search',
  
  // Profile
  PROFILE: '/api/profile',
  PROFILE_STYLE_PREFERENCES: '/api/profile/style-preferences',
  
  // Subscription
  SUBSCRIPTION_CREATE: '/api/subscription/create-session',
  SUBSCRIPTION_PORTAL: '/api/subscription/portal',
  SUBSCRIPTION_STATUS: '/api/subscription/status',
  
  // Webhooks
  WEBHOOK_FEDAPAY: '/api/webhooks/fedapay',
  WEBHOOK_SUPABASE: '/api/webhooks/supabase'
} as const
```

### Validation Schemas (Zod)

```typescript
// lib/validations/index.ts
import { z } from 'zod'

// Auth schemas
export const signInSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Au moins 8 caractères')
})

export const signUpSchema = z.object({
  name: z.string().min(2, 'Au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string()
    .min(8, 'Au moins 8 caractères')
    .regex(/[A-Z]/, 'Au moins une majuscule')
    .regex(/[a-z]/, 'Au moins une minuscule')
    .regex(/[0-9]/, 'Au moins un chiffre'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
})

// Project schemas
export const createProjectSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(100, 'Maximum 100 caractères'),
  originalImageUrl: z.string().url('URL d\'image invalide'),
  styleId: z.string().min(1, 'Style requis'),
  isPublic: z.boolean().default(false),
  customPrompt: z.string().max(500, 'Maximum 500 caractères').optional()
})

// AI schemas
export const generateDesignSchema = z.object({
  imageUrl: z.string().url('URL d\'image invalide'),
  styleId: z.string().min(1, 'Style requis'),
  customPrompt: z.string().max(500).optional(),
  strength: z.number().min(0.1).max(1.0).default(0.8),
  seed: z.number().optional()
})

export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message requis').max(1000, 'Maximum 1000 caractères'),
  projectId: z.string().uuid('ID projet invalide'),
  imageContext: z.string().url().optional()
})

// Profile schemas
export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Au moins 2 caractères').optional(),
  bio: z.string().max(500, 'Maximum 500 caractères').optional(),
  website: z.string().url('URL invalide').optional(),
  location: z.string().max(100, 'Maximum 100 caractères').optional(),
  stylePreferences: z.array(z.string()).max(5, 'Maximum 5 styles').optional()
})

// Upload schema
export const uploadImageSchema = z.object({
  file: z.any()
    .refine((file) => file instanceof File, 'Fichier requis')
    .refine((file) => file.size <= 10 * 1024 * 1024, 'Fichier trop volumineux (10MB max)')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Format non supporté (JPEG, PNG, WebP uniquement)'
    )
})

// Subscription schemas
export const createSubscriptionSchema = z.object({
  planId: z.enum(['pro', 'premium', 'enterprise']),
  interval: z.enum(['month', 'year']).default('month'),
  currency: z.enum(['EUR', 'XOF']).default('EUR')
})

// Gallery schemas
export const gallerySearchSchema = z.object({
  query: z.string().optional(),
  style: z.string().optional(),
  sortBy: z.enum(['recent', 'popular', 'trending']).default('recent'),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(20)
})

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type GenerateDesignInput = z.infer<typeof generateDesignSchema>
export type ChatMessageInput = z.infer<typeof chatMessageSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type UploadImageInput = z.infer<typeof uploadImageSchema>
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>
export type GallerySearchInput = z.infer<typeof gallerySearchSchema>
```

## 🎭 Pages & Fonctionnalités Principales

### 1. Landing Page (`/`)
```typescript
// Utiliser Magic UI pour un impact visuel maximum
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-xelda-dark to-xelda-gray">
      {/* Hero Section avec Magic UI */}
      <HeroVideoDialog
        className="dark"
        animationStyle="from-center"
        videoSrc="/hero-video.mp4"
        thumbnailSrc="/hero-thumbnail.jpg"
        thumbnailAlt="XELDA AI Demo"
      />
      
      {/* Features avec Bento Grid */}
      <BentoGrid className="max-w-7xl mx-auto">
        {/* Feature cards avec animations */}
      </BentoGrid>
      
      {/* CTA avec Shimmer Button */}
      <ShimmerButton className="shadow-2xl">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Commencer Gratuitement
        </span>
      </ShimmerButton>
    </div>
  )
}
```

### 2. Espace Créateur (`/creator`)
```typescript
// Interface principale de création avec Magic UI
export default function CreatorSpace() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Zone Upload avec Magic UI FileUpload */}
      <Card className="lg:col-span-2">
        <FileUpload onChange={handleImageUpload} />
        <BorderBeam size={250} duration={12} delay={9} />
      </Card>
      
      {/* Panneau de Styles */}
      <Card className="space-y-4">
        <SparklesText text="Choisir un Style" />
        <StyleSelector styles={DESIGN_STYLES} />
      </Card>
      
      {/* Résultats avec Animated Beam */}
      <Card className="lg:col-span-3">
        <AnimatedBeam
          className="absolute inset-0"
          from="#upload"
          to="#result"
        />
        <BeforeAfterComparator />
      </Card>
    </div>
  )
}
```

### 3. Galerie Communautaire (`/gallery`)
```typescript
// Galerie sociale avec animations fluides
export default function Gallery() {
  return (
    <div className="space-y-8">
      {/* Header avec Typing Animation */}
      <TypingAnimation
        className="text-4xl font-bold"
        text="Découvrez l'Inspiration"
      />
      
      {/* Galerie avec Marquee pour tendances */}
      <Marquee pauseOnHover className="[--duration:20s]">
        {trendingDesigns.map((design) => (
          <DesignCard key={design.id} design={design} />
        ))}
      </Marquee>
      
      {/* Grille principale avec Blur In */}
      <BlurIn>
        <MasonryGrid designs={allDesigns} />
      </BlurIn>
    </div>
  )
}
```

## 📱 TYPES TYPESCRIPT COMPLETS

### Types Core Application

```typescript
// types/index.ts
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  username?: string
  bio?: string
  website?: string
  location?: string
  style_preferences?: string[]
  subscription_tier: 'free' | 'pro' | 'premium' | 'enterprise'
  quota_used: number
  created_at: string
  updated_at?: string
}

export interface Project {
  id: string
  user_id: string
  title: string
  description?: string
  original_image_url: string
  generated_images: GeneratedImage[]
  style_applied: string
  custom_prompt?: string
  ai_analysis?: FurnitureAnalysis
  is_public: boolean
  likes_count: number
  downloads_count: number
  created_at: string
  updated_at?: string
  
  // Relations
  user?: User
  likes?: ProjectLike[]
  comments?: ProjectComment[]
}

export interface GeneratedImage {
  id: string
  url: string
  prompt_used: string
  generation_params: GenerationParams
  quality: 'standard' | 'high' | '4k' | '8k'
  created_at: string
}

export interface GenerationParams {
  style_id: string
  strength: number
  seed?: number
  resolution: { width: number; height: number }
  model_version: string
}

export interface DesignStyle {
  id: string
  name: string
  description: string
  thumbnail: string
  colors: string[]
  characteristics: string[]
  prompt_keywords: string
  popularity: number
  is_premium?: boolean
}

export interface FurnitureAnalysis {
  items: FurnitureItem[]
  room_analysis: RoomAnalysis
  recommendations: string[]
  color_palette: ColorPalette
  lighting_analysis: LightingAnalysis
}

export interface FurnitureItem {
  id: string
  name: string
  category: 'bed' | 'dresser' | 'nightstand' | 'chair' | 'desk' | 'decoration' | 'lighting'
  position: { x: number; y: number; width: number; height: number }
  color: string
  material?: string
  style?: string
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  keep_recommendation: boolean
  replacement_suggestions?: ProductSuggestion[]
}

export interface RoomAnalysis {
  size: 'small' | 'medium' | 'large'
  shape: 'square' | 'rectangular' | 'irregular'
  lighting_type: 'natural' | 'artificial' | 'mixed'
  dominant_colors: string[]
  style: string
  issues?: string[]
  opportunities?: string[]
}

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  neutral: string
  harmony_score: number
  mood: 'warm' | 'cool' | 'neutral' | 'vibrant'
}

export interface LightingAnalysis {
  overall_brightness: 'dark' | 'dim' | 'bright' | 'very_bright'
  natural_light_sources: number
  artificial_light_sources: number
  light_quality: 'poor' | 'fair' | 'good' | 'excellent'
  recommendations: string[]
}

export interface ProductSuggestion {
  name: string
  brand: string
  price: number
  currency: string
  image_url: string
  purchase_url: string
  rating: number
  style_match: number
}

export interface ChatMessage {
  id: string
  project_id: string
  user_id: string
  content: string
  role: 'user' | 'assistant'
  image_context?: string
  created_at: string
}

export interface ProjectLike {
  id: string
  project_id: string
  user_id: string
  created_at: string
}

export interface ProjectComment {
  id: string
  project_id: string
  user_id: string
  content: string
  created_at: string
  user?: User
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: 'active' | 'inactive' | 'cancelled' | 'past_due'
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
}

export interface Usage {
  id: string
  user_id: string
  action: 'design_generation' | 'ai_chat' | 'gallery_upload'
  count: number
  period_start: string
  period_end: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Form Types
export interface UploadState {
  isUploading: boolean
  progress: number
  error?: string
  uploadedUrl?: string
}

export interface GenerationState {
  isGenerating: boolean
  progress: number
  error?: string
  currentStep?: string
}

// Analytics Types
export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp: string
  user_id?: string
}

export interface PerformanceMetrics {
  generation_time: number
  upload_time: number
  analysis_time: number
  total_time: number
}
```

### Store Types (Zustand)

```typescript
// types/stores.ts
export interface DesignStore {
  // State
  currentProject: Project | null
  uploadedImage: string | null
  selectedStyle: DesignStyle | null
  generatedImages: GeneratedImage[]
  analysisResult: FurnitureAnalysis | null
  chatMessages: ChatMessage[]
  isGenerating: boolean
  uploadProgress: number
  
  // Actions
  setUploadedImage: (url: string) => void
  setSelectedStyle: (style: DesignStyle) => void
  generateDesign: (params: GenerationParams) => Promise<void>
  analyzeImage: (imageUrl: string) => Promise<void>
  sendChatMessage: (message: string) => Promise<void>
  saveProject: (project: Partial<Project>) => Promise<void>
  reset: () => void
}

export interface AuthStore {
  // State
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: SignUpInput) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: UpdateProfileInput) => Promise<void>
  fetchUser: () => Promise<void>
}

export interface GalleryStore {
  // State
  projects: Project[]
  trendingProjects: Project[]
  filters: {
    style?: string
    sortBy: 'recent' | 'popular' | 'trending'
  }
  isLoading: boolean
  hasMore: boolean
  
  // Actions
  fetchProjects: (filters?: any) => Promise<void>
  fetchTrending: () => Promise<void>
  likeProject: (projectId: string) => Promise<void>
  searchProjects: (query: string) => Promise<void>
  setFilters: (filters: any) => void
}

export interface SubscriptionStore {
  // State
  currentPlan: PricingPlan | null
  usage: Usage[]
  isLoading: boolean
  
  // Actions
  fetchSubscription: () => Promise<void>
  fetchUsage: () => Promise<void>
  createSubscription: (data: CreateSubscriptionInput) => Promise<void>
  cancelSubscription: () => Promise<void>
}
```

## 🛠️ API ROUTES DÉTAILLÉES

### Authentication API

```typescript
// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { signInSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = signInSchema.parse(body)
    
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: { user: data.user, session: data.session }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Données invalides' },
      { status: 400 }
    )
  }
}

// app/api/auth/signup/route.ts
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name } = signUpSchema.parse(body)
    
    const supabase = createRouteHandlerClient({ cookies })
    
    // Create user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })
    
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }
    
    // Create profile
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        username: email.split('@')[0],
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.id}`,
        subscription_tier: 'free',
        quota_used: 0
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Compte créé avec succès. Vérifiez votre email.'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du compte' },
      { status: 500 }
    )
  }
}
```

### AI Generation API

```typescript
// app/api/ai/generate-design/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { generateDesignSchema } from '@/lib/validations'
import { aiService } from '@/lib/ai'
import { checkQuota, incrementUsage } from '@/lib/quota'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      )
    }
    
    const body = await req.json()
    const params = generateDesignSchema.parse(body)
    
    // Check quota
    const canGenerate = await checkQuota(session.user.id, 'design_generation')
    if (!canGenerate) {
      return NextResponse.json(
        { success: false, error: 'Quota mensuel atteint' },
        { status: 403 }
      )
    }
    
    // Generate design
    const result = await aiService.generateDesign({
      imageUrl: params.imageUrl,
      styleId: params.styleId,
      customPrompt: params.customPrompt,
      strength: params.strength,
      seed: params.seed
    })
    
    // Increment usage
    await incrementUsage(session.user.id, 'design_generation')
    
    return NextResponse.json({
      success: true,
      data: result
    })
    
  } catch (error: any) {
    console.error('Design generation error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur de génération' },
      { status: 500 }
    )
  }
}

// app/api/ai/analyze-furniture/route.ts
export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      )
    }
    
    const { imageUrl, mimeType } = await req.json()
    
    if (!imageUrl || !mimeType) {
      return NextResponse.json(
        { success: false, error: 'Image et type MIME requis' },
        { status: 400 }
      )
    }
    
    const analysis = await aiService.analyzeFurniture(imageUrl, mimeType)
    
    return NextResponse.json({
      success: true,
      data: analysis
    })
    
  } catch (error: any) {
    console.error('Furniture analysis error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur d\'analyse' },
      { status: 500 }
    )
  }
}

// app/api/ai/chat/route.ts
export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      )
    }
    
    const body = await req.json()
    const { message, projectId, imageContext } = chatMessageSchema.parse(body)
    
    // Check quota
    const canChat = await checkQuota(session.user.id, 'ai_chat')
    if (!canChat) {
      return NextResponse.json(
        { success: false, error: 'Quota de chat IA atteint' },
        { status: 403 }
      )
    }
    
    // Save user message
    const { data: userMessage } = await supabase
      .from('ai_conversations')
      .insert({
        project_id: projectId,
        user_id: session.user.id,
        content: message,
        role: 'user',
        image_context: imageContext
      })
      .select()
      .single()
    
    // Generate AI response
    const aiResponse = await aiService.chatWithAI({
      message,
      projectId,
      imageContext,
      userId: session.user.id
    })
    
    // Save AI response
    const { data: assistantMessage } = await supabase
      .from('ai_conversations')
      .insert({
        project_id: projectId,
        user_id: session.user.id,
        content: aiResponse.content,
        role: 'assistant'
      })
      .select()
      .single()
    
    // Increment usage
    await incrementUsage(session.user.id, 'ai_chat')
    
    return NextResponse.json({
      success: true,
      data: {
        userMessage,
        assistantMessage
      }
    })
    
  } catch (error: any) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur de chat IA' },
      { status: 500 }
    )
  }
}
```

### Projects API

```typescript
// app/api/projects/route.ts
export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      )
    }
    
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '20')
    const offset = (page - 1) * limit
    
    const { data: projects, error } = await supabase
      .from('projects')
      .select(`
        *,
        user:profiles(id, username, avatar_url),
        likes:project_likes(count),
        _count:project_likes(count)
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (error) throw error
    
    const { count } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
    
    return NextResponse.json({
      success: true,
      data: {
        projects,
        pagination: {
          page,
          limit,
          total: count || 0,
          hasMore: (count || 0) > offset + limit
        }
      }
    })
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      )
    }
    
    const body = await req.json()
    const projectData = createProjectSchema.parse(body)
    
    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        ...projectData,
        user_id: session.user.id
      })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({
      success: true,
      data: project
    })
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
```

## 🤖 Services IA Modernisés

### Architecture IA Modulaire
```typescript
// lib/ai/providers/interface.ts
export interface AIProvider {
  analyzeFurniture(image: string): Promise<FurnitureAnalysis>
  generateDesign(params: DesignParams): Promise<DesignResult>
  chatWithAI(message: string, context: ChatContext): Promise<ChatResponse>
}

// lib/ai/providers/gemini.ts
export class GeminiProvider implements AIProvider {
  // Implémentation Gemini avec error handling avancé
}

// lib/ai/providers/openai.ts
export class OpenAIProvider implements AIProvider {
  // Implémentation OpenAI comme backup
}

// lib/ai/index.ts
export const aiService = new AIProviderManager({
  primary: new GeminiProvider(),
  fallback: new OpenAIProvider()
})
```

### Prompts Optimisés
```typescript
// lib/ai/prompts.ts
export const PROMPTS = {
  FURNITURE_ANALYSIS: `
    Analysez cette image de chambre et identifiez :
    - Tous les meubles présents
    - Style architectural
    - Palette de couleurs dominante
    - Éclairage et ambiance
    - Recommandations d'amélioration
    
    Retournez un JSON structuré selon le schéma FurnitureAnalysis.
  `,
  
  DESIGN_GENERATION: `
    Générez un design {style} pour cette chambre en tenant compte :
    - Du mobilier existant à conserver
    - De la palette couleur {palette}
    - Des contraintes spatiales
    - Du budget estimé {budget}
    
    Proposez des modifications réalistes et esthétiques.
  `
}
```

## 🗄️ Base de Données Supabase

### Schéma Principal
```sql
-- Utilisateurs avec profils étendus
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  style_preferences JSONB,
  subscription_tier TEXT DEFAULT 'free',
  quota_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projets de design
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  original_image_url TEXT,
  generated_images JSONB,
  style_applied TEXT,
  ai_analysis JSONB,
  is_public BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Galerie publique et interactions
CREATE TABLE gallery_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  project_id UUID REFERENCES projects(id),
  interaction_type TEXT, -- 'like', 'download', 'share'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat IA et historique
CREATE TABLE ai_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  project_id UUID REFERENCES projects(id),
  messages JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 Composants XELDA Spécifiques

### 1. Sélecteur de Style avec Magic UI
```typescript
// components/xelda/style-selector.tsx
import { cn } from "@/lib/utils"
import { BorderBeam } from "@/components/magicui/border-beam"

export function StyleSelector({ styles, onSelect, selectedStyle }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {styles.map((style) => (
        <Card 
          key={style.id}
          className={cn(
            "relative cursor-pointer transition-all duration-300 hover:scale-105",
            selectedStyle?.id === style.id && "ring-2 ring-xelda-gold"
          )}
          onClick={() => onSelect(style)}
        >
          <div className="aspect-square relative">
            <Image 
              src={style.thumbnail} 
              alt={style.name}
              fill
              className="object-cover rounded-lg"
            />
            {selectedStyle?.id === style.id && (
              <BorderBeam size={250} duration={12} delay={9} />
            )}
          </div>
          <div className="p-3">
            <h3 className="font-semibold">{style.name}</h3>
            <p className="text-sm text-muted-foreground">{style.description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
```

### 2. Comparateur Avant/Après Animé
```typescript
// components/xelda/before-after-comparator.tsx
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { BlurIn } from "@/components/magicui/blur-in"

export function BeforeAfterComparator({ beforeImage, afterImage }: Props) {
  const [position, setPosition] = useState([50])
  
  return (
    <BlurIn>
      <div className="relative aspect-video overflow-hidden rounded-lg">
        {/* Image Before */}
        <Image 
          src={beforeImage} 
          alt="Avant" 
          fill 
          className="object-cover"
        />
        
        {/* Image After avec clip-path animé */}
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{ clipPath: `inset(0 ${100 - position[0]}% 0 0)` }}
        >
          <Image 
            src={afterImage} 
            alt="Après" 
            fill 
            className="object-cover"
          />
        </div>
        
        {/* Slider Control */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64">
          <Slider
            value={position}
            onValueChange={setPosition}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </BlurIn>
  )
}
```

### 3. Chat IA Intégré
```typescript
// components/xelda/ai-chat.tsx
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { ShimmerButton } from "@/components/magicui/shimmer-button"

export function AIChatPanel({ projectId }: Props) {
  return (
    <Card className="h-96 flex flex-col">
      <CardHeader>
        <TypingAnimation text="Assistant IA XELDA" />
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </CardContent>
      
      <CardFooter>
        <div className="flex w-full gap-2">
          <Input 
            placeholder="Décrivez vos modifications..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <ShimmerButton onClick={sendMessage}>
            Envoyer
          </ShimmerButton>
        </div>
      </CardFooter>
    </Card>
  )
}
```

## 🔐 Authentification & Quotas

### Configuration Supabase Auth
```typescript
// lib/auth/supabase.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`
    }
  })
  
  if (data.user) {
    // Créer le profil utilisateur
    await createUserProfile(data.user.id)
  }
  
  return { data, error }
}
```

### Système de Quotas
```typescript
// lib/quotas.ts
export const QUOTA_LIMITS = {
  free: {
    monthly_generations: 5,
    ai_chat_messages: 20,
    gallery_uploads: 3
  },
  pro: {
    monthly_generations: 100,
    ai_chat_messages: 500,
    gallery_uploads: 50
  },
  premium: {
    monthly_generations: -1, // Unlimited
    ai_chat_messages: -1,
    gallery_uploads: -1
  }
}

export async function checkQuota(userId: string, action: QuotaAction) {
  const profile = await getUserProfile(userId)
  const usage = await getMonthlyUsage(userId)
  
  const limit = QUOTA_LIMITS[profile.subscription_tier][action]
  
  if (limit === -1) return true // Unlimited
  return usage[action] < limit
}
```

## 💰 Intégration Paiements

### FedaPay Setup
```typescript
// lib/payments/fedapay.ts
import FedaPay from 'fedapay'

FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY)
FedaPay.setEnvironment('live') // ou 'sandbox'

export async function createPaymentSession(amount: number, currency = 'XOF') {
  const transaction = await FedaPay.Transaction.create({
    amount,
    currency,
    description: 'Abonnement XELDA Pro',
    callback_url: `${process.env.NEXT_PUBLIC_URL}/api/webhooks/fedapay`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?cancelled=true`
  })
  
  return transaction.generateToken()
}
```

## 📱 Responsive & Performance

### Optimisations Next.js 14
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: '*.supabase.co' },
      { hostname: '*.googleapis.com' }
    ]
  },
  experimental: {
    ppr: true, // Partial Prerendering
    reactCompiler: true
  }
}
```

### Performance Magic UI
```typescript
// components/magicui/optimized.tsx
import { lazy, Suspense } from 'react'

// Lazy loading pour composants lourds
const HeavyMagicComponent = lazy(() => import('./heavy-component'))

export function OptimizedMagicUI() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-64" />}>
      <HeavyMagicComponent />
    </Suspense>
  )
}
```

## 🚀 Déploiement & CI/CD

### Vercel Configuration
```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "SUPABASE_URL": "@supabase-url",
    "SUPABASE_ANON_KEY": "@supabase-anon-key",
    "GEMINI_API_KEY": "@gemini-api-key"
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### Variables d'Environnement
```env
# .env.example
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

GEMINI_API_KEY=your-gemini-api-key
OPENAI_API_KEY=your-openai-api-key

FEDAPAY_PUBLIC_KEY=pk_live_your-public-key
FEDAPAY_SECRET_KEY=sk_live_your-secret-key

NEXT_PUBLIC_URL=https://xelda-ai.com
```

## 📋 Checklist de Développement

### Phase 1: Setup & Base
- [ ] Initialiser Next.js 14 avec TypeScript
- [ ] Installer ShadCN UI + Magic UI
- [ ] Configurer Tailwind avec thème XELDA
- [ ] Setup Supabase Auth + Database
- [ ] Créer structure de dossiers

### Phase 2: Core Features
- [ ] Landing page avec Magic UI
- [ ] Authentification complète
- [ ] Espace créateur base
- [ ] Upload d'images
- [ ] Intégration IA (Gemini)
- [ ] Système de styles

### Phase 3: Fonctionnalités Avancées
- [ ] Galerie communautaire
- [ ] Chat IA intégré
- [ ] Comparateur avant/après
- [ ] Profils utilisateurs
- [ ] Système de quotas

### Phase 4: Business
- [ ] Intégration paiements FedaPay
- [ ] Analytics et métriques
- [ ] Optimisations performance
- [ ] Tests et débogage
- [ ] Déploiement production

## 🔧 Scripts de Développement

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "supabase gen types typescript --local > types/supabase.ts",
    "db:reset": "supabase db reset --local",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## 📚 Ressources & Documentation

### Magic UI Resources
- [Magic UI Documentation](https://magicui.design/docs)
- [Component Examples](https://magicui.design/docs/components)
- [Animation Presets](https://magicui.design/docs/animations)

### ShadCN UI Resources
- [ShadCN Documentation](https://ui.shadcn.com)
- [Component Library](https://ui.shadcn.com/docs/components)
- [Theme Customization](https://ui.shadcn.com/docs/theming)

### Next.js 14 Resources
- [App Router Guide](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## 🎯 Objectifs de Performance

### Métriques Cibles
- **Lighthouse Score**: 95+ sur toutes les pages
- **Core Web Vitals**: Tous verts
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

### Optimisations Clés
- Server Components par défaut
- Image optimization automatique
- Lazy loading des composants Magic UI
- Code splitting intelligent
- Mise en cache agressive

## 📊 ANALYTICS & MONITORING

### Analytics Setup

```typescript
// lib/analytics.ts
import { AnalyticsEvent, PerformanceMetrics } from '@/types'

class Analytics {
  private events: AnalyticsEvent[] = []
  
  track(event: string, properties: Record<string, any> = {}) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      },
      timestamp: new Date().toISOString(),
      user_id: this.getCurrentUserId()
    }
    
    // Send to analytics service
    this.sendToAnalytics(analyticsEvent)
    
    // Store locally for offline sync
    this.events.push(analyticsEvent)
  }
  
  trackPerformance(operation: string, startTime: number, endTime: number) {
    this.track('performance', {
      operation,
      duration: endTime - startTime,
      timestamp: startTime
    })
  }
  
  trackError(error: Error, context: Record<string, any> = {}) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      ...context
    })
  }
  
  private async sendToAnalytics(event: AnalyticsEvent) {
    // Implementation for your analytics provider
    if (process.env.NODE_ENV === 'production') {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event)
        })
      } catch (error) {
        console.warn('Analytics tracking failed:', error)
      }
    }
  }
  
  private getCurrentUserId(): string | undefined {
    // Get from auth context or local storage
    return localStorage.getItem('user_id') || undefined
  }
}

export const analytics = new Analytics()

// Event tracking helpers
export const trackEvent = {
  // User actions
  signup: () => analytics.track('user_signup'),
  signin: () => analytics.track('user_signin'),
  subscription: (plan: string) => analytics.track('subscription_created', { plan }),
  
  // Design actions
  imageUpload: () => analytics.track('image_uploaded'),
  styleSelected: (styleId: string) => analytics.track('style_selected', { styleId }),
  designGenerated: (styleId: string, generationTime: number) => 
    analytics.track('design_generated', { styleId, generationTime }),
  
  // Social actions
  projectLiked: (projectId: string) => analytics.track('project_liked', { projectId }),
  projectShared: (projectId: string) => analytics.track('project_shared', { projectId }),
  
  // Business metrics
  quotaReached: (quotaType: string) => analytics.track('quota_reached', { quotaType }),
  upgradePrompted: (from: string, to: string) => analytics.track('upgrade_prompted', { from, to })
}
```

### Performance Monitoring

```typescript
// lib/performance.ts
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }
  
  measureAsync<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now()
    
    return fn()
      .then(result => {
        const endTime = performance.now()
        analytics.trackPerformance(operation, startTime, endTime)
        return result
      })
      .catch(error => {
        const endTime = performance.now()
        analytics.trackPerformance(operation, startTime, endTime)
        analytics.trackError(error, { operation })
        throw error
      })
  }
  
  measureSync<T>(operation: string, fn: () => T): T {
    const startTime = performance.now()
    try {
      const result = fn()
      const endTime = performance.now()
      analytics.trackPerformance(operation, startTime, endTime)
      return result
    } catch (error) {
      const endTime = performance.now()
      analytics.trackPerformance(operation, startTime, endTime)
      analytics.trackError(error as Error, { operation })
      throw error
    }
  }
}

export const monitor = PerformanceMonitor.getInstance()
```

## 🧪 TESTING STRATEGY

### Test Configuration

```typescript
// jest.config.js
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/stories/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

module.exports = config

// jest.setup.js
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({ data: [], error: null })),
      insert: jest.fn(() => ({ data: {}, error: null })),
      update: jest.fn(() => ({ data: {}, error: null })),
      delete: jest.fn(() => ({ data: {}, error: null })),
    })),
  },
}))
```

### Component Tests

```typescript
// __tests__/components/StyleSelector.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { StyleSelector } from '@/components/xelda/style-selector'
import { DESIGN_STYLES } from '@/constants/design-styles'

describe('StyleSelector', () => {
  const mockOnSelect = jest.fn()
  
  beforeEach(() => {
    mockOnSelect.mockClear()
  })
  
  it('renders all design styles', () => {
    render(
      <StyleSelector 
        styles={DESIGN_STYLES} 
        onSelect={mockOnSelect}
        selectedStyle={null}
      />
    )
    
    DESIGN_STYLES.forEach(style => {
      expect(screen.getByText(style.name)).toBeInTheDocument()
      expect(screen.getByText(style.description)).toBeInTheDocument()
    })
  })
  
  it('calls onSelect when style is clicked', () => {
    render(
      <StyleSelector 
        styles={DESIGN_STYLES} 
        onSelect={mockOnSelect}
        selectedStyle={null}
      />
    )
    
    fireEvent.click(screen.getByText('Minimaliste'))
    expect(mockOnSelect).toHaveBeenCalledWith(DESIGN_STYLES[0])
  })
  
  it('highlights selected style', () => {
    render(
      <StyleSelector 
        styles={DESIGN_STYLES} 
        onSelect={mockOnSelect}
        selectedStyle={DESIGN_STYLES[0]}
      />
    )
    
    const selectedCard = screen.getByText('Minimaliste').closest('.relative')
    expect(selectedCard).toHaveClass('ring-2', 'ring-xelda-gold')
  })
})

// __tests__/api/auth/signin.test.ts
import { POST } from '@/app/api/auth/signin/route'
import { NextRequest } from 'next/server'

describe('/api/auth/signin', () => {
  it('returns success for valid credentials', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    })
    
    const response = await POST(req)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })
  
  it('returns error for invalid email', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: 'invalid-email',
        password: 'password123'
      })
    })
    
    const response = await POST(req)
    const data = await response.json()
    
    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('Email invalide')
  })
})
```

### E2E Tests (Playwright)

```typescript
// e2e/design-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Design Creation Flow', () => {
  test('complete design creation process', async ({ page }) => {
    // Login
    await page.goto('/signin')
    await page.fill('[data-testid=email]', 'test@example.com')
    await page.fill('[data-testid=password]', 'password123')
    await page.click('[data-testid=signin-button]')
    
    // Navigate to creator
    await page.goto('/creator')
    await expect(page).toHaveURL('/creator')
    
    // Upload image
    await page.setInputFiles('[data-testid=image-upload]', './fixtures/bedroom.jpg')
    await expect(page.locator('[data-testid=upload-success]')).toBeVisible()
    
    // Select style
    await page.click('[data-testid=style-minimalist]')
    await expect(page.locator('[data-testid=style-minimalist]')).toHaveClass(/ring-2/)
    
    // Generate design
    await page.click('[data-testid=generate-button]')
    await expect(page.locator('[data-testid=generation-progress]')).toBeVisible()
    await expect(page.locator('[data-testid=generation-result]')).toBeVisible({ timeout: 60000 })
    
    // Verify result
    await expect(page.locator('[data-testid=before-after-comparator]')).toBeVisible()
    await expect(page.locator('[data-testid=download-button]')).toBeVisible()
    await expect(page.locator('[data-testid=share-button]')).toBeVisible()
  })
})
```

## 🚀 DÉPLOIEMENT PRODUCTION

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Environment Setup

```bash
# scripts/setup-env.sh
#!/bin/bash

echo "🚀 Setting up XELDA-AI v2.0 environment..."

# Install dependencies
npm install

# Setup environment variables
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "📝 Please update .env.local with your API keys"
fi

# Setup Supabase
npx supabase init
npx supabase db reset
npx supabase gen types typescript --local > types/supabase.ts

# Setup Magic UI
npx @magic-ui/cli init

# Setup ShadCN UI
npx shadcn-ui@latest init

# Install additional components
npx shadcn-ui@latest add button card input label toast
npx @magic-ui/cli add shimmer-button border-beam animated-beam

echo "✅ Environment setup complete!"
echo "🔧 Run 'npm run dev' to start development server"
```

## 📚 DOCUMENTATION & GUIDES

### README.md Principal

```markdown
# 🎨 XELDA-AI v2.0

> Transformez votre chambre en 30 secondes avec l'IA

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/username/xelda-ai-v2)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Fonctionnalités

- 🎨 **Génération IA Instantanée** - Transformation en 30 secondes
- 🎭 **10 Styles Uniques** - Du minimalisme au futurisme
- 🗣️ **Chat IA Conversationnel** - Affinage en langage naturel
- 📱 **AR & 3D Preview** - Visualisation immersive
- 🏆 **Galerie Sociale** - Partagez et inspirez-vous
- 💰 **SaaS Premium** - Modèle d'affaires scalable

## 🚀 Installation Rapide

```bash
# Cloner le projet
git clone https://github.com/username/xelda-ai-v2.git
cd xelda-ai-v2

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env.local
# Éditez .env.local avec vos clés API

# Démarrer le serveur
npm run dev
```

## 🔧 Configuration

### Variables d'Environnement

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key

FEDAPAY_PUBLIC_KEY=your_fedapay_public_key
FEDAPAY_SECRET_KEY=your_fedapay_secret_key
```

## 📖 Documentation

- [Guide de Démarrage](./docs/getting-started.md)
- [Architecture](./docs/architecture.md)
- [API Reference](./docs/api.md)
- [Déploiement](./docs/deployment.md)

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 License

MIT © [XELDA Team](https://xelda.ai)
```

---

## 🎯 CHECKLIST FINAL DE DÉVELOPPEMENT

### Phase 1: Foundation (Semaine 1-2)
- [ ] **Setup Projet**
  - [ ] Initialiser Next.js 14 avec TypeScript
  - [ ] Installer et configurer ShadCN UI
  - [ ] Installer et configurer Magic UI
  - [ ] Setup Tailwind avec thème XELDA
  - [ ] Configurer ESLint, Prettier, Husky

- [ ] **Infrastructure Base**
  - [ ] Configuration Supabase (Auth + DB)
  - [ ] Middleware de protection routes
  - [ ] Layouts hiérarchiques
  - [ ] Configuration environnements

### Phase 2: Core Features (Semaine 3-4)
- [ ] **Authentification**
  - [ ] Pages signin/signup avec Magic UI
  - [ ] Hooks et stores Zustand
  - [ ] Gestion sessions Supabase
  - [ ] Protection routes middleware

- [ ] **Espace Créateur Base**
  - [ ] Upload d'images avec FileUpload Magic UI
  - [ ] Sélecteur de styles avec animations
  - [ ] Intégration IA Gemini basique
  - [ ] Affichage résultats

### Phase 3: Advanced Features (Semaine 5-6)
- [ ] **IA Avancée**
  - [ ] Service IA modulaire (Gemini + OpenAI)
  - [ ] Analyse de mobilier
  - [ ] Chat IA conversationnel
  - [ ] Fusion de styles

- [ ] **Interface Premium**
  - [ ] Comparateur avant/après animé
  - [ ] Magic UI animations avancées
  - [ ] Responsive design complet
  - [ ] Micro-interactions

### Phase 4: Social & Business (Semaine 7-8)
- [ ] **Galerie Communautaire**
  - [ ] Grid responsive avec Magic UI
  - [ ] Système de likes/partage
  - [ ] Filtres et recherche
  - [ ] Pagination infinie

- [ ] **Système Business**
  - [ ] Plans d'abonnement
  - [ ] Système de quotas
  - [ ] Intégration FedaPay
  - [ ] Dashboard analytics

### Phase 5: Polish & Deploy (Semaine 9-10)
- [ ] **Qualité & Performance**
  - [ ] Tests unitaires (Jest)
  - [ ] Tests E2E (Playwright)
  - [ ] Optimisations performance
  - [ ] Monitoring et analytics

- [ ] **Déploiement**
  - [ ] Configuration CI/CD
  - [ ] Déploiement Vercel
  - [ ] Monitoring production
  - [ ] Documentation complète
