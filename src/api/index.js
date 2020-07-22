import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001';
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export function fetchTasks() {
  return client.get('/tasks');
}

export function createTask(params) {
  return client.post('/tasks', params);
}

// step 2 create the api call function for axios

export function editTask(id, params) {
  console.log('id api', id);
  console.log('params api', params);
  return client.put(`/tasks/${id}`, params);
}
