import { useUser } from "@clerk/nextjs";
import React from "react";

const ProfileIcon = () => {
  const user = useUser();

  if (!user) return null;

  return <div>{/* <img /> */}</div>;
};
export default ProfileIcon;
