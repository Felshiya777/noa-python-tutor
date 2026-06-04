import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FileText, Save } from "lucide-react";
import { saveNotes, getNotes } from "../utils/storage";
import { toast } from "sonner";

interface NotesSectionProps {
  levelId: string;
}

export function NotesSection({ levelId }: NotesSectionProps) {
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setNotes(getNotes(levelId));
  }, [levelId]);

  const handleSave = () => {
    setIsSaving(true);
    saveNotes(levelId, notes);
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Notes saved successfully!");
    }, 500);
  };

  return (
    <Card className="bg-slate-900/80 border-purple-500/30 h-full flex flex-col">
      <CardHeader className="border-b border-purple-500/20">
        <CardTitle className="flex items-center gap-2 text-white">
          <FileText className="w-5 h-5 text-blue-400" />
          My Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 gap-4">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Take notes here... (Markdown supported)"
          className="flex-1 bg-slate-800 border-purple-500/30 text-white resize-none font-mono text-sm"
        />
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 self-end"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Notes"}
        </Button>
      </CardContent>
    </Card>
  );
}
