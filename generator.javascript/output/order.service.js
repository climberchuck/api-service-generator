import $http from '$http';export function getOrders () {
return $http["GET"]("api/order");
}
export function getOrder (companyid, orderid, searchtext) {
return $http["GET"]("api/order?companyid="+ companyid +"&orderid="+ orderid +"&searchtext="+ searchtext);
}
export function createOrder (companyid, data) {
return $http["POST"]("api/order?companyid="+ companyid, data);
}
