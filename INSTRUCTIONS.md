# 🎨 XELDA - AI Interior Design SaaS

**Complete Build Guide for Claude Code Integration**

> Production-ready SaaS platform for AI-powered interior design transformations

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Stack & Tools](#-stack--tools)
3. [Database Schema](#-database-schema)
4. [API Architecture](#-api-architecture)
5. [Pricing & Business Model](#-pricing--business-model)
6. [AI Service Architecture](#-ai-service-architecture)
7. [Feature Specifications](#-feature-specifications)
8. [Implementation Guide](#-implementation-guide)
9. [Claude Code Instructions](#-claude-code-instructions)
10. [Deployment Checklist](#-deployment-checklist)

---

## 🎯 Project Overview

**XELDA** is a premium SaaS platform that transforms bedroom photos into beautifully designed spaces using AI. Users can:

- Upload bedroom photos
- Select from 10 design styles (Minimalist, Bohemian, Modern, etc.)
- Get AI-generated photorealistic transformations
- Refine designs via conversational chat
- Preview furniture in AR (WebXR)
- Save/share designs in a community gallery
- Access style analytics personalized for their preferences

**Target Market**: Homeowners, interior designers, real estate agencies  
**Launch Date**: Q1 2025  
**Expected Users Year 1**: 5,000  
**Revenue Model**: Freemium (10 gen/month) + Pro/Expert subscriptions

---

## 🛠️ Stack & Tools

### Frontend
```
✅ React 19 (UI framework)
✅ TypeScript (type safety)
✅ Tailwind CSS (styling)
✅ Vite (build tool)
✅ Zustand (state management)
✅ React Query (server state)
✅ Socket.io (real-time chat)
✅ Babylon.js (AR/3D)
✅ WebXR (mobile AR)
```

### Backend
```
✅ Node.js + Express (API server)
✅ TypeScript (type safety)
✅ Bull Queue (async jobs)
✅ Redis (caching + queue)
✅ JWT (authentication)
✅ Helmet (security)
✅ Express-Rate-Limit (rate limiting)
✅ Winston (logging)
```

### Database & Storage
```
✅ Supabase (PostgreSQL + Auth + Storage + Realtime)
✅ Supabase Storage (image hosting)
✅ Redis (cache + rate limiting)
✅ Supabase RLS (row-level security)
```

### AI Services
```
✅ Google Gemini 2.5 Flash (image generation + chat)
✅ Nano Banana (optional image manipulation fallback)
✅ User custom API keys support (multi-provider agnostic)
```

### Payment
```
✅ FedaPay (primary payment processor - West Africa)
✅ Webhooks for transaction confirmation
✅ Subscription management in Supabase
```

### DevOps & Deployment
```
✅ Vercel (frontend - auto-deploy from GitHub)
✅ Railway (backend - Node.js hosting)
✅ GitHub (version control + CI/CD)
✅ Sentry (error tracking)
✅ Datadog/New Relic (monitoring - v2)
```

### Development Tool
```
✅ Claude Code (AI-assisted development with context)
```

---

## 📊 Database Schema (Supabase PostgreSQL)

### Table: users
```sql
id UUID PRIMARY KEY
auth_id UUID REFERENCES auth.users(id)
email TEXT UNIQUE
username TEXT UNIQUE
avatar_url TEXT
plan TEXT CHECK (plan IN ('free', 'pro', 'expert'))
monthly_generations_used INT
monthly_generations_limit INT
storage_used_mb FLOAT
storage_limit_mb FLOAT
style_preferences JSONB
custom_gemini_api_key_encrypted BYTEA
api_key_provider TEXT CHECK (api_key_provider IN ('xelda', 'custom'))
created_at TIMESTAMP
updated_at TIMESTAMP
```

### Table: designs
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
name TEXT
original_image_url TEXT
generated_image_url TEXT
style TEXT CHECK (style IN ('minimalist', 'scandinavian', 'cozy', 'modern', 'bohemian', 'industrial', 'luxury', 'vintage', 'gamer_setup', 'futuristic'))
room_type TEXT CHECK (room_type IN ('bedroom', 'livingroom', 'kitchen', 'bathroom', 'office', 'diningroom'))
ai_provider TEXT
model_used TEXT
generation_time_ms INT
chat_history JSONB
detected_furniture JSONB
inspiration_image_url TEXT
extracted_palette JSONB
ambiance TEXT CHECK (ambiance IN ('daylight', 'morning', 'evening_cosy', 'neon', 'sunset'))
is_public BOOLEAN
is_shared_to_gallery BOOLEAN
view_count INT
like_count INT
created_at TIMESTAMP
updated_at TIMESTAMP
```

### Table: subscriptions
```sql
id UUID PRIMARY KEY
user_id UUID UNIQUE REFERENCES users(id)
plan_name TEXT
status TEXT CHECK (status IN ('active', 'paused', 'cancelled', 'expired'))
billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly'))
billing_amount_cents INT
currency TEXT DEFAULT 'XOF'
fedapay_subscription_id TEXT UNIQUE
fedapay_customer_id TEXT
auto_renew BOOLEAN
created_at TIMESTAMP
updated_at TIMESTAMP
```

### Table: transactions
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
subscription_id UUID REFERENCES subscriptions(id)
amount_cents INT
currency TEXT DEFAULT 'XOF'
status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded'))
fedapay_transaction_id TEXT UNIQUE
fedapay_webhook_id TEXT
receipt_url TEXT
created_at TIMESTAMP
completed_at TIMESTAMP
```

### Table: design_likes
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
design_id UUID REFERENCES designs(id)
created_at TIMESTAMP
UNIQUE(user_id, design_id)
```

### Table: generation_jobs
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
design_id UUID REFERENCES designs(id)
status TEXT CHECK (status IN ('queued', 'processing', 'completed', 'failed'))
job_type TEXT CHECK (job_type IN ('design_generation', 'chat_refinement', 'ar_generation'))
started_at TIMESTAMP
completed_at TIMESTAMP
processing_time_ms INT
error_message TEXT
retry_count INT
created_at TIMESTAMP
```

### Table: api_usage
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
endpoint TEXT
method TEXT
status_code INT
timestamp TIMESTAMP
response_time_ms INT
api_cost_cents INT
```

### Table: audit_logs
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
action TEXT
resource_type TEXT
resource_id UUID
old_values JSONB
new_values JSONB
ip_address INET
user_agent TEXT
created_at TIMESTAMP
```

---

## 🌐 API Architecture

### Authentication Routes
```
POST   /api/auth/signup              Create account
POST   /api/auth/login               Login user
POST   /api/auth/refresh             Refresh JWT
POST   /api/auth/logout              Logout
POST   /api/auth/google              Google OAuth
GET    /api/auth/profile             Get user profile
```

### Design Generation Routes
```
POST   /api/designs/generate         Start design generation
GET    /api/designs/{id}             Get design details
POST   /api/designs/{id}/refine      Chat refinement
POST   /api/designs/{id}/save        Save to gallery
POST   /api/designs/{id}/like        Like design
GET    /api/designs/{id}/download    Download image
DELETE /api/designs/{id}             Delete design
```

### Gallery Routes
```
GET    /api/gallery/public           Public community gallery
GET    /api/gallery/my-designs       User's designs
GET    /api/gallery/favorites        User's liked designs
GET    /api/gallery/trending         Trending designs
```

### User Routes
```
GET    /api/user/profile             User profile
PATCH  /api/user/profile             Update profile
GET    /api/user/stats               User statistics
GET    /api/user/style-analysis      Style preferences
GET    /api/user/usage               Quota usage
```

### Payment Routes
```
POST   /api/payments/initiate        Start payment
GET    /api/payments/status/{id}     Check payment status
GET    /api/payments/history         Transaction history
POST   /api/webhooks/fedapay         FedaPay webhook (internal)
```

### Upload Routes
```
POST   /api/uploads                  Upload bedroom image
POST   /api/uploads/inspiration      Upload inspiration palette
```

---

## 💰 Pricing & Business Model

### Free Plan
| Feature | Limit |
|---------|-------|
| Generations/month | 10 |
| Storage | 100 MB |
| Styles Available | All 10 |
| Multi-rooms | No |
| AR Quality | Basic |
| Chat Messages | 5 per design |
| Community Gallery | View-only |
| Support | Community |

### Pro Plan ($4.99/month or $49.90/year)
| Feature | Limit |
|---------|-------|
| Generations/month | Unlimited |
| Storage | 1 GB |
| Styles Available | All 10 |
| Multi-rooms | 3 types |
| AR Quality | Medium |
| Chat Messages | Unlimited |
| Community Gallery | Full access |
| Support | 48h response |

### Expert Plan ($14.99/month or $149.90/year)
| Feature | Limit |
|---------|-------|
| Generations/month | Unlimited |
| Storage | Unlimited |
| Styles Available | All + future styles |
| Multi-rooms | All types |
| AR Quality | High + WebXR |
| Chat Messages | Unlimited |
| Video Generation | Planned (v2) |
| API Access | Planned (v2) |
| Support | 24/7 priority |

---

## 🤖 AI Service Architecture

### Core AI Prompts

#### PROMPT 1: Design Generation
```
You are XELDA, an advanced interior design AI.

Transform the uploaded bedroom into a {STYLE} design.

STYLE DETAILS:
{STYLE_SPECIFICATION}

RULES:
1. Preserve original room structure (walls, ceiling, floor, windows, doors)
2. Add appropriate {STYLE} furniture and decor
3. Maintain realistic proportions
4. Use color palette from style guide
5. Include proper lighting for ambiance
6. Ensure photorealistic quality

Generate ONE high-quality image. No text, only image output.
```

#### PROMPT 2: Design Refinement
```
You are XELDA's refinement specialist.

Current Design: [Image]
Original Photo: [Image]
User Request: "{USER_REQUEST}"

Modify ONLY what's requested. Keep everything else unchanged.
Return modified image with the requested changes applied.
```

#### PROMPT 3: Furniture Analysis
```
Analyze this bedroom image and list all detected furniture.

Return JSON with:
{
  "items": [
    {"name": "...", "category": "...", "position": "...", "confidence": 0.92}
  ],
  "recommendations": ["..."]
}

Only JSON, no text.
```

#### PROMPT 4: Palette Extraction
```
Extract 5-7 dominant colors from this inspiration image.

Return JSON with:
{
  "colors": [
    {"hex": "#...", "name": "...", "usage": "primary/secondary/accent", "percentage": 32}
  ]
}

Only JSON, no text.
```

#### PROMPT 5: Style Profile Analysis
```
Analyze user's design history and create style profile.

Return JSON with style preferences and weighted scores.
Use for personalized "Surprise Me" button.

Only JSON, no text.
```

### Service Implementation Pattern

```typescript
// AI Service Interface
interface AIService {
  generateDesign(params: GenerateDesignParams): Promise<GenerateDesignResult>;
  refineDesign(params: RefineDesignParams): Promise<RefineDesignResult>;
  analyzeFurniture(imageUrl: string): Promise<FurnitureAnalysis>;
  extractPalette(imageUrl: string): Promise<ColorPalette>;
  analyzeStyleProfile(designs: Design[]): Promise<StyleProfile>;
}

// Gemini Implementation
class GeminiAIService implements AIService {
  // All 5 functions implemented with proper error handling
}

// Allow user custom API keys
function selectAIProvider(user: User) {
  if (user.customGeminiApiKey) {
    return new GeminiAIService(user.customGeminiApiKey);
  }
  return new GeminiAIService(process.env.GEMINI_SHARED_KEY);
}
```

---

## ✨ Feature Specifications

### Creator Space Features

#### 1. Upload Section
- Drag-and-drop zone (accept JPG, PNG, WebP)
- Max file size: 10 MB
- Image analysis: Detect room size, colors, lighting, bed presence
- Show results in preview card

#### 2. Style Carousel
- 10 interactive cards (Minimalist, Scandinavian, Cozy, Modern, Bohemian, Industrial, Luxury, Vintage, Gamer, Futuristic)
- Each card shows: Icon, name, description
- Hover effects: Scale 1.05x, glow
- Select → Auto-generate design

#### 3. Generation Process
- Show animated loader
- Display progress: "Generating... 45% complete"
- Estimated time: "~20 seconds remaining"
- Allow cancellation
- WebSocket streaming for real-time updates

#### 4. Before/After Slider
- Full-width interactive slider
- Drag handle to compare
- Labels: "AVANT" / "APRÈS"
- Mobile: Touch drag
- Desktop: Mouse drag or keyboard arrows

#### 5. Chat Refinement Panel
- Right sidebar (desktop) / bottom sheet (mobile)
- Message bubbles with timestamps
- Pre-filled quick actions
- Input field with 500 char limit
- Auto-scroll to newest message

#### 6. "Me Surprendre" Button
- Random style fusion (e.g., "Bohemian + Futuristic")
- Uses user style preferences for weighting
- Multiple re-rolls allowed
- Show which styles were combined

#### 7. Furniture Detection
- Auto-analyze generated image
- List detected items with icons
- Show AR preview on click
- Display recommendations

#### 8. Ambiance Lighting
- 5 preset options: Daylight, Morning, Evening Cosy, Neon, Sunset
- Click to regenerate with different lighting
- Real-time comparison in slider

#### 9. Actions
- Download: Save as JPEG (1920x1080)
- Save: Add to private gallery
- Share: Social media + copy link
- Try Another: Back to style carousel

### Gallery Features
- Community gallery with infinite scroll
- Filter by: Style, Room type, Date
- Like/unlike designs
- Download favorites
- Creator profile links

### Profile Features
- User statistics dashboard
- Style preference charts
- Design history
- Settings (theme, AR quality, notifications)
- API key management
- Plan upgrade/downgrade

---

## 💻 Implementation Guide

✅ Setup GitHub repository
✅ Initialize Vite + React 19
✅ Configure Supabase (create project, run migrations)
✅ Setup Vercel deployment
✅ Setup Railway backend
✅ Create auth pages (login/signup)
✅ Implement JWT + Supabase Auth
✅ Upload component
✅ Style carousel
✅ Gemini integration (design generation)
✅ Generation loader + WebSocket
✅ Before/After slider
✅ Basic design storage
✅ Chat panel
✅ Chat refinement logic
✅ Furniture detection
✅ Ambiance lighting selector
✅ Download/Save/Share functions
✅ Quota system + monthly reset
✅ Gallery view
✅ Social features (like, follow)
✅ User profiles
✅ Style analytics
✅ Babylon.js AR setup
✅ 3D furniture preview
✅ WebXR mobile AR
✅ Performance optimization
✅ Mobile responsiveness
✅ FedaPay integration
✅ Plan upgrade flow
✅ Subscription management
✅ Webhook handling
✅ Email confirmations


---

## 🤖 Claude Code Instructions

### Context to Provide Claude Code

When using Claude Code (RovoDev) for development, provide this context:

```
PROJECT: XELDA - AI Interior Design SaaS
STACK: React 19, TypeScript, Node.js, Supabase, Gemini, FedaPay

DATABASE SCHEMA:
[Provide complete schema from section above]

API ROUTES:
[Provide complete routes from section above]

AI PROMPTS:
[Provide all 5 prompts from AI Service Architecture]

FEATURE TO BUILD:
[Specify exact component/feature]

REQUIREMENTS:
- Use TypeScript strictly
- Follow React hooks best practices
- Use Supabase for data
- Implement proper error handling
- Add loading states
- Mobile responsive
- Accessibility (a11y)

CODE STYLE:
- Arrow functions only
- Const for variables
- Use React Query for data fetching
- Zustand for state management
- Tailwind CSS for styling
- Component-first architecture
```

### Example Claude Code Prompt 1: Upload Component

```
BUILD: UploadSection Component

REQUIREMENTS:
- Drag-and-drop zone (accept JPG, PNG, WebP)
- Max 10 MB file size
- Show file preview
- Validate image dimensions (min 800x600)
- Show error messages
- Upload to Supabase Storage
- Show upload progress (0-100%)
- Fetch room analysis on success
- Return: uploadedImageUrl, roomAnalysis

USE:
- React hooks (useState, useEffect)
- Supabase client for storage
- TypeScript for types
- Tailwind for styling

COMPONENT PATH:
src/components/Creator/UploadSection.tsx
```

### Example Claude Code Prompt 2: Gemini Service

```
BUILD: Gemini AI Service

REQUIREMENTS:
- Implement AIService interface
- Function: generateDesign()
  * Accept original image URL + style
  * Use DESIGN_GENERATION_PROMPT
  * Return generated image URL + metadata
- Function: refineDesign()
  * Accept current design + refinement request
  * Use DESIGN_REFINEMENT_PROMPT
  * Return modified image
- Function: analyzeFurniture()
  * Analyze image for furniture
  * Return JSON with items list
- Error handling + retries
- Support user custom API keys
- Cache results in Redis

SERVICE PATH:
src/services/ai/gemini.ts

EXPORTS:
export const aiService: AIService
```

### Example Claude Code Prompt 3: Generation Flow

```
BUILD: Design Generation Flow (Backend)

REQUIREMENTS:
- POST /api/designs/generate endpoint
- Validate user quota (check monthly_generations_used)
- Queue job using Bull + Redis
- Update UI via WebSocket progress
- Generate image via Gemini
- Auto-analyze furniture
- Save to Supabase
- Increment user quota
- Send WebSocket completion event

USE:
- Express controller
- Bull queue with 3 retries
- Socket.io for real-time
- Supabase for storage
- Proper error handling

CONTROLLER PATH:
src/controllers/designsController.ts

ROUTE PATH:
src/routes/designs.ts
```

---
.....
---

## 🔗 Important Links

- **Gemini API Docs**: https://ai.google.dev/
- **Supabase Docs**: https://supabase.com/docs
- **FedaPay Integration**: https://fedapay.com/docs
- **React 19 Docs**: https://react.dev
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://railway.app/docs

