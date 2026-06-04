import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Quiz } from "../data/pythonCurriculum";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface QuizSectionProps {
  quizzes: Quiz[];
  onComplete: (score: number) => void;
}

export function QuizSection({ quizzes, onComplete }: QuizSectionProps) {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizzes[currentQuiz].correctAnswer;
    setShowResult(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const finalScore = Math.round(((score + (selectedAnswer === quizzes[currentQuiz].correctAnswer ? 1 : 0)) / quizzes.length) * 100);
      setCompleted(true);
      onComplete(finalScore);
      
      if (finalScore >= 70) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const finalScore = Math.round((score / quizzes.length) * 100);
    return (
      <Card className="bg-slate-900/80 border-purple-500/30">
        <CardContent className="p-8 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
          <p className="text-4xl font-bold text-purple-400 mb-4">{finalScore}%</p>
          <p className="text-gray-300 mb-6">
            You got {score} out of {quizzes.length} questions correct!
          </p>
          {finalScore >= 70 ? (
            <p className="text-green-400 mb-6">Great job! You've mastered this topic! 🎉</p>
          ) : (
            <p className="text-yellow-400 mb-6">Keep practicing! Review the content and try again.</p>
          )}
          <Button onClick={handleRetry} className="bg-purple-600 hover:bg-purple-700">
            Retry Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const quiz = quizzes[currentQuiz];
  const isCorrect = showResult && selectedAnswer === quiz.correctAnswer;
  const isWrong = showResult && selectedAnswer !== quiz.correctAnswer;

  return (
    <Card className="bg-slate-900/80 border-purple-500/30">
      <CardHeader className="border-b border-purple-500/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Quiz</CardTitle>
          <span className="text-sm text-gray-400">
            Question {currentQuiz + 1} of {quizzes.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-lg text-white mb-6">{quiz.question}</p>

        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => !showResult && setSelectedAnswer(parseInt(value))}
          className="space-y-3"
        >
          {quiz.options.map((option, index) => {
            const isThisCorrect = showResult && index === quiz.correctAnswer;
            const isThisWrong = showResult && index === selectedAnswer && index !== quiz.correctAnswer;

            return (
              <div
                key={index}
                className={`flex items-center space-x-2 p-4 rounded-lg border transition-colors ${
                  isThisCorrect
                    ? "border-green-500 bg-green-500/10"
                    : isThisWrong
                    ? "border-red-500 bg-red-500/10"
                    : "border-purple-500/30 hover:border-purple-500/50 bg-slate-800/50"
                }`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={showResult}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer text-gray-200"
                >
                  {option}
                </Label>
                {isThisCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {isThisWrong && <XCircle className="w-5 h-5 text-red-500" />}
              </div>
            );
          })}
        </RadioGroup>

        {showResult && (
          <div className={`mt-4 p-4 rounded-lg ${isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
            <p className={`font-semibold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
              {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            {isWrong && (
              <p className="text-gray-300 text-sm mt-2">
                The correct answer was: {quiz.options[quiz.correctAnswer]}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
              {currentQuiz < quizzes.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
