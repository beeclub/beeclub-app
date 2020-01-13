
import http from 'util/http.js'
const apiPrefix = "/api/public/v1/";
export function semPromotion(module){
    return http.get(apiPrefix+"common/sem/promotion/" + module);
}