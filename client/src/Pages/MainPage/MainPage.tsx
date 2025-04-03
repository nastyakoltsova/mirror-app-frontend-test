import Settings from "../../Components/Settings/Settings.tsx";
import Posts from "../../Components/Posts/Posts.tsx";

function MainPage() {
    return (
        <div className={"flex flex-row gap-8 bg-[#F4F4F5] h-[100vh]"}>
            <Settings />
            <Posts />
        </div>
    );
}

export default MainPage
