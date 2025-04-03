import cx from 'classnames';

interface NavigationButtonProps {
    text: string,
    action: () => void,
    active?: boolean
}

function PaginationButton({ text, action, active }: NavigationButtonProps) {
    return (
        <button className={cx("h-11 w-11 p-3 rounded-lg transition duration-300", active ? "bg-[#006FEE] hover:bg-[#006FAA]" : "bg-[#27272A] hover:bg-[#444449]")} onClick={action}>
            <span className={"text-white"}>{text}</span>
        </button>
    )
}

export default PaginationButton;