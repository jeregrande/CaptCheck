export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);

export const randomCategory = () => {
    switch(Math.floor(Math.random() * 4)) {
        case 0:
            return 9;   /* General Knowledge */
        case 1:
            return 15;  /* Viddy Games */
        case 2:
            return 18;  /* Comp sci */
        default:
            return 31;  /* Anime & Manga */
    }
}