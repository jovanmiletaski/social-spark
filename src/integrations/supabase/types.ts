export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      ai_analyses: {
        Row: {
          analysis_type: Database["public"]["Enums"]["analysis_type"]
          created_at: string
          id: string
          recommendations: Json | null
          related_post_id: string | null
          score: number | null
          social_account_id: string
          summary: string
        }
        Insert: {
          analysis_type: Database["public"]["Enums"]["analysis_type"]
          created_at?: string
          id?: string
          recommendations?: Json | null
          related_post_id?: string | null
          score?: number | null
          social_account_id: string
          summary: string
        }
        Update: {
          analysis_type?: Database["public"]["Enums"]["analysis_type"]
          created_at?: string
          id?: string
          recommendations?: Json | null
          related_post_id?: string | null
          score?: number | null
          social_account_id?: string
          summary?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_analyses_related_post_id_fkey"
            columns: ["related_post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_analyses_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      audience_demographics: {
        Row: {
          age_18_24_percent: number
          age_25_34_percent: number
          age_35_44_percent: number
          age_45_54_percent: number
          age_55_plus_percent: number
          gender_female_percent: number
          gender_male_percent: number
          id: string
          metric_date: string
          social_account_id: string
        }
        Insert: {
          age_18_24_percent?: number
          age_25_34_percent?: number
          age_35_44_percent?: number
          age_45_54_percent?: number
          age_55_plus_percent?: number
          gender_female_percent?: number
          gender_male_percent?: number
          id?: string
          metric_date: string
          social_account_id: string
        }
        Update: {
          age_18_24_percent?: number
          age_25_34_percent?: number
          age_35_44_percent?: number
          age_45_54_percent?: number
          age_55_plus_percent?: number
          gender_female_percent?: number
          gender_male_percent?: number
          id?: string
          metric_date?: string
          social_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audience_demographics_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      audience_geography: {
        Row: {
          audience_percent: number
          city: string | null
          country: string
          id: string
          impressions: number
          metric_date: string
          reach: number
          social_account_id: string
        }
        Insert: {
          audience_percent?: number
          city?: string | null
          country: string
          id?: string
          impressions?: number
          metric_date: string
          reach?: number
          social_account_id: string
        }
        Update: {
          audience_percent?: number
          city?: string | null
          country?: string
          id?: string
          impressions?: number
          metric_date?: string
          reach?: number
          social_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audience_geography_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          features_json: Json | null
          id: string
          name: string
          price_monthly: number
          price_yearly: number
        }
        Insert: {
          created_at?: string
          features_json?: Json | null
          id?: string
          name: string
          price_monthly?: number
          price_yearly?: number
        }
        Update: {
          created_at?: string
          features_json?: Json | null
          id?: string
          name?: string
          price_monthly?: number
          price_yearly?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      scheduled_posts: {
        Row: {
          approval_status: Database["public"]["Enums"]["approval_status"]
          caption: string
          created_at: string
          id: string
          media_url: string | null
          platform: Database["public"]["Enums"]["platform_type"]
          scheduled_for: string
          social_account_id: string
          status: Database["public"]["Enums"]["scheduled_post_status"]
        }
        Insert: {
          approval_status?: Database["public"]["Enums"]["approval_status"]
          caption: string
          created_at?: string
          id?: string
          media_url?: string | null
          platform: Database["public"]["Enums"]["platform_type"]
          scheduled_for: string
          social_account_id: string
          status?: Database["public"]["Enums"]["scheduled_post_status"]
        }
        Update: {
          approval_status?: Database["public"]["Enums"]["approval_status"]
          caption?: string
          created_at?: string
          id?: string
          media_url?: string | null
          platform?: Database["public"]["Enums"]["platform_type"]
          scheduled_for?: string
          social_account_id?: string
          status?: Database["public"]["Enums"]["scheduled_post_status"]
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_posts_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      social_accounts: {
        Row: {
          account_name: string
          connected_at: string
          followers_count: number
          following_count: number
          handle: string
          id: string
          is_active: boolean
          platform: Database["public"]["Enums"]["platform_type"]
          posts_count: number
          profile_id: string
          profile_image_url: string | null
        }
        Insert: {
          account_name: string
          connected_at?: string
          followers_count?: number
          following_count?: number
          handle: string
          id?: string
          is_active?: boolean
          platform: Database["public"]["Enums"]["platform_type"]
          posts_count?: number
          profile_id: string
          profile_image_url?: string | null
        }
        Update: {
          account_name?: string
          connected_at?: string
          followers_count?: number
          following_count?: number
          handle?: string
          id?: string
          is_active?: boolean
          platform?: Database["public"]["Enums"]["platform_type"]
          posts_count?: number
          profile_id?: string
          profile_image_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_accounts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_metrics_daily: {
        Row: {
          comments: number
          conversions: number
          ctr: number
          engagement_rate: number
          followers: number
          id: string
          impressions: number
          likes: number
          metric_date: string
          profile_visits: number
          reach: number
          saves: number
          shares: number
          social_account_id: string
          website_clicks: number
        }
        Insert: {
          comments?: number
          conversions?: number
          ctr?: number
          engagement_rate?: number
          followers?: number
          id?: string
          impressions?: number
          likes?: number
          metric_date: string
          profile_visits?: number
          reach?: number
          saves?: number
          shares?: number
          social_account_id: string
          website_clicks?: number
        }
        Update: {
          comments?: number
          conversions?: number
          ctr?: number
          engagement_rate?: number
          followers?: number
          id?: string
          impressions?: number
          likes?: number
          metric_date?: string
          profile_visits?: number
          reach?: number
          saves?: number
          shares?: number
          social_account_id?: string
          website_clicks?: number
        }
        Relationships: [
          {
            foreignKeyName: "social_metrics_daily_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      social_posts: {
        Row: {
          caption: string | null
          comments_count: number
          created_at: string
          engagement_rate: number
          id: string
          impressions_count: number
          likes_count: number
          media_type: Database["public"]["Enums"]["media_type"]
          media_url: string | null
          platform_post_id: string | null
          posted_at: string
          reach_count: number
          saves_count: number
          shares_count: number
          social_account_id: string
          status: Database["public"]["Enums"]["post_status"]
        }
        Insert: {
          caption?: string | null
          comments_count?: number
          created_at?: string
          engagement_rate?: number
          id?: string
          impressions_count?: number
          likes_count?: number
          media_type?: Database["public"]["Enums"]["media_type"]
          media_url?: string | null
          platform_post_id?: string | null
          posted_at?: string
          reach_count?: number
          saves_count?: number
          shares_count?: number
          social_account_id: string
          status?: Database["public"]["Enums"]["post_status"]
        }
        Update: {
          caption?: string | null
          comments_count?: number
          created_at?: string
          engagement_rate?: number
          id?: string
          impressions_count?: number
          likes_count?: number
          media_type?: Database["public"]["Enums"]["media_type"]
          media_url?: string | null
          platform_post_id?: string | null
          posted_at?: string
          reach_count?: number
          saves_count?: number
          shares_count?: number
          social_account_id?: string
          status?: Database["public"]["Enums"]["post_status"]
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          billing_cycle: Database["public"]["Enums"]["billing_cycle"]
          created_at: string
          ends_at: string | null
          id: string
          plan_id: string
          profile_id: string
          starts_at: string
          status: Database["public"]["Enums"]["subscription_status"]
        }
        Insert: {
          billing_cycle?: Database["public"]["Enums"]["billing_cycle"]
          created_at?: string
          ends_at?: string | null
          id?: string
          plan_id: string
          profile_id: string
          starts_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
        }
        Update: {
          billing_cycle?: Database["public"]["Enums"]["billing_cycle"]
          created_at?: string
          ends_at?: string | null
          id?: string
          plan_id?: string
          profile_id?: string
          starts_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      analysis_type:
        | "growth"
        | "engagement"
        | "audience"
        | "content"
        | "competitor"
        | "timing"
      approval_status: "approved" | "pending" | "rejected"
      billing_cycle: "monthly" | "yearly"
      media_type:
        | "image"
        | "video"
        | "carousel"
        | "text"
        | "link"
        | "reel"
        | "story"
      platform_type:
        | "twitter"
        | "instagram"
        | "youtube"
        | "facebook"
        | "linkedin"
      post_status: "published" | "draft" | "archived" | "deleted"
      scheduled_post_status: "pending" | "published" | "failed" | "cancelled"
      subscription_status: "active" | "cancelled" | "past_due" | "trialing"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      analysis_type: [
        "growth",
        "engagement",
        "audience",
        "content",
        "competitor",
        "timing",
      ],
      approval_status: ["approved", "pending", "rejected"],
      billing_cycle: ["monthly", "yearly"],
      media_type: [
        "image",
        "video",
        "carousel",
        "text",
        "link",
        "reel",
        "story",
      ],
      platform_type: [
        "twitter",
        "instagram",
        "youtube",
        "facebook",
        "linkedin",
      ],
      post_status: ["published", "draft", "archived", "deleted"],
      scheduled_post_status: ["pending", "published", "failed", "cancelled"],
      subscription_status: ["active", "cancelled", "past_due", "trialing"],
    },
  },
} as const
