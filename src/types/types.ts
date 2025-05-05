export interface User {
    _id: string;
    email?: string;
    isVerified: boolean;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}

export type NewUser = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
};

export type CartProduct = Omit<Product, "sizes" | "colors" | "images"> & {
    selectedColor: string;
    selectedSize: string;
    imageURL: string;
    priceId: string;
};

export type Product = {
    imageURL: string | undefined;
    _id: string;
    name: string;
    price: number;
    category: string;
    colors: string[];
    sizes: [{ size: string, priceId: string }];
    quantity: number;
    images: string[];
};