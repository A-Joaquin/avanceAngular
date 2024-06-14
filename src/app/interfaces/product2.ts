export interface Rating{
    rate:number;
    count:number;
}

export interface Product2 {
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    rating:Rating;  
}
