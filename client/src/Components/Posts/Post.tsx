import {useGetSettingsQuery} from "../../store/settings.ts";
import classNames from "classnames";
import {declension, formatDate} from "../../utils/utils.ts";
import {IFormattedPost} from "../../types/posts.ts";

const cn = classNames;

interface PostProps {
    post: IFormattedPost
}

function Post({post}: PostProps) {
    const { data: settings } = useGetSettingsQuery();

    return (
        <div className={"bg-[#18181B] text-white rounded-xl py-2 flex flex-col h-full"}>
            <div className={cn("flex flex-col flex-grow", settings?.template === "classic" && "flex-col-reverse")}>
                <div className={'m-3'}>
                    <p className={"text-sm mb-1"}>{post.username}</p>
                    <p className={"text-[12px] text-gray-500"}>{formatDate(post.date)}</p>
                </div>
                <hr className={"text-gray-500"} />
                <p className={'m-3 flex-grow'}>{post.caption}</p>
            </div>
            <hr className={"w-full text-gray-500"} />
            <div className={'flex gap-3 m-3 text-xs flex-wrap items-end'}>
                <p>{post.comments} {declension(post.comments, "коммент", "коммента", "комментов")}</p>
                <p>{post.likes} {declension(post.likes, "лайк", "лайка", "лайков")}</p>
            </div>
        </div>
    );
}

export default Post

