import axios from "axios";

export function get(url) {
  return axios.get(url);
}

export function post(url, params = null) {
  return axios.post(url, params);
}

export function put(url, params = null) {
  return axios.put(url, params);
}

export function remove(url, params = null) {
  return axios.delete(url);
}
