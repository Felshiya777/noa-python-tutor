import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { pythonLevels } from "../data/pythonCurriculum";
import { getProgress, completeExercise, saveQuizScore, completeLevel } from "../utils/storage";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CodeEditor } from "../components/CodeEditor";
import { AIHelper } from "../components/AIHelper";
import { QuizSection } from "../components/QuizSection";
import { NotesSection } from "../components/NotesSection";
import { ArrowLeft, BookOpen, Code, Brain, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';
import confetti from "canvas-confetti";

export function LevelPage() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("learn");
  const [currentExercise, setCurrentExercise] = useState(0);
  const [output, setOutput] = useState("");
  const [exerciseStatus, setExerciseStatus] = useState<"idle" | "success" | "error">("idle");

  const level = pythonLevels.find((l) => l.id === levelId);
  const progress = getProgress();

  useEffect(() => {
    if (!level) {
      navigate("/");
    }
  }, [level, navigate]);

  if (!level) return null;

  const currentExerciseData = level.exercises[currentExercise];
  const completedExercises = progress.levelProgress[level.id]?.completedExercises || [];
  const isExerciseCompleted = completedExercises.includes(currentExerciseData?.id);

  const handleRunCode = (code: string) => {
    // Simple mock Python execution (in a real app, you'd use a backend API)
    setOutput("Running code...\n");
    
    setTimeout(() => {
      try {
        // This is a mock - in reality, you'd send this to a backend Python interpreter
        const lines = code.split('\n');
        let result = '';
        
        // Very basic simulation of Python execution
        for (const line of lines) {
          if (line.trim().startsWith('print(')) {
            const match = line.match(/print\((.*)\)/);
            if (match) {
              let toPrint = match[1].trim();
              // Remove quotes if string literal
              if ((toPrint.startsWith('"') && toPrint.endsWith('"')) || 
                  (toPrint.startsWith("'") && toPrint.endsWith("'"))) {
                toPrint = toPrint.slice(1, -1);
              }
              // Basic variable evaluation (very limited)
              else if (toPrint.includes('+')) {
                try {
                  const evalResult = eval(toPrint.replace(/\s+/g, ''));
                  toPrint = String(evalResult);
                } catch {
                  // Keep as is if eval fails
                }
              }
              result += toPrint + '\n';
            }
          }
        }
        
        setOutput(result || "Code executed successfully (no output)");
        
        // Check if output matches expected for current exercise
        if (currentExerciseData && currentExerciseData.testCases.length > 0) {
          const expected = currentExerciseData.testCases[0].expected;
          if (result.trim() === expected.trim()) {
            setExerciseStatus("success");
            if (!isExerciseCompleted) {
              completeExercise(level.id, currentExerciseData.id);
              toast.success("Exercise completed! 🎉");
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
              });
            }
          } else {
            setExerciseStatus("error");
            toast.error("Output doesn't match expected result. Keep trying!");
          }
        }
      } catch (error) {
        setOutput("Error: " + (error as Error).message);
        setExerciseStatus("error");
      }
    }, 500);
  };

  const handleQuizComplete = (score: number) => {
    saveQuizScore(level.id, score);
    toast.success(`Quiz completed with ${score}% score!`);
    
    // Check if level is fully completed
    const allExercisesCompleted = level.exercises.every(ex => 
      (progress.levelProgress[level.id]?.completedExercises || []).includes(ex.id)
    );
    
    if (allExercisesCompleted && score >= 70) {
      completeLevel(level.id);
      toast.success("🎉 Level completed! Next level unlocked!");
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{level.title}</h1>
              <p className="text-gray-400 text-sm">{level.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-900/80 border border-purple-500/30">
            <TabsTrigger value="learn" className="data-[state=active]:bg-purple-600">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="practice" className="data-[state=active]:bg-purple-600">
              <Code className="w-4 h-4 mr-2" />
              Practice ({completedExercises.length}/{level.exercises.length})
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-purple-600">
              <Brain className="w-4 h-4 mr-2" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-purple-600">
              <FileText className="w-4 h-4 mr-2" />
              Notes
            </TabsTrigger>
          </TabsList>

          {/* Learn Tab */}
          <TabsContent value="learn" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-slate-900/80 border-purple-500/30">
                  <CardContent className="p-6">
                    <div className="prose prose-invert prose-purple max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-white mb-4" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-4 mb-2" {...props} />,
                          p: ({node, ...props}) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
                          code: ({node, className, children, ...props}) => {
                            const isInline = !className;
                            return isInline ? (
                              <code className="bg-slate-800 text-purple-400 px-1.5 py-0.5 rounded text-sm" {...props}>
                                {children}
                              </code>
                            ) : (
                              <code className="block bg-slate-800 text-gray-200 p-4 rounded-lg overflow-x-auto text-sm" {...props}>
                                {children}
                              </code>
                            );
                          },
                          ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4" {...props} />,
                          li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                        }}
                      >
                        {level.content}
                      </ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <AIHelper />
              </div>
            </div>
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Exercise Selection */}
                <div className="flex gap-2 flex-wrap">
                  {level.exercises.map((ex, index) => {
                    const isCompleted = completedExercises.includes(ex.id);
                    return (
                      <Button
                        key={ex.id}
                        variant={currentExercise === index ? "default" : "outline"}
                        onClick={() => {
                          setCurrentExercise(index);
                          setOutput("");
                          setExerciseStatus("idle");
                        }}
                        className={`${
                          isCompleted
                            ? "border-green-500/50 bg-green-500/10"
                            : currentExercise === index
                            ? "bg-purple-600"
                            : ""
                        }`}
                      >
                        Exercise {index + 1}
                        {isCompleted && <CheckCircle2 className="w-4 h-4 ml-2" />}
                      </Button>
                    );
                  })}
                </div>

                {/* Exercise Content */}
                {currentExerciseData && (
                  <>
                    <Card className="bg-slate-900/80 border-purple-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">
                              {currentExerciseData.title}
                            </h3>
                            <p className="text-gray-300">{currentExerciseData.description}</p>
                          </div>
                          {isExerciseCompleted && (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <CodeEditor
                      initialCode={currentExerciseData.starterCode}
                      onRun={handleRunCode}
                      onReset={() => {
                        setOutput("");
                        setExerciseStatus("idle");
                      }}
                    />

                    {/* Output */}
                    <Card className={`bg-slate-900/80 ${
                      exerciseStatus === "success"
                        ? "border-green-500/50"
                        : exerciseStatus === "error"
                        ? "border-red-500/50"
                        : "border-purple-500/30"
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-white">Output:</h4>
                          {exerciseStatus === "success" && (
                            <span className="text-green-400 text-sm flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              Correct!
                            </span>
                          )}
                          {exerciseStatus === "error" && (
                            <span className="text-red-400 text-sm flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              Try again
                            </span>
                          )}
                        </div>
                        <pre className="bg-slate-950 p-4 rounded text-gray-300 text-sm overflow-x-auto">
                          {output || "Run your code to see the output here..."}
                        </pre>
                        {currentExerciseData.testCases.length > 0 && (
                          <div className="mt-3 text-sm text-gray-400">
                            <strong>Expected output:</strong>
                            <pre className="bg-slate-950 p-2 rounded mt-1 text-gray-400">
                              {currentExerciseData.testCases[0].expected}
                            </pre>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>

              <div className="lg:col-span-1">
                <AIHelper />
              </div>
            </div>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <QuizSection quizzes={level.quizzes} onComplete={handleQuizComplete} />
              </div>
              <div className="lg:col-span-1">
                <AIHelper />
              </div>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NotesSection levelId={level.id} />
              </div>
              <div className="lg:col-span-1">
                <AIHelper />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
