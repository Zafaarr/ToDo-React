import axios from "axios";

const BEZ_URL = "https://6467044d2ea3cae8dc23b733.mockapi.io/api/todos";

export const todosServices = {
  get: () => axios.get(BEZ_URL),
  delete: (id) => axios.delete(BEZ_URL + "/" + id),
  create: (body) => axios.post(BEZ_URL, body),
  update: (id, body) => axios.put(BEZ_URL + "/" + id, body),
};
