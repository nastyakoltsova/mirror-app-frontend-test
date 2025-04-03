export interface ISettings {
    layout: {
        current: "grid" | "masonry",
        params: {
            grid: {
                columns: number,
                rows: number
            },
            masonry: {
                columns: number,
                rows: number
            }
        }
    },
    navigation: "load-more" | "pagination",
    template: "hover" | "classic"
}