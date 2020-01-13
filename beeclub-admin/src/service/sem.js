import http from '@/utils/http'
export function semPromotionPageList(params){
    return http.get("/semPromotion/pageList", {params});
}