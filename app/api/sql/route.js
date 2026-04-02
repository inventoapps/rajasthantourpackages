import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization'
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS });
}

export async function POST(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { success: false, error: 'Supabase admin client not configured' },
        { status: 500, headers: CORS }
      );
    }

    const body = await request.json();
    const { sql, statements } = body;

    // Handle multiple statements (migrations)
    if (statements && Array.isArray(statements)) {
      console.log(`[SQL API] Executing ${statements.length} statements`);
      const results = [];
      
      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i].trim();
        if (!stmt) continue;
        
        console.log(`[SQL API] Statement ${i + 1}: ${stmt.substring(0, 100)}...`);
        
        const { data, error } = await supabaseAdmin.rpc('exec_sql', { query: stmt });
        
        if (error) {
          console.error(`[SQL API] Statement ${i + 1} error:`, error);
          results.push({ index: i, success: false, error: error.message, statement: stmt.substring(0, 100) });
          // Continue with other statements even if one fails
        } else if (data && !data.success) {
          console.error(`[SQL API] Statement ${i + 1} exec error:`, data.error);
          results.push({ index: i, success: false, error: data.error, statement: stmt.substring(0, 100) });
        } else {
          console.log(`[SQL API] Statement ${i + 1} success`);
          results.push({ index: i, success: true, statement: stmt.substring(0, 100) });
        }
      }
      
      const allSuccess = results.every(r => r.success);
      return NextResponse.json(
        { success: allSuccess, results, totalStatements: statements.length },
        { status: allSuccess ? 200 : 207, headers: CORS }
      );
    }

    // Handle single SQL query
    if (sql) {
      console.log(`[SQL API] Executing single query: ${sql.substring(0, 100)}...`);
      
      const { data, error } = await supabaseAdmin.rpc('exec_sql', { query: sql });
      
      if (error) {
        console.error('[SQL API] RPC error:', error);
        return NextResponse.json(
          { success: false, error: error.message, code: error.code },
          { status: 400, headers: CORS }
        );
      }
      
      if (data && !data.success) {
        console.error('[SQL API] Exec error:', data.error);
        return NextResponse.json(
          { success: false, error: data.error },
          { status: 400, headers: CORS }
        );
      }
      
      console.log('[SQL API] Query executed successfully');
      return NextResponse.json(
        { success: true, message: 'Query executed successfully' },
        { status: 200, headers: CORS }
      );
    }

    return NextResponse.json(
      { success: false, error: 'No SQL provided. Send { sql: "..." } or { statements: [...] }' },
      { status: 400, headers: CORS }
    );

  } catch (e) {
    console.error('[SQL API] Unexpected error:', e);
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500, headers: CORS }
    );
  }
}
