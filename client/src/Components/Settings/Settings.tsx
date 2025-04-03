import SettingsItem from "./SettingsItem.tsx";
import {useGetSettingsQuery} from "../../store/settings.ts";

function Settings() {
    const {data: settings, refetch, isFetching} = useGetSettingsQuery();

    const layoutParams = settings?.layout?.params?.[settings?.layout?.current];

    return (
        <div className={"flex flex-col gap-6 p-4 w-full h-[100vh] max-w-[300px] bg-[#18181B] text-white fixed"}>

            {isFetching ?
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
                :
                <>
                    <button
                        className={"border-none rounded-xl p-3 bg-[#3B3B41] text-white cursor-pointer transition duration-500 hover:bg-[#2c2c2f]"}
                        onClick={() => refetch()}>
                        <span className={"text-sm"}>Обновить</span>
                    </button>
                    <div className={"flex flex-col gap-4"}>
                        <SettingsItem title={"Шаблон (макет)"}
                                      value={settings?.layout.current === "grid" ? "Сетка" : "Плиточная верстка"}/>
                        <SettingsItem title={"Карточка"}
                                      value={settings?.template === "classic" ? "Классическая" : "Наведения"}/>
                        <SettingsItem title={"Навигация"}
                                      value={settings?.navigation === "load-more" ? "Загрузить еще" : "Пагинация"}/>
                        <SettingsItem title={"Колонок"} value={layoutParams?.columns || 3}/>
                        <SettingsItem title={"Рядов"} value={layoutParams?.rows || 3}/>
                    </div>
                </>
            }
        </div>
    );
}

export default Settings
