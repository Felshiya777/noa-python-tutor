import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Play, RotateCcw } from "lucide-react";
import { useState } from "react";

interface CodeEditorProps {
  initialCode: string;
  onRun: (code: string) => void;
  onReset: () => void;
}

export function CodeEditor({ initialCode, onRun, onReset }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  return (
    <div className="border border-purple-500/30 rounded-lg overflow-hidden bg-slate-900">
      <div className="bg-slate-800/50 px-4 py-2 flex items-center justify-between border-b border-purple-500/20">
        <span className="text-sm text-gray-300">Python Editor</span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setCode(initialCode);
              onReset();
            }}
            className="border-gray-600 hover:border-gray-500"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={() => onRun(code)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-1" />
            Run Code
          </Button>
        </div>
      </div>
      <Editor
        height="300px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
