
-- =============================================
-- ENUMS
-- =============================================
CREATE TYPE public.platform_type AS ENUM ('twitter', 'instagram', 'youtube', 'facebook', 'linkedin');
CREATE TYPE public.subscription_status AS ENUM ('active', 'cancelled', 'past_due', 'trialing');
CREATE TYPE public.billing_cycle AS ENUM ('monthly', 'yearly');
CREATE TYPE public.post_status AS ENUM ('published', 'draft', 'archived', 'deleted');
CREATE TYPE public.media_type AS ENUM ('image', 'video', 'carousel', 'text', 'link', 'reel', 'story');
CREATE TYPE public.analysis_type AS ENUM ('growth', 'engagement', 'audience', 'content', 'competitor', 'timing');
CREATE TYPE public.scheduled_post_status AS ENUM ('pending', 'published', 'failed', 'cancelled');
CREATE TYPE public.approval_status AS ENUM ('approved', 'pending', 'rejected');

-- =============================================
-- TABLES
-- =============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price_monthly NUMERIC(10,2) NOT NULL DEFAULT 0,
  price_yearly NUMERIC(10,2) NOT NULL DEFAULT 0,
  features_json JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id) ON DELETE RESTRICT,
  status public.subscription_status NOT NULL DEFAULT 'active',
  billing_cycle public.billing_cycle NOT NULL DEFAULT 'monthly',
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform public.platform_type NOT NULL,
  account_name TEXT NOT NULL,
  handle TEXT NOT NULL,
  profile_image_url TEXT,
  followers_count INTEGER NOT NULL DEFAULT 0,
  following_count INTEGER NOT NULL DEFAULT 0,
  posts_count INTEGER NOT NULL DEFAULT 0,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(profile_id, platform, handle)
);

CREATE TABLE public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  social_account_id UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  platform_post_id TEXT,
  caption TEXT,
  media_type public.media_type NOT NULL DEFAULT 'text',
  media_url TEXT,
  posted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  shares_count INTEGER NOT NULL DEFAULT 0,
  saves_count INTEGER NOT NULL DEFAULT 0,
  impressions_count INTEGER NOT NULL DEFAULT 0,
  reach_count INTEGER NOT NULL DEFAULT 0,
  engagement_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  status public.post_status NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.social_metrics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  social_account_id UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  followers INTEGER NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  reach INTEGER NOT NULL DEFAULT 0,
  profile_visits INTEGER NOT NULL DEFAULT 0,
  website_clicks INTEGER NOT NULL DEFAULT 0,
  likes INTEGER NOT NULL DEFAULT 0,
  comments INTEGER NOT NULL DEFAULT 0,
  shares INTEGER NOT NULL DEFAULT 0,
  saves INTEGER NOT NULL DEFAULT 0,
  engagement_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  ctr NUMERIC(5,2) NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  UNIQUE(social_account_id, metric_date)
);

CREATE TABLE public.audience_demographics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  social_account_id UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  gender_male_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  gender_female_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  age_18_24_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  age_25_34_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  age_35_44_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  age_45_54_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  age_55_plus_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  UNIQUE(social_account_id, metric_date)
);

CREATE TABLE public.audience_geography (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  social_account_id UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  audience_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  reach INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE public.ai_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  social_account_id UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  related_post_id UUID REFERENCES public.social_posts(id) ON DELETE SET NULL,
  analysis_type public.analysis_type NOT NULL,
  summary TEXT NOT NULL,
  recommendations JSONB DEFAULT '[]'::jsonb,
  score NUMERIC(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.scheduled_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  social_account_id UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  caption TEXT NOT NULL,
  platform public.platform_type NOT NULL,
  media_url TEXT,
  scheduled_for TIMESTAMPTZ NOT NULL,
  status public.scheduled_post_status NOT NULL DEFAULT 'pending',
  approval_status public.approval_status NOT NULL DEFAULT 'approved',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_social_accounts_profile ON public.social_accounts(profile_id);
CREATE INDEX idx_social_posts_account ON public.social_posts(social_account_id);
CREATE INDEX idx_social_posts_posted_at ON public.social_posts(posted_at DESC);
CREATE INDEX idx_metrics_daily_account_date ON public.social_metrics_daily(social_account_id, metric_date DESC);
CREATE INDEX idx_audience_demo_account_date ON public.audience_demographics(social_account_id, metric_date DESC);
CREATE INDEX idx_audience_geo_account_date ON public.audience_geography(social_account_id, metric_date DESC);
CREATE INDEX idx_audience_geo_country ON public.audience_geography(country);
CREATE INDEX idx_ai_analyses_account ON public.ai_analyses(social_account_id);
CREATE INDEX idx_scheduled_posts_account ON public.scheduled_posts(social_account_id);
CREATE INDEX idx_scheduled_posts_scheduled_for ON public.scheduled_posts(scheduled_for);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================
-- RLS
-- =============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_metrics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audience_demographics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audience_geography ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_posts ENABLE ROW LEVEL SECURITY;

-- MVP demo: open read access (tighten when auth is added)
CREATE POLICY "Plans publicly readable" ON public.plans FOR SELECT USING (true);
CREATE POLICY "Profiles readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Profiles insertable" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Profiles updatable" ON public.profiles FOR UPDATE USING (true);
CREATE POLICY "Subscriptions readable" ON public.subscriptions FOR SELECT USING (true);
CREATE POLICY "Social accounts readable" ON public.social_accounts FOR SELECT USING (true);
CREATE POLICY "Social posts readable" ON public.social_posts FOR SELECT USING (true);
CREATE POLICY "Metrics readable" ON public.social_metrics_daily FOR SELECT USING (true);
CREATE POLICY "Demographics readable" ON public.audience_demographics FOR SELECT USING (true);
CREATE POLICY "Geography readable" ON public.audience_geography FOR SELECT USING (true);
CREATE POLICY "AI analyses readable" ON public.ai_analyses FOR SELECT USING (true);
CREATE POLICY "Scheduled posts readable" ON public.scheduled_posts FOR SELECT USING (true);

-- =============================================
-- SEED DATA (using DO block for proper UUID references)
-- =============================================
DO $$
DECLARE
  v_profile_id UUID;
  v_plan_free UUID;
  v_plan_pro UUID;
  v_plan_enterprise UUID;
  v_sa_twitter UUID;
  v_sa_instagram UUID;
  v_sa_youtube UUID;
  v_sa_facebook UUID;
  v_sa_linkedin UUID;
BEGIN
  -- Profile
  INSERT INTO public.profiles (full_name, email, avatar_url)
  VALUES ('Mostafizur Rahman', 'mostafizur.rose@gmail.com', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face')
  RETURNING id INTO v_profile_id;

  -- Plans
  INSERT INTO public.plans (name, price_monthly, price_yearly, features_json)
  VALUES ('Free', 0, 0, '["3 social accounts","Basic analytics","7-day history"]')
  RETURNING id INTO v_plan_free;

  INSERT INTO public.plans (name, price_monthly, price_yearly, features_json)
  VALUES ('Pro', 29.99, 299.99, '["10 social accounts","Advanced analytics","AI insights","90-day history","Scheduled posts"]')
  RETURNING id INTO v_plan_pro;

  INSERT INTO public.plans (name, price_monthly, price_yearly, features_json)
  VALUES ('Enterprise', 99.99, 999.99, '["Unlimited accounts","Full AI suite","365-day history","Team collaboration","Priority support"]')
  RETURNING id INTO v_plan_enterprise;

  -- Subscription
  INSERT INTO public.subscriptions (profile_id, plan_id, status, billing_cycle, starts_at, ends_at)
  VALUES (v_profile_id, v_plan_pro, 'active', 'monthly', '2026-01-01', '2026-04-01');

  -- Social Accounts
  INSERT INTO public.social_accounts (profile_id, platform, account_name, handle, profile_image_url, followers_count, following_count, posts_count)
  VALUES (v_profile_id, 'twitter', 'Social Spark', '@socialspark', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=80&h=80&fit=crop', 234340, 1250, 4521)
  RETURNING id INTO v_sa_twitter;

  INSERT INTO public.social_accounts (profile_id, platform, account_name, handle, profile_image_url, followers_count, following_count, posts_count)
  VALUES (v_profile_id, 'instagram', 'Social Spark', '@socialspark', 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=80&h=80&fit=crop', 1400000, 890, 2105)
  RETURNING id INTO v_sa_instagram;

  INSERT INTO public.social_accounts (profile_id, platform, account_name, handle, profile_image_url, followers_count, following_count, posts_count)
  VALUES (v_profile_id, 'youtube', 'Social Spark', '@SocialSparkTV', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=80&h=80&fit=crop', 3400000, 45, 387)
  RETURNING id INTO v_sa_youtube;

  INSERT INTO public.social_accounts (profile_id, platform, account_name, handle, profile_image_url, followers_count, following_count, posts_count)
  VALUES (v_profile_id, 'facebook', 'Social Spark', 'socialspark', 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=80&h=80&fit=crop', 5343400, 0, 3210)
  RETURNING id INTO v_sa_facebook;

  INSERT INTO public.social_accounts (profile_id, platform, account_name, handle, profile_image_url, followers_count, following_count, posts_count)
  VALUES (v_profile_id, 'linkedin', 'Social Spark', 'social-spark', 'https://images.unsplash.com/photo-1611162617263-4ec3060a058e?w=80&h=80&fit=crop', 124340, 520, 845)
  RETURNING id INTO v_sa_linkedin;

  -- =============================================
  -- TWITTER POSTS
  -- =============================================
  INSERT INTO public.social_posts (social_account_id, platform_post_id, caption, media_type, media_url, posted_at, likes_count, comments_count, shares_count, saves_count, impressions_count, reach_count, engagement_rate, status) VALUES
    (v_sa_twitter, 'tw_001', '5 Proven Strategies to Scale Your Small Business in 2026', 'text', NULL, now() - interval '2 hours', 2700, 112, 890, 45, 98000, 67000, 3.8, 'published'),
    (v_sa_twitter, 'tw_002', 'Hot take: AI wont replace marketers. But marketers who use AI will replace those who dont. 🧵', 'text', NULL, now() - interval '1 day', 5400, 342, 1800, 120, 245000, 180000, 3.1, 'published'),
    (v_sa_twitter, 'tw_003', 'Just launched our new analytics dashboard! Check it out 🚀', 'image', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', now() - interval '2 days', 1200, 89, 450, 30, 67000, 45000, 2.6, 'published'),
    (v_sa_twitter, 'tw_004', 'The engagement rate myth needs to die. Heres why reach matters more 👇', 'text', NULL, now() - interval '3 days', 8900, 567, 3200, 200, 420000, 310000, 3.0, 'published'),
    (v_sa_twitter, 'tw_005', 'Monday motivation: Your competitors are posting right now. Are you?', 'text', NULL, now() - interval '4 days', 980, 56, 120, 15, 34000, 22000, 3.4, 'published'),
    (v_sa_twitter, 'tw_006', 'New blog: How to 10x your Twitter growth without buying followers', 'link', 'https://socialspark.io/blog/twitter-growth', now() - interval '5 days', 3400, 210, 1500, 90, 156000, 120000, 3.3, 'published'),
    (v_sa_twitter, 'tw_007', 'We analyzed 10,000 tweets. The best posting time? Its not what you think.', 'image', 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400', now() - interval '6 days', 12300, 890, 5600, 340, 580000, 430000, 3.3, 'published'),
    (v_sa_twitter, 'tw_008', 'Social media tip #47: Consistency beats virality every single time.', 'text', NULL, now() - interval '7 days', 670, 34, 89, 12, 23000, 18000, 3.5, 'published'),
    (v_sa_twitter, 'tw_009', 'Behind the scenes of building Social Spark. AMA!', 'text', NULL, now() - interval '8 days', 4500, 780, 890, 56, 210000, 156000, 2.9, 'published'),
    (v_sa_twitter, 'tw_010', 'Breaking: Instagram just changed their algorithm AGAIN. Heres what it means for you.', 'text', NULL, now() - interval '9 days', 15600, 1200, 7800, 450, 780000, 560000, 3.2, 'published');

  -- =============================================
  -- INSTAGRAM POSTS
  -- =============================================
  INSERT INTO public.social_posts (social_account_id, platform_post_id, caption, media_type, media_url, posted_at, likes_count, comments_count, shares_count, saves_count, impressions_count, reach_count, engagement_rate, status) VALUES
    (v_sa_instagram, 'ig_001', 'Behind the Scenes: A Day in the Life of Our Founder ✨', 'carousel', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', now() - interval '3 hours', 16800, 578, 2300, 4500, 325000, 245000, 6.8, 'published'),
    (v_sa_instagram, 'ig_002', 'Our Top 3 Lessons Learned in Our First Year of Business 📚', 'carousel', 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400', now() - interval '1 day', 645500, 9400, 12000, 89000, 1200000, 980000, 8.2, 'published'),
    (v_sa_instagram, 'ig_003', 'Meet the Team: The People Behind Your Favorite Products 🙌', 'image', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400', now() - interval '2 days', 23400, 890, 3400, 5600, 450000, 340000, 7.4, 'published'),
    (v_sa_instagram, 'ig_004', 'Transform your feed with these 5 visual tips 🎨', 'reel', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400', now() - interval '3 days', 89000, 3400, 15000, 23000, 890000, 670000, 9.1, 'published'),
    (v_sa_instagram, 'ig_005', 'How we grew from 0 to 1M followers in 18 months 📈', 'carousel', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', now() - interval '4 days', 156000, 12000, 34000, 45000, 2300000, 1800000, 10.7, 'published'),
    (v_sa_instagram, 'ig_006', 'Save this for later! Content calendar template 📅', 'carousel', 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400', now() - interval '5 days', 34000, 1200, 5600, 67000, 560000, 420000, 7.8, 'published'),
    (v_sa_instagram, 'ig_007', 'Sunday reset routine for social media managers 🧘', 'reel', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400', now() - interval '6 days', 45000, 2100, 8900, 12000, 780000, 590000, 8.7, 'published'),
    (v_sa_instagram, 'ig_008', 'The algorithm loves THIS type of content right now 👀', 'image', 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400', now() - interval '7 days', 28000, 1500, 4200, 8900, 420000, 310000, 6.9, 'published'),
    (v_sa_instagram, 'ig_009', 'POV: You just discovered Social Spark analytics ✨', 'reel', 'https://images.unsplash.com/photo-1611162617263-4ec3060a058e?w=400', now() - interval '8 days', 67000, 4500, 12000, 18000, 1100000, 850000, 9.2, 'published'),
    (v_sa_instagram, 'ig_010', 'New feature alert! AI-powered content suggestions 🤖', 'image', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', now() - interval '9 days', 19000, 780, 2300, 5600, 340000, 260000, 6.5, 'published'),
    (v_sa_instagram, 'ig_011', 'Your engagement rate doesnt define your worth. But these tips help 💡', 'carousel', 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400', now() - interval '10 days', 41000, 2800, 6700, 15000, 620000, 470000, 8.0, 'published');

  -- =============================================
  -- YOUTUBE POSTS
  -- =============================================
  INSERT INTO public.social_posts (social_account_id, platform_post_id, caption, media_type, media_url, posted_at, likes_count, comments_count, shares_count, saves_count, impressions_count, reach_count, engagement_rate, status) VALUES
    (v_sa_youtube, 'yt_001', 'How to Build a Social Media Empire from Scratch | Full Guide 2026', 'video', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', now() - interval '1 day', 45000, 3200, 8900, 12000, 890000, 670000, 5.2, 'published'),
    (v_sa_youtube, 'yt_002', 'I Tried Every Social Media Tool So You Dont Have To', 'video', 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400', now() - interval '4 days', 89000, 5600, 15000, 23000, 1800000, 1400000, 5.9, 'published'),
    (v_sa_youtube, 'yt_003', 'The Truth About Social Media Analytics Nobody Talks About', 'video', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', now() - interval '7 days', 120000, 8900, 23000, 34000, 3200000, 2500000, 5.5, 'published'),
    (v_sa_youtube, 'yt_004', '10 Instagram Hacks That Actually Work in 2026', 'video', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400', now() - interval '10 days', 234000, 15000, 45000, 56000, 5600000, 4200000, 6.2, 'published'),
    (v_sa_youtube, 'yt_005', 'Social Spark vs Competitors: Honest Review', 'video', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400', now() - interval '14 days', 67000, 4500, 12000, 18000, 1500000, 1100000, 5.4, 'published'),
    (v_sa_youtube, 'yt_006', 'How We Got 1M Subscribers: The Full Story', 'video', 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400', now() - interval '18 days', 340000, 23000, 56000, 78000, 8900000, 6700000, 5.0, 'published'),
    (v_sa_youtube, 'yt_007', 'AI Content Creation: Is It Worth It?', 'video', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400', now() - interval '21 days', 56000, 3400, 9800, 14000, 1200000, 890000, 5.8, 'published'),
    (v_sa_youtube, 'yt_008', 'Complete LinkedIn Strategy for B2B in 2026', 'video', 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400', now() - interval '25 days', 34000, 2100, 6700, 9800, 780000, 560000, 5.3, 'published');

  -- =============================================
  -- FACEBOOK POSTS
  -- =============================================
  INSERT INTO public.social_posts (social_account_id, platform_post_id, caption, media_type, media_url, posted_at, likes_count, comments_count, shares_count, saves_count, impressions_count, reach_count, engagement_rate, status) VALUES
    (v_sa_facebook, 'fb_001', '5 Proven Strategies to Scale Your Small Business in 2026', 'link', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', now() - interval '2 hours', 2700, 112, 890, 120, 98000, 78000, 3.8, 'published'),
    (v_sa_facebook, 'fb_002', 'Were hiring! Join our growing team 🎉', 'image', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400', now() - interval '1 day', 4500, 230, 1200, 340, 156000, 120000, 3.9, 'published'),
    (v_sa_facebook, 'fb_003', 'Live Q&A: Ask Us Anything About Social Media Marketing!', 'video', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', now() - interval '2 days', 8900, 1200, 3400, 560, 340000, 260000, 4.1, 'published'),
    (v_sa_facebook, 'fb_004', 'New feature drop! Automated posting across all platforms 🚀', 'image', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400', now() - interval '3 days', 12000, 890, 4500, 780, 450000, 340000, 4.0, 'published'),
    (v_sa_facebook, 'fb_005', 'Poll: Whats your biggest social media challenge?', 'text', NULL, now() - interval '4 days', 3400, 567, 230, 45, 89000, 67000, 4.8, 'published'),
    (v_sa_facebook, 'fb_006', 'Case Study: How Brand X increased engagement by 300%', 'link', 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400', now() - interval '5 days', 6700, 340, 2100, 450, 234000, 180000, 3.5, 'published'),
    (v_sa_facebook, 'fb_007', 'Weekend tip: Schedule your entire week in 30 minutes ⏰', 'image', 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400', now() - interval '6 days', 5600, 210, 890, 230, 178000, 134000, 3.9, 'published'),
    (v_sa_facebook, 'fb_008', 'Our CEO shares the 3 metrics that matter most 📊', 'video', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400', now() - interval '7 days', 15000, 1800, 5600, 1200, 560000, 420000, 4.2, 'published'),
    (v_sa_facebook, 'fb_009', 'Throwback to our first ever office! Look how far weve come 🏢', 'carousel', 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400', now() - interval '8 days', 23000, 890, 3400, 670, 340000, 260000, 5.2, 'published'),
    (v_sa_facebook, 'fb_010', '2026 Social Media Trends Report - Free Download!', 'link', 'https://images.unsplash.com/photo-1611162617263-4ec3060a058e?w=400', now() - interval '9 days', 8900, 450, 6700, 2300, 456000, 340000, 3.9, 'published');

  -- =============================================
  -- LINKEDIN POSTS
  -- =============================================
  INSERT INTO public.social_posts (social_account_id, platform_post_id, caption, media_type, media_url, posted_at, likes_count, comments_count, shares_count, saves_count, impressions_count, reach_count, engagement_rate, status) VALUES
    (v_sa_linkedin, 'li_001', 'Our Top 3 Lessons Learned in Our First Year of Business', 'text', 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400', now() - interval '1 day', 645500, 9400, 12000, 3400, 890000, 670000, 8.5, 'published'),
    (v_sa_linkedin, 'li_002', 'Why I turned down a $2M offer to keep building Social Spark', 'text', NULL, now() - interval '3 days', 12000, 890, 3400, 1200, 234000, 180000, 7.0, 'published'),
    (v_sa_linkedin, 'li_003', 'The future of B2B social selling is here. And its AI-powered.', 'link', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', now() - interval '5 days', 8900, 560, 2300, 890, 156000, 120000, 7.5, 'published'),
    (v_sa_linkedin, 'li_004', 'Meet the Team: The People Behind Social Spark 🙌', 'image', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400', now() - interval '7 days', 5600, 340, 1200, 450, 89000, 67000, 6.8, 'published'),
    (v_sa_linkedin, 'li_005', 'I interviewed 50 CMOs. Here are the 3 things they all agreed on.', 'text', NULL, now() - interval '9 days', 23000, 1800, 5600, 2100, 345000, 260000, 8.8, 'published'),
    (v_sa_linkedin, 'li_006', 'Hiring: Senior Data Engineer to build our analytics pipeline', 'text', NULL, now() - interval '11 days', 3400, 120, 890, 230, 67000, 45000, 5.5, 'published'),
    (v_sa_linkedin, 'li_007', 'Company culture isnt ping pong tables. Its how you handle failure.', 'text', NULL, now() - interval '13 days', 34000, 2300, 8900, 3400, 560000, 420000, 8.2, 'published'),
    (v_sa_linkedin, 'li_008', 'Our Q1 2026 results: 340% revenue growth. Heres the playbook.', 'carousel', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', now() - interval '15 days', 45000, 3400, 12000, 4500, 780000, 590000, 8.0, 'published');

  -- =============================================
  -- DAILY METRICS (30 days per platform)
  -- =============================================
  INSERT INTO public.social_metrics_daily (social_account_id, metric_date, followers, impressions, reach, profile_visits, website_clicks, likes, comments, shares, saves, engagement_rate, ctr, conversions)
  SELECT v_sa_twitter, d::date,
    234340 - (30 - ROW_NUMBER() OVER(ORDER BY d)) * 85,
    45000 + (random() * 30000)::int, 32000 + (random() * 20000)::int,
    800 + (random() * 400)::int, 120 + (random() * 80)::int,
    1200 + (random() * 800)::int, 150 + (random() * 100)::int,
    400 + (random() * 300)::int, 50 + (random() * 40)::int,
    2.5 + (random() * 2)::numeric(5,2), 1.2 + (random() * 1)::numeric(5,2),
    15 + (random() * 20)::int
  FROM generate_series(CURRENT_DATE - interval '30 days', CURRENT_DATE - interval '1 day', interval '1 day') AS d;

  INSERT INTO public.social_metrics_daily (social_account_id, metric_date, followers, impressions, reach, profile_visits, website_clicks, likes, comments, shares, saves, engagement_rate, ctr, conversions)
  SELECT v_sa_instagram, d::date,
    1400000 - (30 - ROW_NUMBER() OVER(ORDER BY d)) * 450,
    120000 + (random() * 80000)::int, 90000 + (random() * 60000)::int,
    2500 + (random() * 1500)::int, 350 + (random() * 200)::int,
    8000 + (random() * 5000)::int, 800 + (random() * 500)::int,
    1500 + (random() * 1000)::int, 3000 + (random() * 2000)::int,
    5.5 + (random() * 3)::numeric(5,2), 1.8 + (random() * 1.5)::numeric(5,2),
    45 + (random() * 40)::int
  FROM generate_series(CURRENT_DATE - interval '30 days', CURRENT_DATE - interval '1 day', interval '1 day') AS d;

  INSERT INTO public.social_metrics_daily (social_account_id, metric_date, followers, impressions, reach, profile_visits, website_clicks, likes, comments, shares, saves, engagement_rate, ctr, conversions)
  SELECT v_sa_youtube, d::date,
    3400000 - (30 - ROW_NUMBER() OVER(ORDER BY d)) * 1200,
    250000 + (random() * 150000)::int, 180000 + (random() * 120000)::int,
    5000 + (random() * 3000)::int, 800 + (random() * 500)::int,
    15000 + (random() * 10000)::int, 1500 + (random() * 1000)::int,
    3000 + (random() * 2000)::int, 5000 + (random() * 3000)::int,
    4.0 + (random() * 2.5)::numeric(5,2), 2.0 + (random() * 1.5)::numeric(5,2),
    80 + (random() * 60)::int
  FROM generate_series(CURRENT_DATE - interval '30 days', CURRENT_DATE - interval '1 day', interval '1 day') AS d;

  INSERT INTO public.social_metrics_daily (social_account_id, metric_date, followers, impressions, reach, profile_visits, website_clicks, likes, comments, shares, saves, engagement_rate, ctr, conversions)
  SELECT v_sa_facebook, d::date,
    5343400 - (30 - ROW_NUMBER() OVER(ORDER BY d)) * 2500,
    180000 + (random() * 100000)::int, 140000 + (random() * 80000)::int,
    3000 + (random() * 2000)::int, 500 + (random() * 300)::int,
    6000 + (random() * 4000)::int, 600 + (random() * 400)::int,
    2000 + (random() * 1500)::int, 800 + (random() * 500)::int,
    3.5 + (random() * 2)::numeric(5,2), 1.5 + (random() * 1)::numeric(5,2),
    35 + (random() * 30)::int
  FROM generate_series(CURRENT_DATE - interval '30 days', CURRENT_DATE - interval '1 day', interval '1 day') AS d;

  INSERT INTO public.social_metrics_daily (social_account_id, metric_date, followers, impressions, reach, profile_visits, website_clicks, likes, comments, shares, saves, engagement_rate, ctr, conversions)
  SELECT v_sa_linkedin, d::date,
    124340 - (30 - ROW_NUMBER() OVER(ORDER BY d)) * 80,
    35000 + (random() * 20000)::int, 25000 + (random() * 15000)::int,
    600 + (random() * 300)::int, 200 + (random() * 150)::int,
    2000 + (random() * 1500)::int, 300 + (random() * 200)::int,
    800 + (random() * 600)::int, 400 + (random() * 300)::int,
    6.0 + (random() * 3)::numeric(5,2), 2.5 + (random() * 2)::numeric(5,2),
    25 + (random() * 20)::int
  FROM generate_series(CURRENT_DATE - interval '30 days', CURRENT_DATE - interval '1 day', interval '1 day') AS d;

  -- =============================================
  -- AUDIENCE DEMOGRAPHICS
  -- =============================================
  INSERT INTO public.audience_demographics (social_account_id, metric_date, gender_male_percent, gender_female_percent, age_18_24_percent, age_25_34_percent, age_35_44_percent, age_45_54_percent, age_55_plus_percent) VALUES
    (v_sa_twitter, CURRENT_DATE, 62, 38, 28, 35, 22, 10, 5),
    (v_sa_instagram, CURRENT_DATE, 42, 58, 35, 32, 18, 10, 5),
    (v_sa_youtube, CURRENT_DATE, 68, 32, 32, 30, 20, 12, 6),
    (v_sa_facebook, CURRENT_DATE, 52, 48, 18, 28, 25, 18, 11),
    (v_sa_linkedin, CURRENT_DATE, 58, 42, 8, 35, 32, 18, 7);

  -- =============================================
  -- AUDIENCE GEOGRAPHY
  -- =============================================
  INSERT INTO public.audience_geography (social_account_id, metric_date, country, city, audience_percent, impressions, reach) VALUES
    (v_sa_twitter, CURRENT_DATE, 'United States', 'New York', 32.5, 14231, 10800),
    (v_sa_twitter, CURRENT_DATE, 'United Kingdom', 'London', 18.2, 8900, 6700),
    (v_sa_twitter, CURRENT_DATE, 'Germany', 'Berlin', 12.1, 5600, 4200),
    (v_sa_twitter, CURRENT_DATE, 'Australia', 'Sydney', 8.5, 2458, 1800),
    (v_sa_twitter, CURRENT_DATE, 'Canada', 'Toronto', 7.3, 3200, 2400),
    (v_sa_twitter, CURRENT_DATE, 'Italy', 'Milan', 5.8, 1521, 1100),
    (v_sa_instagram, CURRENT_DATE, 'United States', 'Los Angeles', 28.4, 45000, 34000),
    (v_sa_instagram, CURRENT_DATE, 'Brazil', 'Sao Paulo', 15.6, 23000, 17000),
    (v_sa_instagram, CURRENT_DATE, 'United Kingdom', 'London', 12.3, 18000, 13500),
    (v_sa_instagram, CURRENT_DATE, 'Germany', 'Munich', 8.9, 12000, 9000),
    (v_sa_instagram, CURRENT_DATE, 'France', 'Paris', 7.2, 9800, 7400),
    (v_sa_instagram, CURRENT_DATE, 'Australia', 'Melbourne', 6.1, 8500, 6400),
    (v_sa_youtube, CURRENT_DATE, 'United States', 'San Francisco', 35.2, 89000, 67000),
    (v_sa_youtube, CURRENT_DATE, 'India', 'Mumbai', 18.5, 45000, 34000),
    (v_sa_youtube, CURRENT_DATE, 'United Kingdom', 'Manchester', 10.8, 25000, 19000),
    (v_sa_youtube, CURRENT_DATE, 'Canada', 'Vancouver', 8.3, 18000, 13500),
    (v_sa_youtube, CURRENT_DATE, 'Australia', 'Sydney', 6.7, 14000, 10500),
    (v_sa_youtube, CURRENT_DATE, 'Germany', 'Hamburg', 5.4, 11000, 8200),
    (v_sa_facebook, CURRENT_DATE, 'United States', 'Chicago', 30.1, 56000, 42000),
    (v_sa_facebook, CURRENT_DATE, 'Mexico', 'Mexico City', 14.3, 23000, 17000),
    (v_sa_facebook, CURRENT_DATE, 'Brazil', 'Rio de Janeiro', 11.7, 19000, 14000),
    (v_sa_facebook, CURRENT_DATE, 'United Kingdom', 'Birmingham', 9.5, 15000, 11000),
    (v_sa_facebook, CURRENT_DATE, 'Ukraine', 'Kyiv', 7.2, 1243, 9300),
    (v_sa_facebook, CURRENT_DATE, 'Italy', 'Rome', 6.8, 1521, 8500),
    (v_sa_linkedin, CURRENT_DATE, 'United States', 'Austin', 38.5, 12000, 9000),
    (v_sa_linkedin, CURRENT_DATE, 'United Kingdom', 'London', 16.8, 5200, 3900),
    (v_sa_linkedin, CURRENT_DATE, 'Germany', 'Frankfurt', 11.2, 3400, 2600),
    (v_sa_linkedin, CURRENT_DATE, 'Canada', 'Toronto', 9.5, 2800, 2100),
    (v_sa_linkedin, CURRENT_DATE, 'Australia', 'Sydney', 7.8, 2300, 1700),
    (v_sa_linkedin, CURRENT_DATE, 'Netherlands', 'Amsterdam', 5.3, 1600, 1200);

  -- =============================================
  -- AI ANALYSES
  -- =============================================
  INSERT INTO public.ai_analyses (social_account_id, analysis_type, summary, recommendations, score) VALUES
    (v_sa_twitter, 'engagement', 'Twitter engagement is strong with threads performing 3x better than single tweets. Peak engagement occurs between 9-11 AM EST.', '["Post more threads on trending topics","Use polls to boost engagement","Increase posting frequency to 4-5 tweets/day","Leverage Twitter Spaces for community building"]', 7.8),
    (v_sa_twitter, 'timing', 'Best performing times are weekday mornings. Weekend engagement drops 40%.', '["Schedule key content for Tuesday-Thursday 9-11 AM","Avoid posting on Saturday evenings","Use scheduling tools for consistent posting"]', 8.2),
    (v_sa_instagram, 'content', 'Carousel posts generate 4x more saves than single images. Reels drive the highest reach.', '["Increase carousel content to 60% of posts","Add more educational Reels","Use trending audio in Reels","Create saveable infographic content"]', 8.5),
    (v_sa_instagram, 'audience', 'Female audience (58%) dominates. 18-34 age group represents 67% of followers.', '["Create content targeting 25-34 demographic","Explore Portuguese-language content for Brazilian audience","Partner with female creators in lifestyle niche"]', 7.9),
    (v_sa_youtube, 'growth', 'Subscriber growth accelerated 40% after long-form tutorial content. Videos over 15 minutes perform best.', '["Focus on 15-25 minute tutorial videos","Create a content series for subscriber retention","Optimize thumbnails with A/B testing"]', 8.0),
    (v_sa_youtube, 'engagement', 'Comment engagement is highest on controversial opinion videos. Watch time correlates strongly with subscriber conversion.', '["Start videos with a hook in first 30 seconds","Ask questions to drive comments","Create community posts between video uploads"]', 7.5),
    (v_sa_facebook, 'audience', 'Broad demographic spread with strong 25-54 age range. Video posts outperform text by 2.5x.', '["Increase video content ratio","Run more interactive polls","Leverage Facebook Groups for community"]', 7.2),
    (v_sa_facebook, 'content', 'Case studies and behind-the-scenes content drive highest shares.', '["Reduce link-only posts","Share case studies as native content","Use Facebook Live for Q&A sessions"]', 7.6),
    (v_sa_linkedin, 'engagement', 'LinkedIn shows highest engagement rate across all platforms. Thought leadership drives 5x more connections.', '["Post 3-4 times per week consistently","Share personal stories and lessons","Engage in comments within first hour"]', 9.1),
    (v_sa_linkedin, 'growth', 'Professional audience growing steadily. Connection requests increased 120% after thought leadership series.', '["Continue thought leadership series","Tag relevant industry leaders","Cross-post key insights from other platforms"]', 8.8);

  -- =============================================
  -- SCHEDULED POSTS
  -- =============================================
  INSERT INTO public.scheduled_posts (social_account_id, caption, platform, scheduled_for, status, approval_status) VALUES
    (v_sa_twitter, 'Guess what, everyone?! After months of hard work, we just hit a major milestone! 🎉', 'twitter', now() + interval '2 hours', 'pending', 'approved'),
    (v_sa_twitter, 'Thread: 7 underrated tools every social media manager needs in 2026 🧵', 'twitter', now() + interval '1 day', 'pending', 'approved'),
    (v_sa_twitter, 'Hot take Monday: Organic reach isnt dead, your content strategy is.', 'twitter', now() + interval '2 days', 'pending', 'pending'),
    (v_sa_instagram, 'POV: When your analytics dashboard looks this good ✨ #SocialSpark', 'instagram', now() + interval '3 hours', 'pending', 'approved'),
    (v_sa_instagram, 'Save this! Complete guide to Instagram algorithm in 2026 📱', 'instagram', now() + interval '1 day 6 hours', 'pending', 'approved'),
    (v_sa_instagram, 'Reel: Day in the life of our content team 🎬', 'instagram', now() + interval '3 days', 'pending', 'pending'),
    (v_sa_youtube, 'NEW VIDEO: The Complete Social Media Strategy Guide for 2026', 'youtube', now() + interval '2 days', 'pending', 'approved'),
    (v_sa_youtube, 'YouTube Shorts: 3 Quick Analytics Tips', 'youtube', now() + interval '4 days', 'pending', 'approved'),
    (v_sa_youtube, 'Deep Dive: Why Most Social Media Strategies Fail', 'youtube', now() + interval '7 days', 'pending', 'pending'),
    (v_sa_facebook, 'Exciting announcement coming tomorrow! Stay tuned 👀', 'facebook', now() + interval '5 hours', 'pending', 'approved'),
    (v_sa_facebook, 'LIVE: Monthly Social Media Trends Roundup - Join us!', 'facebook', now() + interval '2 days', 'pending', 'approved'),
    (v_sa_facebook, 'Free webinar: Mastering Facebook Ads in 2026', 'facebook', now() + interval '5 days', 'pending', 'pending'),
    (v_sa_linkedin, 'I spent 10 years in corporate marketing. Here are the 5 biggest lies I was told.', 'linkedin', now() + interval '1 day', 'pending', 'approved'),
    (v_sa_linkedin, 'Were excited to announce our Series A! Heres what it means for Social Spark.', 'linkedin', now() + interval '3 days', 'pending', 'approved'),
    (v_sa_linkedin, 'The ROI of personal branding: A data-driven analysis', 'linkedin', now() + interval '6 days', 'pending', 'pending');

END $$;
