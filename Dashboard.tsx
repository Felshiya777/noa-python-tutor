import { useNavigate } from "react-router";
import { pythonLevels } from "../data/pythonCurriculum";
import { getProgress } from "../utils/storage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Code2, Lock, CheckCircle2, Trophy, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function Dashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getProgress());
  const [unlockedLevels, setUnlockedLevels] = useState<Set<string>>(new Set());

  useEffect(() => {
    const unlocked = new Set<string>();
    
    pythonLevels.forEach((level, index) => {
      if (index === 0) {
        unlocked.add(level.id);
      } else {
        const prevLevel = pythonLevels[index - 1];
        if (progress.completedLevels.includes(prevLevel.id)) {
          unlocked.add(level.id);
        }
      }
    });
    
    setUnlockedLevels(unlocked);
  }, [progress]);

  const getLevelProgress = (levelId: string): number => {
    const levelData = progress.levelProgress[levelId];
    if (!levelData) return 0;
    
    const level = pythonLevels.find(l => l.id === levelId);
    if (!level) return 0;
    
    const totalItems = level.exercises.length + level.quizzes.length;
    const completedItems = levelData.completedExercises.length + (levelData.quizScore > 0 ? 1 : 0);
    
    return Math.round((completedItems / totalItems) * 100);
  };

  const totalProgress = Math.round(
    (progress.completedLevels.length / pythonLevels.length) * 100
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Code2 className="w-12 h-12 text-purple-400" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Python AI Tutor
          </h1>
        </div>
        <p className="text-gray-300 text-lg mb-6">
          Master Python programming through interactive challenges and AI guidance
        </p>
        
        {/* Overall Progress */}
        <div className="max-w-md mx-auto bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Overall Progress</span>
            <span className="text-sm font-semibold text-purple-400">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Trophy className="w-4 h-4 text-yellow-500" />
            {progress.completedLevels.length} of {pythonLevels.length} levels completed
          </div>
        </div>
      </div>

      {/* Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pythonLevels.map((level) => {
          const isUnlocked = unlockedLevels.has(level.id);
          const isCompleted = progress.completedLevels.includes(level.id);
          const levelProgress = getLevelProgress(level.id);

          return (
            <Card
              key={level.id}
              className={`relative overflow-hidden transition-all duration-300 border-2 ${
                isCompleted
                  ? 'border-green-500/50 bg-slate-900/80'
                  : isUnlocked
                  ? 'border-purple-500/50 bg-slate-900/80 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20'
                  : 'border-slate-700/50 bg-slate-900/50 opacity-60'
              }`}
            >
              {/* Completed Badge */}
              {isCompleted && (
                <div className="absolute top-4 right-4 z-10">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              )}

              {/* New Badge for unlocked but not started */}
              {isUnlocked && !isCompleted && levelProgress === 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs border-purple-500/50">
                        Level {level.order}
                      </Badge>
                      {!isUnlocked && <Lock className="w-4 h-4 text-gray-500" />}
                    </div>
                    <CardTitle className="text-xl mb-2 text-white">{level.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {level.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {isUnlocked && levelProgress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs text-purple-400">{levelProgress}%</span>
                    </div>
                    <Progress value={levelProgress} className="h-1.5" />
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <span>{level.exercises.length} exercises</span>
                  <span>•</span>
                  <span>{level.quizzes.length} quizzes</span>
                </div>

                <Button
                  onClick={() => isUnlocked && navigate(`/level/${level.id}`)}
                  disabled={!isUnlocked}
                  className={`w-full ${
                    isUnlocked
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-slate-700 cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? 'Review' : isUnlocked ? 'Start Learning' : 'Locked'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="mt-12 max-w-2xl mx-auto">
        <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2">
            <p>✨ Complete each level to unlock the next one</p>
            <p>💡 Use the AI helper when you're stuck on exercises</p>
            <p>📝 Take notes to remember important concepts</p>
            <p>🎯 Try to complete all exercises and quizzes for the full experience</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
