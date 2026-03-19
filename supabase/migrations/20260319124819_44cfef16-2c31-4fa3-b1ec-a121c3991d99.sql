
-- =============================================
-- Drop all existing permissive policies
-- =============================================
DROP POLICY IF EXISTS "Plans publicly readable" ON public.plans;
DROP POLICY IF EXISTS "Profiles readable" ON public.profiles;
DROP POLICY IF EXISTS "Profiles insertable" ON public.profiles;
DROP POLICY IF EXISTS "Profiles updatable" ON public.profiles;
DROP POLICY IF EXISTS "Subscriptions readable" ON public.subscriptions;
DROP POLICY IF EXISTS "Social accounts readable" ON public.social_accounts;
DROP POLICY IF EXISTS "Social posts readable" ON public.social_posts;
DROP POLICY IF EXISTS "Metrics readable" ON public.social_metrics_daily;
DROP POLICY IF EXISTS "Demographics readable" ON public.audience_demographics;
DROP POLICY IF EXISTS "Geography readable" ON public.audience_geography;
DROP POLICY IF EXISTS "AI analyses readable" ON public.ai_analyses;
DROP POLICY IF EXISTS "Scheduled posts readable" ON public.scheduled_posts;

-- =============================================
-- Helper function: check if user owns a social_account
-- (avoids repeating join logic in every policy)
-- =============================================
CREATE OR REPLACE FUNCTION public.owns_social_account(_social_account_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.social_accounts sa
    JOIN public.profiles p ON p.id = sa.profile_id
    WHERE sa.id = _social_account_id
      AND p.user_id = auth.uid()
  );
$$;

-- =============================================
-- PLANS: public read (no sensitive data)
-- =============================================
CREATE POLICY "Anyone can read plans"
  ON public.plans FOR SELECT
  USING (true);

-- =============================================
-- PROFILES: user can CRUD only their own row
-- =============================================
CREATE POLICY "Users read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- SUBSCRIPTIONS: owner-only read
-- =============================================
CREATE POLICY "Users read own subscriptions"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (
    auth.uid() = (SELECT p.user_id FROM public.profiles p WHERE p.id = profile_id)
  );

-- =============================================
-- SOCIAL ACCOUNTS: owner-only CRUD
-- =============================================
CREATE POLICY "Users read own social accounts"
  ON public.social_accounts FOR SELECT
  TO authenticated
  USING (
    auth.uid() = (SELECT p.user_id FROM public.profiles p WHERE p.id = profile_id)
  );

CREATE POLICY "Users insert own social accounts"
  ON public.social_accounts FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = (SELECT p.user_id FROM public.profiles p WHERE p.id = profile_id)
  );

CREATE POLICY "Users update own social accounts"
  ON public.social_accounts FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = (SELECT p.user_id FROM public.profiles p WHERE p.id = profile_id)
  );

CREATE POLICY "Users delete own social accounts"
  ON public.social_accounts FOR DELETE
  TO authenticated
  USING (
    auth.uid() = (SELECT p.user_id FROM public.profiles p WHERE p.id = profile_id)
  );

-- =============================================
-- SOCIAL POSTS: owner via social_account
-- =============================================
CREATE POLICY "Users read own posts"
  ON public.social_posts FOR SELECT
  TO authenticated
  USING (public.owns_social_account(social_account_id));

CREATE POLICY "Users insert own posts"
  ON public.social_posts FOR INSERT
  TO authenticated
  WITH CHECK (public.owns_social_account(social_account_id));

CREATE POLICY "Users update own posts"
  ON public.social_posts FOR UPDATE
  TO authenticated
  USING (public.owns_social_account(social_account_id));

CREATE POLICY "Users delete own posts"
  ON public.social_posts FOR DELETE
  TO authenticated
  USING (public.owns_social_account(social_account_id));

-- =============================================
-- SCHEDULED POSTS: owner via social_account
-- =============================================
CREATE POLICY "Users read own scheduled posts"
  ON public.scheduled_posts FOR SELECT
  TO authenticated
  USING (public.owns_social_account(social_account_id));

CREATE POLICY "Users insert own scheduled posts"
  ON public.scheduled_posts FOR INSERT
  TO authenticated
  WITH CHECK (public.owns_social_account(social_account_id));

CREATE POLICY "Users update own scheduled posts"
  ON public.scheduled_posts FOR UPDATE
  TO authenticated
  USING (public.owns_social_account(social_account_id));

CREATE POLICY "Users delete own scheduled posts"
  ON public.scheduled_posts FOR DELETE
  TO authenticated
  USING (public.owns_social_account(social_account_id));

-- =============================================
-- SOCIAL METRICS DAILY: owner read-only
-- =============================================
CREATE POLICY "Users read own metrics"
  ON public.social_metrics_daily FOR SELECT
  TO authenticated
  USING (public.owns_social_account(social_account_id));

-- =============================================
-- AUDIENCE DEMOGRAPHICS: owner read-only
-- =============================================
CREATE POLICY "Users read own demographics"
  ON public.audience_demographics FOR SELECT
  TO authenticated
  USING (public.owns_social_account(social_account_id));

-- =============================================
-- AUDIENCE GEOGRAPHY: owner read-only
-- =============================================
CREATE POLICY "Users read own geography"
  ON public.audience_geography FOR SELECT
  TO authenticated
  USING (public.owns_social_account(social_account_id));

-- =============================================
-- AI ANALYSES: owner CRUD
-- =============================================
CREATE POLICY "Users read own analyses"
  ON public.ai_analyses FOR SELECT
  TO authenticated
  USING (public.owns_social_account(social_account_id));

CREATE POLICY "Users insert own analyses"
  ON public.ai_analyses FOR INSERT
  TO authenticated
  WITH CHECK (public.owns_social_account(social_account_id));

CREATE POLICY "Users update own analyses"
  ON public.ai_analyses FOR UPDATE
  TO authenticated
  USING (public.owns_social_account(social_account_id));

CREATE POLICY "Users delete own analyses"
  ON public.ai_analyses FOR DELETE
  TO authenticated
  USING (public.owns_social_account(social_account_id));
