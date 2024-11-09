export type Point = {
    id: string;
    longitude: number | '';
    latitude: number | '';
    names: { ru: string; en: string; zh: string };
    descriptions: { ru: string; en: string; zh: string };
    type_id: number | '';
    status_id: number | '';
    web: string;
    photos: string[];
};