import { Eye, EyeSlashIcon } from "@phosphor-icons/react";

interface propsIconPass {
  HandleView: boolean;
}

export default function IconPassView({ HandleView }: propsIconPass) {

  return (
    <>
      {HandleView ? (
        <Eye width={24} height={24} />
      ) : (
        <EyeSlashIcon width={24} height={24} />
      )}
    </>
  );
}
