import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-400 mb-4">404</h1>
        <p className="text-2xl text-white mb-2">Page Not Found</p>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/")} className="bg-purple-600 hover:bg-purple-700">
          <Home className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
