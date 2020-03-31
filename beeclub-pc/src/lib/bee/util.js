window.getParameterByName=function(e,n){
    n||(n=window.location.href),
    e=e.replace(/[\[\]]/g,"\\$&");
    var o=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(n);
    return o ? o[2] ? decodeURIComponent(o[2].replace(/\+/g," ")) : "" : null
}