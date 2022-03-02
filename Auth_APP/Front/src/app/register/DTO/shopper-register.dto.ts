export class ShopperRegister {
    name: string;
    phoneNumber: number;
    email:string;
    password: string;
}


export interface Shopper {

    id: string,
    name: string,
    email: string,
    role: string,
    phoneNumber: string,
    status: string,
    createdAt: string,
    updatedAt:string,

}