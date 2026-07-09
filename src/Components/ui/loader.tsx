import { CircleNotchIcon, Eye, EyeSlashIcon, X } from "@phosphor-icons/react";
import "@/app/Assets/components/loader.css"
import { Check } from "@phosphor-icons/react/dist/ssr";

interface propsloader {
  status: string;
}

export default function Loader({ status }: propsloader) {
  return (
    <>
      {status === "LOADING" && <CircleNotchIcon id="loaderIcon" width={24} height={24} />}
      {status === "ERROR" && <X width={24} height={24} />}
      {status === "SUCESS" && <Check id="checkIcon" width={24} height={24} />}
    </>
  );
}
