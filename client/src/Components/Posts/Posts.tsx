import {useCallback, useEffect, useMemo, useState} from "react";
import Post from "./Post.tsx";
import {useGetSettingsQuery} from "../../store/settings.ts";
import {useGetPostsQuery} from "../../store/posts.ts";
import {useGetUsersQuery} from "../../store/users.ts";
import cx from 'classnames';
import PaginationButton from "../PaginationButton/PaginationButton.tsx";
import "./index.css"
import {IFormattedPost} from "../../types/posts.ts";

function Posts() {
    const {data: settings, isFetching} = useGetSettingsQuery();
    const {data: users} = useGetUsersQuery();
    const {data: posts} = useGetPostsQuery();

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(0);

    const formattedPosts = useMemo(() => {
        if (!posts || !users) return [];
        return posts.map((post) => {
            const user = users.find((o) => o.id === post.userId);
            return {
                ...post,
                username: user ? user.username : "unknown user",
            };
        });
    }, [posts, users]);

    useEffect(() => {
        if (!settings) return;

        if (settings.layout.current === "grid") {
            setPostsPerPage(settings.layout.params.grid.columns * settings.layout.params.grid.rows);
        } else if (settings.layout.current === "masonry") {
            setPostsPerPage(settings.layout.params.masonry.columns * settings.layout.params.masonry.rows);
        }

        setCurrentPage(1);
    }, [settings]);

    const totalPages = useMemo(() => {
        return postsPerPage ? Math.ceil(formattedPosts.length / postsPerPage) : 0;
    }, [formattedPosts, postsPerPage]);

    const displayedPosts = useMemo(() => {
        const start = (currentPage - 1) * postsPerPage;
        return formattedPosts.slice(start, start + postsPerPage);
    }, [formattedPosts, currentPage, postsPerPage]);

    const handleLoadMore = useCallback(() => {
        if (!settings) return;

        const {layout} = settings;
        const layoutParams = layout?.params?.[layout?.current];

        if (layoutParams) {
            setPostsPerPage((prev) => prev + layoutParams.columns * layoutParams.rows);
        } else {
            setPostsPerPage((prev) => prev + 3);
        }
    }, [settings]);


    const isGrid = settings?.layout.current === "grid";
    const isMasonry = settings?.layout.current === "masonry";

    return (
        <div className={"pl-[320px] pr-[20px] w-full"}>
            {isFetching ?
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                </div>
                :
                <>
                    {isGrid &&
                        <div
                            className={cx("grid gap-3 p-3")}
                            style={{
                                gridTemplateColumns: `repeat(${settings.layout.params.grid.columns}, 1fr)`,
                                overflow: "hidden",
                            }}
                        >
                            {displayedPosts?.map((post) => (
                                <Post post={post} key={post.id}/>
                            ))}
                        </div>
                    }
                    {isMasonry && (
                        <div
                            className="p-3 masonry-container"
                            style={{
                                columnCount: settings?.layout.params.masonry.columns || 3,
                                columnGap: "1rem",
                            }}
                        >
                            {displayedPosts.map((post: IFormattedPost) => (
                                <div key={post.id} className="masonry-item">
                                    <Post post={post} />
                                </div>
                            ))}
                        </div>
                    )}

                    {settings?.navigation === "load-more" &&
                        <div className={"flex justify-center h-12 align-middle"}>
                            <button
                                onClick={handleLoadMore}
                                className={cx("h-10 p-3 rounded-lg transition duration-300 bg-[#006FEE] hover:bg-[#006FAA] text-white")}
                            >
                                Load more
                            </button>
                        </div>
                    }
                    {settings?.navigation === "pagination" && totalPages > 1 && (
                        <div className="flex gap-2 justify-center mb-4 h-14 align-middle">
                            <PaginationButton
                                text="1"
                                action={() => setCurrentPage(1)}
                                active={currentPage === 1}
                            />

                            {currentPage >= 5 && (
                                <PaginationButton
                                    text="..."
                                    action={() => setCurrentPage(prev => Math.max(prev - 5, 1))}
                                    active={false}
                                />
                            )}

                            {Array.from({length: 4}, (_, i) => {
                                const page = currentPage <= 3 ? i + 2 : currentPage - 2 + i;
                                if (page >= totalPages) return null;
                                return (
                                    <PaginationButton
                                        key={page}
                                        text={String(page)}
                                        action={() => setCurrentPage(page)}
                                        active={page === currentPage}
                                    />
                                );
                            })}

                            {currentPage + 5 < totalPages && (
                                <PaginationButton
                                    text="..."
                                    action={() => setCurrentPage(prev => Math.min(prev + 5, totalPages))}
                                    active={false}
                                />
                            )}

                            <PaginationButton
                                text={String(totalPages)}
                                action={() => setCurrentPage(totalPages)}
                                active={currentPage === totalPages}
                            />
                        </div>
                    )}
                </>
            }
        </div>
    );
}

export default Posts
