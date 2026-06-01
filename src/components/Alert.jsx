import { BsFillExclamationDiamondFill } from "react-icons/bs";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

export default function AlertError({ message }) {
  if (!message) return null;

  return (
    <Alert
      variant="destructive"
      className="
        mb-6
        border border-rose-200
        bg-rose-50
        rounded-lg
        px-4
        py-3
        flex
        items-start
        gap-3
      "
    >
      <BsFillExclamationDiamondFill className="text-rose-500 text-lg mt-0.5 shrink-0" />

      <AlertDescription
        className="
          text-sm
          font-['Poppins']
          text-rose-700
          m-0
        "
      >
        {message}
      </AlertDescription>
    </Alert>
  );
}