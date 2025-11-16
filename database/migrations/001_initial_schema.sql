-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    plan TEXT CHECK (plan IN ('free', 'pro', 'expert')) DEFAULT 'free',
    monthly_generations_used INTEGER DEFAULT 0,
    monthly_generations_limit INTEGER DEFAULT 10,
    storage_used_mb FLOAT DEFAULT 0,
    storage_limit_mb FLOAT DEFAULT 100,
    style_preferences JSONB DEFAULT '{}',
    custom_gemini_api_key_encrypted BYTEA,
    api_key_provider TEXT CHECK (api_key_provider IN ('xelda', 'custom')) DEFAULT 'xelda',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Designs table
CREATE TABLE designs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    original_image_url TEXT NOT NULL,
    generated_image_url TEXT NOT NULL,
    style TEXT CHECK (style IN ('minimalist', 'scandinavian', 'cozy', 'modern', 'bohemian', 'industrial', 'luxury', 'vintage', 'gamer_setup', 'futuristic')) NOT NULL,
    room_type TEXT CHECK (room_type IN ('bedroom', 'livingroom', 'kitchen', 'bathroom', 'office', 'diningroom')) DEFAULT 'bedroom',
    ai_provider TEXT DEFAULT 'gemini',
    model_used TEXT DEFAULT 'gemini-2.5-flash-image',
    generation_time_ms INTEGER DEFAULT 0,
    chat_history JSONB DEFAULT '[]',
    detected_furniture JSONB DEFAULT '[]',
    inspiration_image_url TEXT,
    extracted_palette JSONB,
    ambiance TEXT CHECK (ambiance IN ('daylight', 'morning', 'evening_cosy', 'neon', 'sunset')) DEFAULT 'daylight',
    is_public BOOLEAN DEFAULT FALSE,
    is_shared_to_gallery BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL,
    status TEXT CHECK (status IN ('active', 'paused', 'cancelled', 'expired')) DEFAULT 'active',
    billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly')) DEFAULT 'monthly',
    billing_amount_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'XOF',
    fedapay_subscription_id TEXT UNIQUE,
    fedapay_customer_id TEXT,
    auto_renew BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    amount_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'XOF',
    status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
    fedapay_transaction_id TEXT UNIQUE,
    fedapay_webhook_id TEXT,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Design likes table
CREATE TABLE design_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    design_id UUID REFERENCES designs(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, design_id)
);

-- Generation jobs table (for async processing)
CREATE TABLE generation_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    design_id UUID REFERENCES designs(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('queued', 'processing', 'completed', 'failed')) DEFAULT 'queued',
    job_type TEXT CHECK (job_type IN ('design_generation', 'chat_refinement', 'ar_generation')) NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    processing_time_ms INTEGER,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API usage tracking
CREATE TABLE api_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    status_code INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    response_time_ms INTEGER,
    api_cost_cents INTEGER DEFAULT 0
);

-- Audit logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_designs_user_id ON designs(user_id);
CREATE INDEX idx_designs_public ON designs(is_public, is_shared_to_gallery);
CREATE INDEX idx_designs_created_at ON designs(created_at DESC);
CREATE INDEX idx_design_likes_user_id ON design_likes(user_id);
CREATE INDEX idx_design_likes_design_id ON design_likes(design_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_generation_jobs_status ON generation_jobs(status);
CREATE INDEX idx_api_usage_user_id ON api_usage(user_id, timestamp);

-- RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = auth_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = auth_id);

-- Users can view their own designs
CREATE POLICY "Users can view own designs" ON designs
    FOR SELECT USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Users can view public designs
CREATE POLICY "Anyone can view public designs" ON designs
    FOR SELECT USING (is_public = TRUE AND is_shared_to_gallery = TRUE);

-- Users can create their own designs
CREATE POLICY "Users can create designs" ON designs
    FOR INSERT WITH CHECK (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Users can update their own designs
CREATE POLICY "Users can update own designs" ON designs
    FOR UPDATE USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Users can delete their own designs
CREATE POLICY "Users can delete own designs" ON designs
    FOR DELETE USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Similar policies for other tables...
CREATE POLICY "Users can view own subscriptions" ON subscriptions
    FOR SELECT USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can manage own design likes" ON design_likes
    FOR ALL USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Functions for common operations
CREATE OR REPLACE FUNCTION increment_design_likes(design_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE designs 
    SET like_count = like_count + 1, updated_at = NOW()
    WHERE id = design_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_design_likes(design_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE designs 
    SET like_count = GREATEST(like_count - 1, 0), updated_at = NOW()
    WHERE id = design_id;
END;
$$ LANGUAGE plpgsql;

-- Function to reset monthly quotas (run via cron)
CREATE OR REPLACE FUNCTION reset_monthly_quotas()
RETURNS VOID AS $$
BEGIN
    UPDATE users 
    SET monthly_generations_used = 0, updated_at = NOW()
    WHERE DATE_TRUNC('month', updated_at) < DATE_TRUNC('month', NOW());
END;
$$ LANGUAGE plpgsql;

-- Function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users (auth_id, email, username)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updating timestamps
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_designs_updated_at
    BEFORE UPDATE ON designs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();