'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Copy, ExternalLink, Database, Loader2, Rocket, AlertTriangle, Info, Play, Terminal } from 'lucide-react';

export default function SetupPage() {
  const [sql, setSql] = useState('');
  const [alterSql, setAlterSql] = useState('');
  const [execSqlFunction, setExecSqlFunction] = useState('');
  const [status, setStatus] = useState({ tables: {}, hasExtendedFields: false, hasBlogExtendedFields: false });
  const [checking, setChecking] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState(null);
  const [copied, setCopied] = useState('');
  
  // SQL Editor state
  const [sqlInput, setSqlInput] = useState('');
  const [executing, setExecuting] = useState(false);
  const [execResult, setExecResult] = useState(null);
  const [execFunctionExists, setExecFunctionExists] = useState(false);

  const checkTables = async () => {
    setChecking(true);
    try {
      const res = await fetch('/api/setup-check');
      const data = await res.json();
      setStatus(data);
    } catch (e) { console.error(e); }
    setChecking(false);
  };

  const checkExecFunction = async () => {
    try {
      // Try a simple test query
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: 'SELECT 1' })
      });
      const data = await res.json();
      setExecFunctionExists(data.success || (data.error && !data.error.includes('exec_sql')));
    } catch (e) {
      setExecFunctionExists(false);
    }
  };

  const fetchSql = async () => {
    const [r1, r2, r3] = await Promise.all([
      fetch('/api/setup-sql').then(r => r.json()),
      fetch('/api/alter-sql').then(r => r.json()),
      fetch('/api/setup-sql-exec').then(r => r.json()),
    ]);
    setSql(r1.sql || '');
    setAlterSql(r2.sql || '');
    setExecSqlFunction(r3.sql || '');
  };

  const seedData = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await fetch('/api/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
      const data = await res.json();
      setSeedResult(data);
      if (data.success) checkTables();
    } catch (e) { setSeedResult({ success: false, error: e.message }); }
    setSeeding(false);
  };

  const executeSql = async () => {
    if (!sqlInput.trim()) return;
    setExecuting(true);
    setExecResult(null);
    try {
      // Split by semicolons for multiple statements
      const statements = sqlInput.split(';').map(s => s.trim()).filter(Boolean);
      
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statements.length > 1 ? { statements } : { sql: sqlInput })
      });
      const data = await res.json();
      setExecResult(data);
      
      if (data.success) {
        checkTables();
        checkExecFunction();
      }
    } catch (e) {
      setExecResult({ success: false, error: e.message });
    }
    setExecuting(false);
  };

  const copySql = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const loadSqlToEditor = (sqlText, key) => {
    setSqlInput(sqlText);
    copySql(sqlText, key);
  };

  useEffect(() => {
    checkTables();
    fetchSql();
    checkExecFunction();
  }, []);

  const tables = status.tables || {};
  const allTablesExist = Object.values(tables).every(v => v === true);
  const needsExtendedFields = allTablesExist && (!status.hasExtendedFields || !status.hasBlogExtendedFields);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" data-testid="setup-title">Database Setup</h1>
        <p className="text-muted-foreground">Set up your Supabase database tables and execute SQL queries</p>
      </div>

      {/* SQL Execution Setup - Show first if exec_sql function doesn't exist */}
      {!execFunctionExists && (
        <Card className="mb-6 border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600" />
              Step 0: Enable SQL Execution (One-time Setup)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              To execute SQL from this app, you need to create the <code className="bg-gray-100 px-1 rounded">exec_sql</code> function in Supabase.
              <strong className="text-blue-700"> Run this SQL once in your Supabase SQL Editor:</strong>
            </p>
            <div className="flex gap-2 mb-4">
              <Button onClick={() => loadSqlToEditor(execSqlFunction, 'exec')} variant="outline" className="gap-2">
                <Copy className="w-4 h-4" />{copied === 'exec' ? 'Copied!' : 'Copy to Editor'}
              </Button>
              <a href={`https://supabase.com/dashboard/project/${(process.env.NEXT_PUBLIC_SUPABASE_URL || '').match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] || '_'}/sql/new`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2"><ExternalLink className="w-4 h-4" />Open Supabase SQL Editor</Button>
              </a>
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-60 text-xs font-mono">
              <pre>{execSqlFunction}</pre>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">
                After running this SQL in Supabase, refresh this page. Then you can execute all SQL directly from this admin panel!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SQL Editor */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              SQL Editor
              {execFunctionExists ? (
                <Badge className="bg-green-100 text-green-700">Ready</Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-700">Setup Required</Badge>
              )}
            </CardTitle>
            <Button 
              onClick={executeSql} 
              disabled={executing || !sqlInput.trim()}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              {executing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              Execute SQL
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            placeholder="Enter SQL query here...&#10;&#10;Examples:&#10;SELECT * FROM tour_packages LIMIT 5;&#10;ALTER TABLE blogs ADD COLUMN image_alt TEXT;&#10;&#10;Multiple statements separated by semicolon are supported."
            className="font-mono text-sm min-h-[200px] mb-4"
          />
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-muted-foreground mr-2">Quick Load:</span>
            {allTablesExist && needsExtendedFields && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => loadSqlToEditor(alterSql, 'alter-quick')}
                className="text-amber-700 border-amber-300 hover:bg-amber-50"
              >
                Add Extended Columns
              </Button>
            )}
            {!allTablesExist && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => loadSqlToEditor(sql, 'create-quick')}
                className="text-blue-700 border-blue-300 hover:bg-blue-50"
              >
                Create Tables
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSqlInput('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';')}
            >
              List Tables
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSqlInput('SELECT column_name, data_type FROM information_schema.columns WHERE table_name = \'blogs\';')}
            >
              Blog Columns
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSqlInput('SELECT column_name, data_type FROM information_schema.columns WHERE table_name = \'tour_packages\';')}
            >
              Tour Columns
            </Button>
          </div>

          {/* Execution Result */}
          {execResult && (
            <div className={`p-4 rounded-lg ${execResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              {execResult.success ? (
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-700">SQL executed successfully!</p>
                    {execResult.results && (
                      <p className="text-sm text-green-600 mt-1">
                        {execResult.results.filter(r => r.success).length}/{execResult.totalStatements} statements executed
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-700">Execution failed</p>
                    <p className="text-sm text-red-600 mt-1 font-mono">{execResult.error}</p>
                    {execResult.results && (
                      <div className="mt-2 space-y-1">
                        {execResult.results.filter(r => !r.success).map((r, i) => (
                          <p key={i} className="text-xs text-red-500">
                            Statement {r.index + 1}: {r.error}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Table Status */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Database className="w-5 h-5" /> Table Status</CardTitle>
            <Button variant="outline" size="sm" onClick={checkTables} disabled={checking} data-testid="refresh-tables-btn">
              {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(tables).map(([name, exists]) => (
              <div key={name} className={`p-3 rounded-lg border ${exists ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`} data-testid={`table-status-${name}`}>
                <div className="flex items-center gap-2">
                  {exists ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-500" />}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <Badge className={`mt-1 ${exists ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{exists ? 'Exists' : 'Missing'}</Badge>
              </div>
            ))}
          </div>
          {allTablesExist && (
            <div className="mt-4 space-y-2">
              <p className="text-green-700 font-medium flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />All tables are set up correctly!
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={status.hasExtendedFields ? 'default' : 'secondary'} className={status.hasExtendedFields ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                  {status.hasExtendedFields ? '✓' : '!'} Tour Extended Fields
                </Badge>
                <Badge variant={status.hasBlogExtendedFields ? 'default' : 'secondary'} className={status.hasBlogExtendedFields ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                  {status.hasBlogExtendedFields ? '✓' : '!'} Blog Extended Fields
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Tables - Only show if tables don't exist */}
      {!allTablesExist && (
        <Card className="mb-6">
          <CardHeader><CardTitle>Create Tables</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Load this SQL into the editor above and execute it:</p>
            <div className="flex gap-2 mb-4">
              <Button onClick={() => loadSqlToEditor(sql, 'create')} variant="outline" className="gap-2 bg-blue-50" data-testid="copy-create-sql-btn">
                <Copy className="w-4 h-4" />{copied === 'create' ? 'Loaded!' : 'Load Create Tables SQL'}
              </Button>
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-60 text-xs font-mono"><pre>{sql}</pre></div>
          </CardContent>
        </Card>
      )}

      {/* Alter Table for new columns */}
      {needsExtendedFields && alterSql && (
        <Card className="mb-6 border-amber-200 bg-amber-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-600" /> Add Extended Columns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-amber-100 rounded-lg">
              <p className="text-sm font-medium text-amber-800">Missing Extended Fields:</p>
              <ul className="text-sm text-amber-700 mt-1 list-disc list-inside">
                {!status.hasExtendedFields && <li>Tour packages: price_table, hotels, tour_map_url, seo_content, faqs</li>}
                {!status.hasBlogExtendedFields && <li>Blogs: image_alt, title_alt, faqs</li>}
              </ul>
            </div>
            <div className="flex gap-2 mb-4">
              <Button onClick={() => loadSqlToEditor(alterSql, 'alter')} variant="outline" className="gap-2 bg-amber-50" data-testid="copy-alter-sql-btn">
                <Copy className="w-4 h-4" />{copied === 'alter' ? 'Loaded!' : 'Load Alter SQL'}
              </Button>
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-40 text-xs font-mono"><pre>{alterSql}</pre></div>
          </CardContent>
        </Card>
      )}

      {/* Seed Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Rocket className="w-5 h-5" /> Seed Sample Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Populate the database with sample tour packages, blog posts, and reviews.</p>
          <Button onClick={seedData} disabled={seeding || !allTablesExist} className="bg-amber-600 hover:bg-amber-700 text-white gap-2" data-testid="seed-database-btn">
            {seeding ? <><Loader2 className="w-4 h-4 animate-spin" />Seeding...</> : <><Rocket className="w-4 h-4" />Seed Database</>}
          </Button>
          {!allTablesExist && <p className="mt-2 text-sm text-muted-foreground">Please create tables first.</p>}
          {seedResult && (
            <div className={`mt-4 p-4 rounded-lg ${seedResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`} data-testid="seed-result">
              {seedResult.success ? (
                <div><p className="font-medium text-green-700">Database seeded successfully!</p><p className="text-sm text-green-600 mt-1">Packages: {seedResult.packages}, Blogs: {seedResult.blogs}, Reviews: {seedResult.reviews}{seedResult.destinations != null ? `, Destinations: ${seedResult.destinations}` : ''}</p></div>
              ) : (
                <div><p className="font-medium text-red-700">Seed failed</p><p className="text-sm text-red-600 mt-1">{seedResult.error || seedResult.message}</p></div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
