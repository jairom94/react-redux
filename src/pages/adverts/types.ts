export type Tag = 'lifestyle' | 'mobile' | 'motor' | 'work'

 

export interface Advert {
    id?:string;
    createdAt?:string;
    name:string;
    sale?:boolean;
    type?:string;
    price:number;
    tags:string[];
    photo:string | File;
    [key: string]: string | number | boolean | string[] | File | undefined; 
}

export interface FilterByAdverts {
        name:string;
        type:string;
        tags:string[]
    }