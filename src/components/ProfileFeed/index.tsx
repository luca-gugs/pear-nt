import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";
import Dropdown from "../Dropdown";
import LoadingSpinner from "../Atoms/LoadingSpinner";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });
  const [selected, setSelected] = useState("Unassigned");

  const assigneeDummyArray = [
    {
      userId: "user1",
      name: "John Doe",
      email: "johndoe@example.com",
      avatar: "https://example.com/avatar/johndoe.png",
      role: "Admin",
    },
    {
      userId: "user2",
      name: "Jane Smith",
      email: "janesmith@example.com",
      avatar: "https://example.com/avatar/janesmith.png",
      role: "User",
    },
    {
      userId: "user3",
      name: "Michael Johnson",
      email: "michaeljohnson@example.com",
      avatar: "https://example.com/avatar/michaeljohnson.png",
      role: "Manager",
    },
    {
      userId: "user4",
      name: "Sophia Lee",
      email: "sophialee@example.com",
      avatar: "https://example.com/avatar/sophialee.png",
      role: "Admin",
    },
    {
      userId: "user5",
      name: "Daniel Brown",
      email: "danielbrown@example.com",
      avatar: "https://example.com/avatar/danielbrown.png",
      role: "User",
    },
  ];

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex h-full w-[80%] flex-col pt-4">
      {/* <LoadingSpinner /> */}
      {data?.map((post) => {
        return (
          <div
            key={post.id}
            className="mt-4 flex w-full items-center space-x-4 rounded-lg bg-white p-4 shadow-sm"
          >
            <div className="h-4 w-4 rounded-full bg-green-500"></div>

            <Link
              href={`post/${post.id}`}
              className="flex-grow cursor-pointer overflow-hidden font-semibold"
            >
              {post.content.slice(0, 100)}...
            </Link>
            {/* Title Field */}
            <div className="text-gray-500">
              {dayjs(post.createdAt).fromNow()}
            </div>
            {/* <Dropdown assignees={assigneeDummyArray} /> */}
            <Dropdown
              assignees={assigneeDummyArray}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProfileFeed;
