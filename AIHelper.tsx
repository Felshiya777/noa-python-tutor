import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Sparkles, Send } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  role: "user" | "ai";
  content: string;
}

export function AIHelper() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hi! I'm your Python AI tutor. Ask me anything about Python programming, and I'll help you understand the concepts better! 🐍"
    }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Simple pattern matching for common questions
    if (lowerQuestion.includes("print") || lowerQuestion.includes("output")) {
      return "The print() function in Python displays output to the console. You can print strings, numbers, and variables:\n\nprint(\"Hello\")\nprint(42)\nname = \"Alice\"\nprint(name)\n\nYou can also print multiple items: print(\"Name:\", name)";
    }
    
    if (lowerQuestion.includes("variable")) {
      return "Variables in Python store data. You don't need to declare types:\n\nage = 25  # Integer\nname = \"John\"  # String\nprice = 19.99  # Float\nis_active = True  # Boolean\n\nVariable names should be descriptive and use snake_case.";
    }
    
    if (lowerQuestion.includes("loop") || lowerQuestion.includes("for") || lowerQuestion.includes("while")) {
      return "Python has two main types of loops:\n\n1. FOR loop (iterate over sequences):\nfor i in range(5):\n    print(i)\n\n2. WHILE loop (repeat while condition is true):\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\nUse 'break' to exit early and 'continue' to skip iterations.";
    }
    
    if (lowerQuestion.includes("function") || lowerQuestion.includes("def")) {
      return "Functions are reusable code blocks:\n\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nresult = greet(\"Alice\")\nprint(result)\n\nKey points:\n- Use 'def' keyword\n- Parameters go in parentheses\n- Use 'return' to send values back\n- Indentation is important!";
    }
    
    if (lowerQuestion.includes("list") || lowerQuestion.includes("array")) {
      return "Lists are ordered, mutable collections:\n\nfruits = [\"apple\", \"banana\", \"cherry\"]\n\n# Access: fruits[0]\n# Add: fruits.append(\"orange\")\n# Remove: fruits.remove(\"banana\")\n# Length: len(fruits)\n# Sort: fruits.sort()\n# Reverse: fruits.reverse()";
    }
    
    if (lowerQuestion.includes("if") || lowerQuestion.includes("condition")) {
      return "Conditional statements control program flow:\n\nif age >= 18:\n    print(\"Adult\")\nelif age >= 13:\n    print(\"Teen\")\nelse:\n    print(\"Child\")\n\nComparison operators:\n==  equal to\n!=  not equal\n>   greater than\n<   less than\n>=  greater or equal\n<=  less or equal";
    }
    
    if (lowerQuestion.includes("class") || lowerQuestion.includes("object")) {
      return "Classes define object blueprints:\n\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    \n    def bark(self):\n        return f\"{self.name} says Woof!\"\n\nmy_dog = Dog(\"Buddy\")\nprint(my_dog.bark())\n\n'self' refers to the instance of the class.";
    }
    
    if (lowerQuestion.includes("error") || lowerQuestion.includes("bug") || lowerQuestion.includes("not work")) {
      return "Here are common Python errors and fixes:\n\n1. IndentationError: Check your spacing (use 4 spaces)\n2. NameError: Variable not defined - check spelling\n3. SyntaxError: Missing colon, parenthesis, or quotes\n4. TypeError: Wrong data type used\n\nTip: Read error messages carefully - they tell you what's wrong!";
    }
    
    if (lowerQuestion.includes("help") || lowerQuestion.includes("stuck")) {
      return "I'm here to help! Try these approaches:\n\n1. Break the problem into smaller steps\n2. Print variables to see their values\n3. Check the examples in the learning content\n4. Make sure your indentation is correct\n5. Test your code with simple inputs first\n\nWhat specific part are you struggling with?";
    }
    
    // Default response
    return "That's a great question! Here are some tips:\n\n1. Review the learning content on the left side\n2. Start with simple examples and build up\n3. Use print() to debug and see what's happening\n4. Python is all about practice - keep coding!\n\nCould you be more specific about what you're trying to learn or solve?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const aiMessage: Message = { role: "ai", content: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <Card className="bg-slate-900/80 border-purple-500/30 h-full flex flex-col">
      <CardHeader className="border-b border-purple-500/20">
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          AI Helper
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 gap-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-slate-800 text-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask me anything about Python..."
            className="bg-slate-800 border-purple-500/30 text-white resize-none"
            rows={2}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="bg-purple-600 hover:bg-purple-700 self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
