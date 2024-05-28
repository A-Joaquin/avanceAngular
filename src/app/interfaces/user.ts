export interface Name {
    firstname: string;
    lastname: string;
}
export interface Geolocation {
    lat: number;
    long: number;
}

export interface Adress {
    city: string;
    street: string;
    number:number;
    zipcode:number;
    geolocation:Geolocation;
}

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: Name;
    adress:Adress,
    phone:string;
}