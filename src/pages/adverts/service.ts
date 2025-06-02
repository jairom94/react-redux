import { client } from "../../api/client";
import type { Advert, Tag } from "./types";

const URL_ADVERTS = "/api/v1/adverts";


export const getAdverts = async (filterByTag:string) => {
    const urlFilter = filterByTag ? `?tags=${filterByTag}` : ''
    const response = await client.get<Advert[]>(`${URL_ADVERTS}${urlFilter}`);
    return response.data
}

export const getTags = async () => {
    const response = await client.get<Tag[]>(`${URL_ADVERTS}/tags`);
    return response.data
}

export const createAdvert = async (advertFormData:FormData) => {
    const response = await client.post<Advert>(URL_ADVERTS,advertFormData);
    return response.data
}

export const detailAdvert = async (advertId:string) => {
    const response = await client.get<Advert>(`${URL_ADVERTS}/${advertId}`);
    return response.data
}

export const deleteAdvert = async (advertId:string) => {
    const response = await client.delete<Advert>(`${URL_ADVERTS}/${advertId}`);
    return response.data
}