import api from "../api";
export const fetchArea = function (input) {
  return api.get(`/area/list?input=${input}`); // Use the base URL from the instance
};
