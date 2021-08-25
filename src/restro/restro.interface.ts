export interface ICuisine {
  name: string;
  price: number;
}
export interface IRestro {
  id?: string;
  name: string;
  description: string;
  address: string;
  cuisines: ICuisine[];
}
