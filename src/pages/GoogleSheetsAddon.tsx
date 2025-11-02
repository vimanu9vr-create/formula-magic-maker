import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Copy, Key, Trash2, CheckCircle2, AlertCircle, ExternalLink, Download } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
  revoked_at: string | null;
}

export default function GoogleSheetsAddon() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('Google Sheets Add-on');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadApiKeys();
    }
  }, [user]);

  const loadApiKeys = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-api-key', {
        body: { action: 'list' },
      });

      if (error) throw error;
      setApiKeys(data.keys || []);
    } catch (error) {
      console.error('Error loading API keys:', error);
      toast({
        title: 'Error',
        description: 'Failed to load API keys',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateApiKey = async () => {
    if (!newKeyName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a name for the API key',
        variant: 'destructive',
      });
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-api-key', {
        body: { action: 'generate', keyName: newKeyName },
      });

      if (error) throw error;
      
      setGeneratedKey(data.apiKey);
      setApiKeys([data.key, ...apiKeys]);
      setNewKeyName('Google Sheets Add-on');
      
      toast({
        title: 'API Key Generated',
        description: 'Copy it now - you won\'t see it again!',
      });
    } catch (error) {
      console.error('Error generating API key:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate API key',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  const deleteApiKey = async (keyId: string) => {
    try {
      const { error } = await supabase.functions.invoke('manage-api-key', {
        body: { action: 'delete', keyId },
      });

      if (error) throw error;
      
      setApiKeys(apiKeys.filter(k => k.id !== keyId));
      toast({
        title: 'API Key Deleted',
        description: 'The API key has been permanently deleted',
      });
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete API key',
        variant: 'destructive',
      });
    } finally {
      setKeyToDelete(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'API key copied to clipboard',
    });
  };

  const googleAppsScript = `// FormulaGenie Google Sheets Add-on
// Copy this entire code and paste it into Google Apps Script

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your API key
const API_ENDPOINT = 'https://onlasynzdryijgktfvvh.supabase.co/functions/v1/sheets-addon-generate';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('FormulaGenie')
    .addItem('Generate Formula', 'showSidebar')
    .addItem('Explain Formula', 'explainFormula')
    .addItem('Settings', 'showSettings')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('FormulaGenie')
    .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

function generateFormula(input, type = 'formula') {
  try {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      payload: JSON.stringify({
        input: input,
        type: type
      }),
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(API_ENDPOINT, options);
    const result = JSON.parse(response.getContentText());
    
    if (response.getResponseCode() !== 200) {
      throw new Error(result.error || 'Failed to generate formula');
    }
    
    return result;
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    throw error;
  }
}

function explainFormula() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSheet();
  const cell = sheet.getActiveCell();
  const formula = cell.getFormula();
  
  if (!formula) {
    ui.alert('No formula found', 'Please select a cell with a formula.', ui.ButtonSet.OK);
    return;
  }
  
  try {
    const result = generateFormula(formula, 'explain');
    ui.alert('Formula Explanation', result.output, ui.ButtonSet.OK);
  } catch (error) {
    ui.alert('Error', error.toString(), ui.ButtonSet.OK);
  }
}

function showSettings() {
  const ui = SpreadsheetApp.getUi();
  ui.alert('Settings', 
    'To update your API key, edit the API_KEY constant at the top of the script.\\n\\n' +
    'Get your API key from: https://77e718a3-af1b-4ddc-aaa0-799b0000c512.lovableproject.com/google-sheets-addon',
    ui.ButtonSet.OK);
}

function insertFormula(formula) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cell = sheet.getActiveCell();
  cell.setFormula(formula);
}

function getUsageInfo() {
  // This would require another API endpoint to fetch usage stats
  return { used: 0, limit: 50, remaining: 50 };
}`;

  const sidebarHtml = `<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 15px;
        margin: 0;
      }
      .container {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      textarea {
        width: 100%;
        min-height: 100px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        resize: vertical;
        box-sizing: border-box;
      }
      .btn {
        background: #4285f4;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        width: 100%;
      }
      .btn:hover {
        background: #357ae8;
      }
      .btn:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      .result {
        padding: 10px;
        background: #f5f5f5;
        border-radius: 4px;
        font-family: monospace;
        font-size: 12px;
        word-break: break-all;
      }
      .error {
        padding: 10px;
        background: #fee;
        color: #c00;
        border-radius: 4px;
        font-size: 12px;
      }
      .success {
        padding: 10px;
        background: #efe;
        color: #060;
        border-radius: 4px;
        font-size: 12px;
      }
      .type-selector {
        display: flex;
        gap: 5px;
        margin-bottom: 10px;
      }
      .type-btn {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        background: white;
        cursor: pointer;
        border-radius: 4px;
        font-size: 12px;
      }
      .type-btn.active {
        background: #4285f4;
        color: white;
        border-color: #4285f4;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h3 style="margin: 0;">FormulaGenie</h3>
      
      <div class="type-selector">
        <button class="type-btn active" onclick="selectType('formula')">Formula</button>
        <button class="type-btn" onclick="selectType('sql')">SQL</button>
        <button class="type-btn" onclick="selectType('regex')">Regex</button>
      </div>
      
      <textarea id="input" placeholder="Describe what you want to create...
Example: Sum all values in column A"></textarea>
      
      <button class="btn" onclick="generate()">Generate</button>
      
      <div id="output"></div>
    </div>
    
    <script>
      let currentType = 'formula';
      
      function selectType(type) {
        currentType = type;
        document.querySelectorAll('.type-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        event.target.classList.add('active');
      }
      
      function generate() {
        const input = document.getElementById('input').value;
        if (!input.trim()) {
          showError('Please enter a description');
          return;
        }
        
        showLoading();
        
        google.script.run
          .withSuccessHandler(onSuccess)
          .withFailureHandler(onError)
          .generateFormula(input, currentType);
      }
      
      function showLoading() {
        document.getElementById('output').innerHTML = 
          '<div class="result">Generating...</div>';
      }
      
      function onSuccess(result) {
        const output = document.getElementById('output');
        output.innerHTML = 
          '<div class="success">Generated successfully!</div>' +
          '<div class="result">' + escapeHtml(result.output) + '</div>' +
          '<button class="btn" onclick="insertResult(\\''+escapeHtml(result.output)+'\\')">Insert into Cell</button>';
      }
      
      function onError(error) {
        showError(error.message || 'An error occurred');
      }
      
      function showError(message) {
        document.getElementById('output').innerHTML = 
          '<div class="error">' + escapeHtml(message) + '</div>';
      }
      
      function insertResult(formula) {
        google.script.run.insertFormula(formula);
        showSuccess('Formula inserted!');
      }
      
      function showSuccess(message) {
        const output = document.getElementById('output');
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = message;
        output.insertBefore(successDiv, output.firstChild);
        
        setTimeout(() => {
          successDiv.remove();
        }, 3000);
      }
      
      function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      }
    </script>
  </body>
</html>`;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-subtle">
        <Navigation />
        <div className="container flex-1 flex items-center justify-center">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please sign in to access the Google Sheets Add-on integration.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Helmet>
        <title>Google Sheets Add-on - FormulaGenie</title>
        <meta name="description" content="Integrate FormulaGenie with Google Sheets" />
      </Helmet>

      <Navigation />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Google Sheets Add-on</h1>
          <p className="text-muted-foreground">
            Generate formulas directly in Google Sheets with FormulaGenie
          </p>
        </div>

        {/* Step 1: Generate API Key */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Step 1: Generate API Key
            </CardTitle>
            <CardDescription>
              Create an API key to authenticate the add-on
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedKey && (
              <Alert className="mb-4 bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-900">
                  <strong>Save this API key now!</strong> You won't be able to see it again.
                  <div className="mt-2 p-3 bg-white rounded border font-mono text-sm break-all flex items-center justify-between">
                    <span>{generatedKey}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <Label htmlFor="keyName">API Key Name</Label>
                <Input
                  id="keyName"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Google Sheets Add-on"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={generateApiKey} disabled={generating}>
                  {generating ? 'Generating...' : 'Generate Key'}
                </Button>
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading API keys...</p>
            ) : apiKeys.length > 0 ? (
              <div className="space-y-2">
                <Label>Your API Keys</Label>
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-3 border rounded"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{key.name}</div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {key.key_prefix}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Created: {new Date(key.created_at).toLocaleDateString()}
                        {key.last_used_at && 
                          ` • Last used: ${new Date(key.last_used_at).toLocaleDateString()}`
                        }
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {key.is_active ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setKeyToDelete(key.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No API keys yet. Generate one above.</p>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Install Add-on */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Step 2: Install the Add-on
            </CardTitle>
            <CardDescription>
              Follow these steps to add FormulaGenie to Google Sheets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-3 text-sm">
              <li>
                Open{' '}
                <a
                  href="https://script.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Google Apps Script <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>Click "New Project"</li>
              <li>Copy the code below and paste it into the script editor</li>
              <li>Replace <code className="bg-muted px-1 rounded">YOUR_API_KEY_HERE</code> with your API key</li>
              <li>Click "File" → "New" → "HTML file" and name it "Sidebar"</li>
              <li>Copy the Sidebar HTML code and paste it there</li>
              <li>Click the save icon and give your project a name</li>
              <li>Open any Google Sheet and refresh - you'll see "FormulaGenie" in the menu!</li>
            </ol>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Main Script (Code.gs)</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(googleAppsScript)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
              </div>
              <Textarea
                readOnly
                value={googleAppsScript}
                className="font-mono text-xs h-64"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Sidebar HTML (Sidebar.html)</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(sidebarHtml)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy HTML
                </Button>
              </div>
              <Textarea
                readOnly
                value={sidebarHtml}
                className="font-mono text-xs h-64"
              />
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Start Using!</CardTitle>
            <CardDescription>
              How to use FormulaGenie in Google Sheets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>In Google Sheets, click "FormulaGenie" in the menu bar</li>
              <li>Select "Generate Formula" to open the sidebar</li>
              <li>Describe what you want in plain English</li>
              <li>Click "Generate" and the formula will appear</li>
              <li>Click "Insert into Cell" to add it to your spreadsheet</li>
              <li>You can also select a cell with a formula and use "Explain Formula" to understand it</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!keyToDelete} onOpenChange={() => setKeyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete API Key?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The add-on will stop working if it's using this key.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => keyToDelete && deleteApiKey(keyToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
