import { CircleNotchIcon, Eye, EyeSlashIcon, X } from "@phosphor-icons/react";
import "@/app/Assets/components/loader.css"
import { Check } from "@phosphor-icons/react/dist/ssr";

interface propsloader {
  status: string;
}

export default function Loader({ status }: propsloader) {
  return (
    <>
      {status === "loading" && <CircleNotchIcon id="loaderIcon" width={24} height={24} />}
      {status === "error" && <X width={24} height={24} />}
      {status === "sucess" && <Check id="checkIcon" width={24} height={24} />}
    </>
  );
}
