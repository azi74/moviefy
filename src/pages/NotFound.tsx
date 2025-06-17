import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: Page not found");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-moviefy-black text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! Page not found</p>
      <Button 
        onClick={() => navigate('/')}
        className="bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light"
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;