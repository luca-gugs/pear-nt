import { User } from "@clerk/nextjs/dist/api";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username
      ? `@${user.username}`
      : user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.emailAddresses[0]?.emailAddress,
    email: user.emailAddresses[0]?.emailAddress,
    profilePicture: user?.profileImageUrl,
  };
};

export default filterUserForClient;
