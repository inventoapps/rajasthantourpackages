import { NextResponse } from 'next/server';

const EXEC_SQL_FUNCTION = `-- Create the exec_sql function for executing SQL from the application
-- Run this ONCE in your Supabase SQL Editor to enable SQL execution from the app

CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  EXECUTE query;
  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Grant execute permission to service_role (used by the app)
GRANT EXECUTE ON FUNCTION exec_sql(text) TO service_role;

-- Optional: Grant to authenticated users if needed
-- GRANT EXECUTE ON FUNCTION exec_sql(text) TO authenticated;
`;

export async function GET() {
  return NextResponse.json({
    sql: EXEC_SQL_FUNCTION,
    instructions: [
      '1. Copy the SQL below',
      '2. Go to Supabase Dashboard > SQL Editor',
      '3. Paste and run the SQL',
      '4. Once done, you can execute SQL from the app'
    ]
  });
}
