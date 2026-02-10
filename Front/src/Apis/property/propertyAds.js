import api from "../api";
export const propertyPageAll = function (payload) {
  return api.get("/properties/page-all", payload); // Use the base URL from the instance
};
export const createProperty = function (payload) {
  return api.post(`/properties/create`, payload); // Use the base URL from the instance
};
export const updateProperty = async function (payload, id) {
  return api.put(`/properties/update/${id}`, payload); // Use the base URL from the instance
};
export const deleteProperty = async function (id) {
  return api.delete(`/properties/delete/${id}`, payload); // Use the base URL from the instance
};
