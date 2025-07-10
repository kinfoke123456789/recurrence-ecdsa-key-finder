export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          details: Json | null
          id: string
          session_id: string | null
          timestamp: string
          transaction_id: string | null
        }
        Insert: {
          action: string
          details?: Json | null
          id?: string
          session_id?: string | null
          timestamp?: string
          transaction_id?: string | null
        }
        Update: {
          action?: string
          details?: Json | null
          id?: string
          session_id?: string | null
          timestamp?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "kiosk_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_logs_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "device_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          alert_type: string
          amount: string | null
          blockchain: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          severity: string
        }
        Insert: {
          alert_type: string
          amount?: string | null
          blockchain?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          severity?: string
        }
        Update: {
          alert_type?: string
          amount?: string | null
          blockchain?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          severity?: string
        }
        Relationships: []
      }
      analysis_sessions: {
        Row: {
          created_at: string
          current_block: number | null
          deep_scan: boolean | null
          end_height: number
          error_message: string | null
          id: string
          max_threads: number | null
          ml_enhanced: boolean | null
          progress: number
          r_reuse_count: number
          start_height: number
          status: string
          total_blocks: number
          total_signatures: number
          total_transactions: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_block?: number | null
          deep_scan?: boolean | null
          end_height: number
          error_message?: string | null
          id?: string
          max_threads?: number | null
          ml_enhanced?: boolean | null
          progress?: number
          r_reuse_count?: number
          start_height: number
          status?: string
          total_blocks?: number
          total_signatures?: number
          total_transactions?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_block?: number | null
          deep_scan?: boolean | null
          end_height?: number
          error_message?: string | null
          id?: string
          max_threads?: number | null
          ml_enhanced?: boolean | null
          progress?: number
          r_reuse_count?: number
          start_height?: number
          status?: string
          total_blocks?: number
          total_signatures?: number
          total_transactions?: number
          updated_at?: string
        }
        Relationships: []
      }
      arbitrage_opportunities: {
        Row: {
          buy_exchange: string
          buy_price: number
          created_at: string
          id: string
          market_cap: number | null
          profit_amount: number
          profit_percentage: number
          sell_exchange: string
          sell_price: number
          token_name: string
          token_symbol: string
          updated_at: string
          volume_24h: number | null
        }
        Insert: {
          buy_exchange: string
          buy_price: number
          created_at?: string
          id?: string
          market_cap?: number | null
          profit_amount: number
          profit_percentage: number
          sell_exchange: string
          sell_price: number
          token_name: string
          token_symbol: string
          updated_at?: string
          volume_24h?: number | null
        }
        Update: {
          buy_exchange?: string
          buy_price?: number
          created_at?: string
          id?: string
          market_cap?: number | null
          profit_amount?: number
          profit_percentage?: number
          sell_exchange?: string
          sell_price?: number
          token_name?: string
          token_symbol?: string
          updated_at?: string
          volume_24h?: number | null
        }
        Relationships: []
      }
      cases: {
        Row: {
          addresses_count: number | null
          amount_involved: number | null
          assigned_agent: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          priority: string
          progress: number | null
          status: string
          title: string
          transactions_count: number | null
          updated_at: string | null
        }
        Insert: {
          addresses_count?: number | null
          amount_involved?: number | null
          assigned_agent?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          priority?: string
          progress?: number | null
          status?: string
          title: string
          transactions_count?: number | null
          updated_at?: string | null
        }
        Update: {
          addresses_count?: number | null
          amount_involved?: number | null
          assigned_agent?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          priority?: string
          progress?: number | null
          status?: string
          title?: string
          transactions_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cases_assigned_agent_fkey"
            columns: ["assigned_agent"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cases_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      device_models: {
        Row: {
          base_value: number
          brand: string
          created_at: string
          device_type: string
          id: string
          model: string
          updated_at: string
        }
        Insert: {
          base_value?: number
          brand: string
          created_at?: string
          device_type: string
          id?: string
          model: string
          updated_at?: string
        }
        Update: {
          base_value?: number
          brand?: string
          created_at?: string
          device_type?: string
          id?: string
          model?: string
          updated_at?: string
        }
        Relationships: []
      }
      device_transactions: {
        Row: {
          created_at: string
          device_condition: string
          device_model_id: string | null
          estimated_value: number
          final_payout: number
          id: string
          payout_method: string
          scan_data: Json | null
          status: string
          updated_at: string
          user_id: string | null
          verification_data: Json | null
        }
        Insert: {
          created_at?: string
          device_condition: string
          device_model_id?: string | null
          estimated_value: number
          final_payout: number
          id?: string
          payout_method: string
          scan_data?: Json | null
          status?: string
          updated_at?: string
          user_id?: string | null
          verification_data?: Json | null
        }
        Update: {
          created_at?: string
          device_condition?: string
          device_model_id?: string | null
          estimated_value?: number
          final_payout?: number
          id?: string
          payout_method?: string
          scan_data?: Json | null
          status?: string
          updated_at?: string
          user_id?: string | null
          verification_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "device_transactions_device_model_id_fkey"
            columns: ["device_model_id"]
            isOneToOne: false
            referencedRelation: "device_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "device_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_reports: {
        Row: {
          attachments_count: number | null
          author: string | null
          case_id: string | null
          content: Json | null
          created_at: string | null
          id: string
          pages_count: number | null
          report_type: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          attachments_count?: number | null
          author?: string | null
          case_id?: string | null
          content?: Json | null
          created_at?: string | null
          id?: string
          pages_count?: number | null
          report_type: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          attachments_count?: number | null
          author?: string | null
          case_id?: string | null
          content?: Json | null
          created_at?: string | null
          id?: string
          pages_count?: number | null
          report_type?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_reports_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_reports_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      exchange_prices: {
        Row: {
          created_at: string
          exchange_name: string
          id: string
          last_updated: string
          price: number
          token_symbol: string
          volume_24h: number | null
        }
        Insert: {
          created_at?: string
          exchange_name: string
          id?: string
          last_updated?: string
          price: number
          token_symbol: string
          volume_24h?: number | null
        }
        Update: {
          created_at?: string
          exchange_name?: string
          id?: string
          last_updated?: string
          price?: number
          token_symbol?: string
          volume_24h?: number | null
        }
        Relationships: []
      }
      flash_loan_transactions: {
        Row: {
          buy_price: number
          created_at: string
          exchange_fees: number
          exchange_from: string
          exchange_to: string
          flash_loan_fee: number
          gas_fees: number
          id: string
          loan_amount: number
          net_profit: number
          sell_price: number
          status: string
          token_symbol: string
          updated_at: string
        }
        Insert: {
          buy_price: number
          created_at?: string
          exchange_fees: number
          exchange_from: string
          exchange_to: string
          flash_loan_fee: number
          gas_fees: number
          id?: string
          loan_amount: number
          net_profit: number
          sell_price: number
          status?: string
          token_symbol: string
          updated_at?: string
        }
        Update: {
          buy_price?: number
          created_at?: string
          exchange_fees?: number
          exchange_from?: string
          exchange_to?: string
          flash_loan_fee?: number
          gas_fees?: number
          id?: string
          loan_amount?: number
          net_profit?: number
          sell_price?: number
          status?: string
          token_symbol?: string
          updated_at?: string
        }
        Relationships: []
      }
      kiosk_sessions: {
        Row: {
          created_at: string
          current_step: string
          expires_at: string
          id: string
          session_data: Json
          session_token: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_step?: string
          expires_at: string
          id?: string
          session_data?: Json
          session_token: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_step?: string
          expires_at?: string
          id?: string
          session_data?: Json
          session_token?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kiosk_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profit_analytics: {
        Row: {
          average_profit_per_trade: number | null
          best_opportunity_profit: number | null
          created_at: string
          date: string
          id: string
          net_profit: number
          successful_trades: number
          total_fees: number
          total_profit: number
          total_trades: number
          updated_at: string
        }
        Insert: {
          average_profit_per_trade?: number | null
          best_opportunity_profit?: number | null
          created_at?: string
          date: string
          id?: string
          net_profit?: number
          successful_trades?: number
          total_fees?: number
          total_profit?: number
          total_trades?: number
          updated_at?: string
        }
        Update: {
          average_profit_per_trade?: number | null
          best_opportunity_profit?: number | null
          created_at?: string
          date?: string
          id?: string
          net_profit?: number
          successful_trades?: number
          total_fees?: number
          total_profit?: number
          total_trades?: number
          updated_at?: string
        }
        Relationships: []
      }
      transaction_traces: {
        Row: {
          blockchain: string
          case_id: string | null
          connected_addresses_count: number | null
          created_at: string | null
          id: string
          risk_assessment: string | null
          search_query: string
          total_transactions: number | null
          trace_results: Json | null
          traced_by: string | null
        }
        Insert: {
          blockchain: string
          case_id?: string | null
          connected_addresses_count?: number | null
          created_at?: string | null
          id?: string
          risk_assessment?: string | null
          search_query: string
          total_transactions?: number | null
          trace_results?: Json | null
          traced_by?: string | null
        }
        Update: {
          blockchain?: string
          case_id?: string | null
          connected_addresses_count?: number | null
          created_at?: string | null
          id?: string
          risk_assessment?: string | null
          search_query?: string
          total_transactions?: number | null
          trace_results?: Json | null
          traced_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_traces_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_traces_traced_by_fkey"
            columns: ["traced_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      vulnerability_details: {
        Row: {
          affected_transactions: Json
          analysis_metadata: Json | null
          analysis_session_id: string
          bitcoin_address: string | null
          block_height: number | null
          confidence: number | null
          created_at: string
          id: string
          private_key_hex: string | null
          private_key_wif: string | null
          public_key: string | null
          r_value: string
          recovered_private_key: string | null
          severity: Database["public"]["Enums"]["vulnerability_severity"]
          signature_data: Json | null
          vulnerability_type: string
        }
        Insert: {
          affected_transactions?: Json
          analysis_metadata?: Json | null
          analysis_session_id: string
          bitcoin_address?: string | null
          block_height?: number | null
          confidence?: number | null
          created_at?: string
          id?: string
          private_key_hex?: string | null
          private_key_wif?: string | null
          public_key?: string | null
          r_value: string
          recovered_private_key?: string | null
          severity: Database["public"]["Enums"]["vulnerability_severity"]
          signature_data?: Json | null
          vulnerability_type: string
        }
        Update: {
          affected_transactions?: Json
          analysis_metadata?: Json | null
          analysis_session_id?: string
          bitcoin_address?: string | null
          block_height?: number | null
          confidence?: number | null
          created_at?: string
          id?: string
          private_key_hex?: string | null
          private_key_wif?: string | null
          public_key?: string | null
          r_value?: string
          recovered_private_key?: string | null
          severity?: Database["public"]["Enums"]["vulnerability_severity"]
          signature_data?: Json | null
          vulnerability_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "vulnerability_details_analysis_session_id_fkey"
            columns: ["analysis_session_id"]
            isOneToOne: false
            referencedRelation: "analysis_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      vulnerable_transactions: {
        Row: {
          block_height: number | null
          created_at: string
          id: string
          source: string
          timestamp: number
          txid: string
          updated_at: string
          vulnerabilities: Json
        }
        Insert: {
          block_height?: number | null
          created_at?: string
          id?: string
          source: string
          timestamp: number
          txid: string
          updated_at?: string
          vulnerabilities?: Json
        }
        Update: {
          block_height?: number | null
          created_at?: string
          id?: string
          source?: string
          timestamp?: number
          txid?: string
          updated_at?: string
          vulnerabilities?: Json
        }
        Relationships: []
      }
      wallet_analyses: {
        Row: {
          analyzed_by: string | null
          behavior_profile: Json | null
          blockchain: string
          case_id: string | null
          classification: string
          connected_entities: Json | null
          created_at: string | null
          id: string
          risk_score: number
          suspicious_activities: Json | null
          timeline: Json | null
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          analyzed_by?: string | null
          behavior_profile?: Json | null
          blockchain?: string
          case_id?: string | null
          classification: string
          connected_entities?: Json | null
          created_at?: string | null
          id?: string
          risk_score: number
          suspicious_activities?: Json | null
          timeline?: Json | null
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          analyzed_by?: string | null
          behavior_profile?: Json | null
          blockchain?: string
          case_id?: string | null
          classification?: string
          connected_entities?: Json | null
          created_at?: string | null
          id?: string
          risk_score?: number
          suspicious_activities?: Json | null
          timeline?: Json | null
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_analyses_analyzed_by_fkey"
            columns: ["analyzed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_analyses_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_analysis_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      vulnerability_severity: "low" | "medium" | "high" | "critical"
      vulnerability_type: "Dust" | "BareMultisig" | "TimeLock"
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
      vulnerability_severity: ["low", "medium", "high", "critical"],
      vulnerability_type: ["Dust", "BareMultisig", "TimeLock"],
    },
  },
} as const
