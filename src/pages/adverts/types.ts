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

export interface AdvertSimple extends Omit<Advert, 'id' | 'type' | 'createdAt' | 'photo' | 'sale'>
{
  sale:boolean;
  photo?:File;
};

export type AdvertResponse = Omit<AdvertSimple, 'photo'> & {
  id:string;
  createdAt:string;
  photo:string | File;
}

export interface FilterByAdverts {
        name:string;
        // type:string;
        sale?:boolean;
        tags:Tag[];
        price:[number,number];
        range:[number,number];
    }

export interface RadioType {
  value:string;
  state?:boolean;
}