import httpClient from '../index';
import {createActor} from "../../types/actor-type";

export default {
   getAllActors(limit: number, page: number) {
       const query = `actors?limit=${limit}&page=${page}`;
       return httpClient.get(query);
   },

   createActor({
       firstName,
       secondName,
       Birth,
       Nationality
               }: createActor) {
       return httpClient.post('/actors', {
           firstName, secondName, Birth, Nationality
       })
   }
}