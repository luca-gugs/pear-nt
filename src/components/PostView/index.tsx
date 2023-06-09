import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { RouterOutputs } from "~/utils/api";
import { trimContent } from "~/utils/helpers";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

dayjs.extend(relativeTime);

const PostView = (props: PostWithUser) => {
  const { post, owner } = props;

  return (
    //RequestCard START
    <div
      key={post.id}
      className="relative my-2 h-fit w-full min-w-[18rem] rounded-lg bg-white p-2 pb-[1.5rem] shadow-md md:m-2 md:h-[265px] md:w-[20rem] md:p-2"
    >
      <Link
        href={`/${owner?.id}`}
        className="absolute bottom-2 left-2 text-xs text-slate-400 transition-colors duration-200 hover:text-black"
      >
        {owner?.username}
      </Link>
      <Link
        href={`/post/${post?.id}`}
        className="absolute bottom-2 right-2 text-xs text-slate-400 transition-colors duration-200 hover:text-black"
      >
        {dayjs(post.createdAt).fromNow()}
      </Link>
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold">
          {post.content.slice(0, 35) + "..."}
        </h3>
        <p className="text-gray-600">{trimContent(post.content)}</p>
      </div>
    </div>
    //RequestCard END
  );
};

export default PostView;
