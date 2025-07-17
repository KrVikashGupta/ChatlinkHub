import { toast } from "sonner";
import { CheckCircle, AlertCircle, XCircle, InfoIcon } from "lucide-react";

type showCustomToast = {
  content: string;
  variant: string;
};

export const showCustomToast = ({ content, variant }: showCustomToast) => {
  let prop = {
    color: "",
    icon: <></>,
  };

  const variantProps = (variant: string) => {
    if (variant === "success") {
      prop.color = "text-green-500";
      prop.icon = <CheckCircle size={20} />;
    } else if (variant === "warning") {
      prop.color = "text-yellow-500";
      prop.icon = <AlertCircle size={20} />;
    } else if (variant === "error") {
      prop.color = "text-red-500";
      prop.icon = <XCircle size={20} />;
    } else {
      prop.color = "text-blue-500";
      prop.icon = <InfoIcon size={20} />;
    }
  };

  variantProps(variant);

  toast.custom(() => (
    <div className="bg-background p-3 rounded-lg shadow-lg">
      <div className={`font-semibold ${prop.color} flex gap-2 items-center`}>
        {prop.icon}
        {content}
      </div>
    </div>
  ));
};
