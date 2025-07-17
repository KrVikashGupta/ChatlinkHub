import Layout from "@/components/Layout";
import SignInForm from "@/components/SignInForm";
import { Zap, Shield, Smartphone } from "lucide-react";

export default function SigninPage() {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-6xl w-full bg-secondary bg-opacity-50 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side content */}
            <div className="flex-1 p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Welcome to ChatLink
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Experience seamless communication with our lightning-fast,
                secure, and feature-rich chat application.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-blue-400" />
                  <span>Lightning-fast messaging</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <span>Stay connected with confidence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-6 w-6 text-blue-400" />
                  <span>Access ChatLink anytime, anywhere</span>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <SignInForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
