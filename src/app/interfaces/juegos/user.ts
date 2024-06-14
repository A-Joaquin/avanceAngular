export interface Address {
    city: string;
    street: string;
    number: number;
    zipcode: string;
}

export interface Name {
    firstname: string;
    lastname: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: Name;
    address: Address;
    phone: string;
}