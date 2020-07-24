export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);

export const randomCategory = () => {
    switch(Math.floor(Math.random() * 2)) {
        case 0:
            return 15;
        default:
            return 31;
    }
}