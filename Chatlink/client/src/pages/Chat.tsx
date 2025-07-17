import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Layout from "@/components/Layout";
import ChatSection from "@/components/ChatSection";
import NoChatSelected from "@/components/NoChatSelected";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  disconnectSocket,
  initializeSocket,
} from "@/features/socket/socketSlice";

export default function Chat() {
  const dispatch = useAppDispatch();
  const { chatSelected } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userId = user?.id!; // ! asserts that user.id can't be undefiend
    dispatch(initializeSocket(import.meta.env.VITE_BASE_URL, userId));
    return () => {
      dispatch(disconnectSocket()); // clean up socket on unmount
    };
  }, [dispatch]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <Layout>
      <div className="max-w-screen-2xl w-screen mx-auto overflow-hidden">
        <div className="flex h-screen bg-background">
          {/* Sidebar for larger screens */}
          {!isMobile && (
            <div className="min-w-[350px] bg-card border-r border-border">
              <Sidebar setSidebarOpen={setSidebarOpen} />
            </div>
          )}

          {/* Sidebar for mobile screens */}
          <AnimatePresence>
            {isMobile && sidebarOpen && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border"
              >
                <Sidebar setSidebarOpen={setSidebarOpen} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Chat Area */}
          {chatSelected ? (
            <ChatSection isMobile={isMobile} setSidebarOpen={setSidebarOpen} />
          ) : (
            <NoChatSelected
              isMobile={isMobile}
              setSidebarOpen={setSidebarOpen}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
