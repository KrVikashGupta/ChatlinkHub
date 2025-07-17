import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAppSelector } from "@/app/hooks";
import { UpdatePasswordForm } from "@/components/UserProfile/UpdatePasswordForm";
import { UpdateUserDetailsForm } from "@/components/UserProfile/UpdateUserDetailsForm";
import { ProfilePictureModal } from "@/components/ProfilePictureModal";

export default function UserProfile() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto p-4">
        <Card className="w-full overflow-hidden bg-background">
          <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10"></div>
          <CardHeader className="relative pb-0">
            <div className="absolute -top-16 left-4 border-4 border-background dark:border-background rounded-full">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user?.profile_picture} alt="avatar" />
                <AvatarFallback>
                  <CircleUserRound size={35} className="text-accent" />
                </AvatarFallback>
              </Avatar>
              <ProfilePictureModal />
            </div>
            <div className="ml-36 pt-4">
              <CardTitle className="text-2xl">{user?.username}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="mt-4">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>
              <div className="space-y-6">
                <TabsContent value="profile" className="space-y-6">
                  <UpdateUserDetailsForm />
                </TabsContent>
                <TabsContent value="account" className="space-y-6">
                  <UpdatePasswordForm />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>

          {/* back button */}
          <div className="px-6 py-4 bg-muted/10 flex justify-between items-center">
            <Link to="/chat">
              <Button className="group border-2 border-primary" variant="ghost">
                <ArrowLeft
                  className="-ms-1 me-2 opacity-60 transition-transform group-hover:-translate-x-0.5 "
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Back to chat
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
