export interface Rating{
    rate:number;
    count:number;
}

export interface Juego {
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    rating:Rating;  
}
