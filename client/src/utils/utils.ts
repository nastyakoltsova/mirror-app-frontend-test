export const declension = (number: number, one: string, few: string, many: string) => {
    if (number % 10 === 1 && number % 100 !== 11) {
        return one;
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
        return few;
    } else {
        return many;
    }
};

export const formatDate = (date: Date) => {
    const datePost: Date = new Date(date)
    const dateToday: Date = new Date()

    const hoursCount = (Number(dateToday) - Number(datePost)) / (1000 * 60 * 60);

    if (hoursCount < 24) {
        const hours = Math.floor(hoursCount)
        return `около ${hours} ${declension(Math.floor(hoursCount), "час", "часа", "часов")} назад`
    } else if (hoursCount >= 24 && hoursCount <= 168) {
        const days = Math.floor(hoursCount / 24)
        return `${days} ${declension(days, "день", "дня", "дней")} назад`
    } else {
        return datePost.toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric' })
    }
}