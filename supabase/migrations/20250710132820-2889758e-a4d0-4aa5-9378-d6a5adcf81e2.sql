
-- Update analysis_sessions table to include the new ML-enhanced parameters
ALTER TABLE public.analysis_sessions 
ADD COLUMN IF NOT EXISTS ml_enhanced BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS deep_scan BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS max_threads INTEGER DEFAULT 1;

-- Create a more comprehensive vulnerability_details table structure
ALTER TABLE public.vulnerability_details 
ADD COLUMN IF NOT EXISTS confidence DECIMAL(3,2) DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS recovered_private_key TEXT,
ADD COLUMN IF NOT EXISTS signature_data JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS analysis_metadata JSONB DEFAULT '{}';

-- Update vulnerability_details to support the new vulnerability types
ALTER TABLE public.vulnerability_details 
DROP CONSTRAINT IF EXISTS vulnerability_details_vulnerability_type_check;

-- Add proper indexing for better performance
CREATE INDEX IF NOT EXISTS idx_vulnerability_details_confidence ON public.vulnerability_details(confidence DESC);
CREATE INDEX IF NOT EXISTS idx_vulnerability_details_block_height ON public.vulnerability_details(block_height);
CREATE INDEX IF NOT EXISTS idx_analysis_sessions_status ON public.analysis_sessions(status);
CREATE INDEX IF NOT EXISTS idx_analysis_sessions_created_at ON public.analysis_sessions(created_at DESC);

-- Add trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_analysis_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_analysis_sessions_updated_at_trigger
    BEFORE UPDATE ON public.analysis_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_analysis_sessions_updated_at();

-- Create a function to clean up old analysis sessions (older than 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_analysis_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public.analysis_sessions 
    WHERE created_at < NOW() - INTERVAL '30 days'
    AND status IN ('completed', 'error');
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;
