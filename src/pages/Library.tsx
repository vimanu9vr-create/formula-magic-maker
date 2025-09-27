import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Heart, Search, Plus, Copy, Edit, Trash2, Filter, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SavedFormula {
  id: string;
  title: string;
  description: string | null;
  input_text: string;
  formula_output: string;
  type: string;
  tags: string[];
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

const Library = () => {
  const [savedFormulas, setSavedFormulas] = useState<SavedFormula[]>([]);
  const [filteredFormulas, setFilteredFormulas] = useState<SavedFormula[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newFormula, setNewFormula] = useState({
    title: "",
    description: "",
    input_text: "",
    formula_output: "",
    type: "english-to-formula",
    tags: "",
    is_favorite: false
  });

  const { user } = useAuth();
  const { toast } = useToast();

  const types = [
    { key: "all", label: "All Types" },
    { key: "english-to-formula", label: "Excel Formulas" },
    { key: "sql-generator", label: "SQL Queries" },
    { key: "regex-generator", label: "Regex Patterns" },
    { key: "python-generator", label: "Python Code" },
    { key: "javascript-generator", label: "JavaScript Code" }
  ];

  useEffect(() => {
    if (user) {
      fetchSavedFormulas();
    }
  }, [user]);

  useEffect(() => {
    filterFormulas();
  }, [savedFormulas, searchQuery, filterType]);

  const fetchSavedFormulas = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_formulas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching saved formulas:', error);
        return;
      }

      setSavedFormulas(data || []);
    } catch (error) {
      console.error('Error fetching saved formulas:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFormulas = () => {
    let filtered = savedFormulas;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(formula =>
        formula.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(formula => formula.type === filterType);
    }

    setFilteredFormulas(filtered);
  };

  const handleAddFormula = async () => {
    if (!user || !newFormula.title || !newFormula.input_text || !newFormula.formula_output) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('saved_formulas')
        .insert({
          user_id: user.id,
          title: newFormula.title,
          description: newFormula.description || null,
          input_text: newFormula.input_text,
          formula_output: newFormula.formula_output,
          type: newFormula.type,
          tags: newFormula.tags ? newFormula.tags.split(',').map(tag => tag.trim()) : [],
          is_favorite: newFormula.is_favorite
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Formula saved to library"
      });

      setShowAddDialog(false);
      setNewFormula({
        title: "",
        description: "",
        input_text: "",
        formula_output: "",
        type: "english-to-formula",
        tags: "",
        is_favorite: false
      });
      fetchSavedFormulas();
    } catch (error: any) {
      console.error('Error saving formula:', error);
      toast({
        title: "Error",
        description: "Failed to save formula",
        variant: "destructive"
      });
    }
  };

  const toggleFavorite = async (id: string, currentFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('saved_formulas')
        .update({ is_favorite: !currentFavorite })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setSavedFormulas(prev =>
        prev.map(formula =>
          formula.id === id ? { ...formula, is_favorite: !currentFavorite } : formula
        )
      );

      toast({
        title: !currentFavorite ? "Added to favorites" : "Removed from favorites",
        description: `Formula ${!currentFavorite ? "added to" : "removed from"} your favorites`
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Formula copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const deleteFormula = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_formulas')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setSavedFormulas(prev => prev.filter(formula => formula.id !== id));
      toast({
        title: "Deleted",
        description: "Formula removed from library"
      });
    } catch (error) {
      console.error('Error deleting formula:', error);
      toast({
        title: "Error",
        description: "Failed to delete formula",
        variant: "destructive"
      });
    }
  };

  const getTypeLabel = (type: string) => {
    const typeObj = types.find(t => t.key === type);
    return typeObj?.label || type;
  };

  if (loading) {
    return (
      <div className="h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your library...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pt-16 px-4 sm:px-6 lg:px-8 py-6">
          <div className="container max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
                  <BookOpen className="w-8 h-8 mr-3" />
                  Formula Library
                </h1>
                <p className="text-muted-foreground">Save and organize your favorite formulas and code snippets</p>
              </div>
              
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <Plus className="w-4 h-4" />
                    <span>Add Formula</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Formula</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={newFormula.title}
                        onChange={(e) => setNewFormula({...newFormula, title: e.target.value})}
                        placeholder="Enter formula title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newFormula.description}
                        onChange={(e) => setNewFormula({...newFormula, description: e.target.value})}
                        placeholder="Optional description"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="input_text">Input Text *</Label>
                      <Textarea
                        id="input_text"
                        value={newFormula.input_text}
                        onChange={(e) => setNewFormula({...newFormula, input_text: e.target.value})}
                        placeholder="The original request or input"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="formula_output">Formula/Code Output *</Label>
                      <Textarea
                        id="formula_output"
                        value={newFormula.formula_output}
                        onChange={(e) => setNewFormula({...newFormula, formula_output: e.target.value})}
                        placeholder="The generated formula or code"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={newFormula.tags}
                        onChange={(e) => setNewFormula({...newFormula, tags: e.target.value})}
                        placeholder="excel, data, analysis"
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddFormula}>
                        Save Formula
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search formulas, descriptions, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  {types.map(type => (
                    <option key={type.key} value={type.key}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Formula Grid */}
            {filteredFormulas.length === 0 ? (
              <div className="flex justify-center">
                <Card className="p-8 text-center max-w-md">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No formulas found</h3>
                  <p className="text-muted-foreground mb-4">
                    {savedFormulas.length === 0 
                      ? "Start building your formula library by adding your first formula."
                      : "Try adjusting your search or filter criteria."
                    }
                  </p>
                  <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Formula
                  </Button>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormulas.map((formula) => (
                  <Card key={formula.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{formula.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {getTypeLabel(formula.type)}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(formula.id, formula.is_favorite)}
                        className="p-1 h-auto"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            formula.is_favorite 
                              ? "fill-red-500 text-red-500" 
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>

                    {formula.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {formula.description}
                      </p>
                    )}

                    <div className="space-y-2 mb-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Input:</p>
                        <p className="text-sm bg-muted p-2 rounded text-foreground line-clamp-2">
                          {formula.input_text}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Output:</p>
                        <pre className="text-xs bg-muted p-2 rounded font-mono text-foreground line-clamp-3 whitespace-pre-wrap">
                          {formula.formula_output}
                        </pre>
                      </div>
                    </div>

                    {formula.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {formula.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-xs text-muted-foreground">
                        {new Date(formula.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(formula.formula_output)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteFormula(formula.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;