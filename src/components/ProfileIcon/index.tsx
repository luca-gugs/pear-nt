import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const ProfileIcon = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="h-10 w-10 overflow-hidden rounded-full">
      <Image
        className="h-full w-full object-cover"
        src={user.profileImageUrl}
        alt="owners profile pic"
        width={56}
        height={56}
        // placeholder="blur"
      />
    </div>
  );
};
export default ProfileIcon;
