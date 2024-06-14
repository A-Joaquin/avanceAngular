export interface JuegoCart{
    juegoId:number;
    quantity:number;
}
export interface Cart {
    _id?: string; // Ahora es opcional
    id:number;
    userId:number;
    products:JuegoCart[];

}
