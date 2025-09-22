import { useFetch } from "./useFetch";

export function useUsers() {

return useFetch('/api/users', "GET");
}