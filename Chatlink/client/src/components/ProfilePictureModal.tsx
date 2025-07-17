import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Camera, LoaderCircle } from "lucide-react";
import ImageCropper from "./ImageCropper";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { showCustomToast } from "./CustomToast";
import { profilePictureUpdate } from "@/features/auth/authThunk";

export function ProfilePictureModal() {
  const [image, setImage] = useState<File | null>(null);
  const [isOpen, setisOpen] = useState(false);
  const { profilePictureUpdateLoading, profilePictureUpdateError } =
    useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleSavebutton = async () => {
    try {
      const resultAction = await dispatch(profilePictureUpdate(image!));

      if (profilePictureUpdate.fulfilled.match(resultAction)) {
        showCustomToast({
          content: "Profile picture updated",
          variant: "success",
        });
        // todo: close the modal
        setisOpen(false);
      } else if (profilePictureUpdate.rejected.match(resultAction)) {
        throw new Error(
          profilePictureUpdateError || "Profile picture not updated",
        );
      }
    } catch (error: any) {
      showCustomToast({
        content: profilePictureUpdateError || "Profile picture not updated",
        variant: "error",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setisOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-0 right-0 rounded-full"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Edit profile picture</DialogTitle>
        <DialogDescription className="DialogDescription">
          Update your profile picture, Click save when you're done.
        </DialogDescription>
        <ImageCropper setImage={setImage} />
        <DialogFooter>
          <Button
            type="submit"
            disabled={profilePictureUpdateLoading}
            onClick={handleSavebutton}
          >
            {profilePictureUpdateLoading && (
              <LoaderCircle
                size={16}
                strokeWidth={4}
                className="animate-spin mr-2"
              />
            )}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
