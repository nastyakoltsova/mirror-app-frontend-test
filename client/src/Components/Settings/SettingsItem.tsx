interface SettingsItemProps {
    title: string,
    value: string | number
}

function SettingsItem({title, value}: SettingsItemProps) {
    return (
        <div className={"flex flex-col gap-2"}>
            <span className={"m-0 pl-2 text-sm"}>{title}</span>
            <span className={"m-0 p-2 text-md rounded-xl bg-[#27272A] transition duration-200 hover:bg-[#444449]"}>{value}</span>
        </div>
    );
}

export default SettingsItem
