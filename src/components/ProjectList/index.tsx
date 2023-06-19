import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "Gideon",
    link: "/repair-dashboard",
    description: "A Repair Request Tool",
    imageUrl:
      "/help.png",
  },
  {
    name: "EasyDoc",
    link: "/upload",
    description: "A Document Upload and managment System",
    imageUrl:
      "/file.png",
  },
];

type Project = {
  name: string;
  link: string;
  role: string;
  imageUrl: string;
  lastSeen: string;
  lastSeenDateTime: string;
};

const ProjectList = () => {
  
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {projects.map((project) => (
        <Link
          href={project.link}
          key={project.link}
          className="flex justify-between gap-x-6 py-5"
        >
          <div className="flex gap-x-4">
            <Image
              height={200}
              width={200}
              // className="h-24 w-24"
              src={project.imageUrl}
              alt=""
            />
            <div className="ml-4 flex flex-col justify-center min-w-0">
              <p className="text-6xl font-semibold  text-gray-900">
                {project.name}
              </p>
              <p className="mt-1 truncate text-lg text-gray-500">
                {project.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default ProjectList;
