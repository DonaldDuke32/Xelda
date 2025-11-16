# 🚀 XELDA - Guide de Déploiement Production

## 📋 **PRÉREQUIS**

### 🔑 **Comptes & APIs Nécessaires**
- [ ] Compte GitHub (repository)
- [ ] Compte Vercel (frontend hosting)
- [ ] Compte Railway (backend hosting - optionnel)
- [ ] Projet Supabase (base de données)
- [ ] Clé API Google Gemini
- [ ] Compte FedaPay (paiements)

## 🛠️ **ÉTAPES DE DÉPLOIEMENT**

### 1️⃣ **Configuration Supabase**

```bash
# 1. Créer un projet Supabase
# 2. Exécuter les migrations
psql -h your-db-host -U postgres -d your-db-name -f database/migrations/001_initial_schema.sql

# 3. Configurer Authentication Providers
# Dans Supabase Dashboard > Authentication > Providers
# Activer : Email, Google OAuth

# 4. Configurer Storage
# Créer un bucket "designs" public
```

### 2️⃣ **Variables d'Environnement**

Créer `.env.local` :

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# AI Services
VITE_GEMINI_API_KEY=your-gemini-key

# Payments
VITE_FEDAPAY_PUBLIC_KEY=your-fedapay-public-key

# Environment
VITE_ENV=production
VITE_API_URL=https://your-backend.railway.app/api
```

### 3️⃣ **Déploiement Frontend (Vercel)**

```bash
# 1. Connecter GitHub à Vercel
# 2. Importer le repository XELDA
# 3. Configurer les variables d'environnement
# 4. Deploy automatique

# Build command: npm run build
# Install command: npm install
# Output directory: dist
```

### 4️⃣ **Configuration Domaine**

```bash
# 1. Acheter domaine (ex: xelda.app)
# 2. Configurer DNS dans Vercel
# 3. SSL automatique
# 4. Redirection HTTPS
```

### 5️⃣ **Supabase Edge Functions (Optionnel)**

```bash
# Pour webhook FedaPay et traitement async
supabase functions deploy webhook-fedapay
supabase functions deploy process-generation
```

## 🔍 **TESTS PRÉ-PRODUCTION**

### ✅ **Checklist Fonctionnelle**
- [ ] Inscription utilisateur
- [ ] Connexion Google OAuth
- [ ] Upload d'image (< 10MB)
- [ ] Génération de design
- [ ] Chat de raffinement
- [ ] Sauvegarde design
- [ ] Publication galerie
- [ ] Gestion quotas
- [ ] Mise à niveau plan

### ✅ **Tests Performance**
- [ ] Temps de chargement < 3s
- [ ] Génération IA < 30s
- [ ] Upload image < 5s
- [ ] Responsive mobile/desktop
- [ ] SEO scores > 90

### ✅ **Tests Sécurité**
- [ ] RLS Supabase actif
- [ ] JWT tokens sécurisés
- [ ] Upload validation
- [ ] Rate limiting
- [ ] HTTPS forced

## 📊 **MONITORING & ANALYTICS**

### 🔧 **Outils Recommandés**
```javascript
// Vercel Analytics
// Supabase Dashboard
// Sentry Error Tracking
// Google Analytics 4
// FedaPay Dashboard
```

### 📈 **Métriques Clés à Surveiller**
- Taux de conversion signup → activation
- Temps de génération moyenne
- Taux d'upgrade gratuit → payant
- Churn rate des abonnements
- Coûts API vs revenus

## 💰 **CONFIGURATION FEDAPAY**

### 🔑 **Webhooks**
```javascript
// URL webhook: https://your-domain.com/api/webhooks/fedapay
// Events: transaction.completed, subscription.created, subscription.cancelled

// Structure webhook handler
app.post('/api/webhooks/fedapay', async (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'transaction.completed':
      await handlePaymentSuccess(data);
      break;
    case 'subscription.cancelled':
      await handleSubscriptionCancellation(data);
      break;
  }
  
  res.status(200).json({ received: true });
});
```

## 🚨 **SAUVEGARDES & SÉCURITÉ**

### 📦 **Stratégie de Sauvegarde**
- Supabase : Backup automatique quotidien
- Code : GitHub repository
- Assets : Supabase Storage répliqué
- Base de données : Export hebdomadaire

### 🛡️ **Sécurité Production**
```javascript
// Headers de sécurité
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

## 🔄 **CI/CD Pipeline**

### ⚙️ **GitHub Actions** (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - run: npm run test
      - uses: vercel/action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🎯 **POST-DEPLOYMENT**

### 📢 **Marketing Launch**
1. **SEO** : Sitemap, meta tags, robots.txt
2. **Analytics** : Conversion funnels, heatmaps
3. **Social** : Pages LinkedIn, Twitter, Instagram
4. **Content** : Blog posts, tutorials YouTube

### 📈 **Growth Hacks**
1. **Freemium** : 10 générations gratuites mensuelles
2. **Referral** : +5 générations par parrainage
3. **Social Proof** : Galerie publique, testimonials
4. **Retargeting** : Ads pour upgrade plan

## 🚀 **READY FOR LAUNCH! 🎉**

Une fois ces étapes complétées, XELDA sera prêt pour :
- **Acquisition** : 1000+ utilisateurs / mois
- **Conversion** : 20-30% gratuit → payant  
- **Rétention** : 85%+ satisfaction utilisateurs
- **Revenue** : €5k-20k MRR objectif Q2 2025