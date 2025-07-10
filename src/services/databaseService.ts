
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export interface AnalysisSessionData {
  start_height: number;
  end_height: number;
  ml_enhanced?: boolean;
  deep_scan?: boolean;
  max_threads?: number;
  status?: string;
}

export interface VulnerabilityData {
  analysis_session_id: string;
  vulnerability_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  r_value: string;
  block_height?: number;
  confidence?: number;
  recovered_private_key?: string;
  signature_data?: any;
  analysis_metadata?: any;
  affected_transactions?: any;
}

class DatabaseService {
  async createAnalysisSession(data: AnalysisSessionData): Promise<string> {
    const sessionData: TablesInsert<'analysis_sessions'> = {
      start_height: data.start_height,
      end_height: data.end_height,
      ml_enhanced: data.ml_enhanced || false,
      deep_scan: data.deep_scan || false,
      max_threads: data.max_threads || 1,
      status: data.status || 'running',
      total_blocks: data.end_height - data.start_height + 1,
    };

    const { data: session, error } = await supabase
      .from('analysis_sessions')
      .insert(sessionData)
      .select('id')
      .single();

    if (error) {
      console.error('Error creating analysis session:', error);
      throw error;
    }

    return session.id;
  }

  async updateAnalysisSession(
    sessionId: string, 
    updates: Partial<Tables<'analysis_sessions'>>
  ): Promise<void> {
    const { error } = await supabase
      .from('analysis_sessions')
      .update(updates)
      .eq('id', sessionId);

    if (error) {
      console.error('Error updating analysis session:', error);
      throw error;
    }
  }

  async createVulnerability(data: VulnerabilityData): Promise<string> {
    const vulnData: TablesInsert<'vulnerability_details'> = {
      analysis_session_id: data.analysis_session_id,
      vulnerability_type: data.vulnerability_type,
      severity: data.severity,
      r_value: data.r_value,
      block_height: data.block_height,
      confidence: data.confidence,
      recovered_private_key: data.recovered_private_key,
      signature_data: data.signature_data || {},
      analysis_metadata: data.analysis_metadata || {},
      affected_transactions: data.affected_transactions || [],
    };

    const { data: vulnerability, error } = await supabase
      .from('vulnerability_details')
      .insert(vulnData)
      .select('id')
      .single();

    if (error) {
      console.error('Error creating vulnerability:', error);
      throw error;
    }

    return vulnerability.id;
  }

  async getAnalysisSession(sessionId: string): Promise<Tables<'analysis_sessions'> | null> {
    const { data, error } = await supabase
      .from('analysis_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (error) {
      console.error('Error fetching analysis session:', error);
      return null;
    }

    return data;
  }

  async getAnalysisSessions(limit: number = 10): Promise<Tables<'analysis_sessions'>[]> {
    const { data, error } = await supabase
      .from('analysis_sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching analysis sessions:', error);
      return [];
    }

    return data || [];
  }

  async getVulnerabilities(sessionId?: string, limit: number = 50): Promise<Tables<'vulnerability_details'>[]> {
    let query = supabase
      .from('vulnerability_details')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (sessionId) {
      query = query.eq('analysis_session_id', sessionId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching vulnerabilities:', error);
      return [];
    }

    return data || [];
  }

  async getVulnerabilityStats(): Promise<{
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  }> {
    const { data, error } = await supabase
      .from('vulnerability_details')
      .select('severity');

    if (error) {
      console.error('Error fetching vulnerability stats:', error);
      return { total: 0, critical: 0, high: 0, medium: 0, low: 0 };
    }

    const stats = data.reduce((acc, vuln) => {
      acc.total++;
      acc[vuln.severity as keyof typeof acc]++;
      return acc;
    }, { total: 0, critical: 0, high: 0, medium: 0, low: 0 });

    return stats;
  }

  async cleanupOldSessions(): Promise<number> {
    const { data, error } = await supabase.rpc('cleanup_old_analysis_sessions');

    if (error) {
      console.error('Error cleaning up old sessions:', error);
      return 0;
    }

    return data || 0;
  }
}

export const databaseService = new DatabaseService();
