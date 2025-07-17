import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MessageSquare, Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout>
      {" "}
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
            <MessageSquare className="w-24 h-24 text-primary relative z-10 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Chat Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            Oops! It seems this chat has vanished into the digital ether. Don't
            worry, there are plenty of other conversations waiting for you!
          </p>
          <div className="flex flex-col space-y-4">
            <Link to="/">
              <Button variant="default" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </Link>

            <Link to="/">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
