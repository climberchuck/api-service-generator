import $http from '$http';export function getCustomers () {
return $http["GET"]("api/customer");
}
export function getCustomer (companyid, customerid) {
return $http["GET"]("api/customer?companyid="+ companyid +"&customerid="+ customerid);
}
export function createCustomer (companyid, data) {
return $http["POST"]("api/customer?companyid="+ companyid, data);
}
