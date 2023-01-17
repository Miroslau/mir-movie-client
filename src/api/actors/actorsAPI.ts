import httpClient from '../index';

export default {
   getAllActors(limit: number, page: number) {
       const query = `actors?limit=${limit}&page=${page}`;
       return httpClient.get(query);
   }
}