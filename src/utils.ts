export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);

export const randomCategory = () => {
    switch(Math.floor(Math.random() * 4)) {
        case 0:
            return 15;  /* Viddy Games */
        case 1:
            return 18;  /* Comp sci */
        case 2:
            return 9;   /* General Knowledge */
        default:
            return 31;  /* Anime & Manga */
    }
}