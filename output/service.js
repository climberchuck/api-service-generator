export function GetCompanies() {
    return $http["GET"]("/api/v1/company");
}
export function GetCompanyById(companyId) {
    return $http["GET"]("/api/v1/company/" + companyId);
}
export function GetCompanyContactById(companyId, contactId) {
    return $http["GET"]("/api/v1/company/" + companyId + "/contact/" + contactId);
}
export function CreateCompany(data) {
    return $http["POST"]("/api/v1/company", data);
}
