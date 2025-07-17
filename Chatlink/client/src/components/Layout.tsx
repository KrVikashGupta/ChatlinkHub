import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
