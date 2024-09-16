// import axios from 'axios';
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// const api = axios.create({
// 	baseURL: API_URL,
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// });

// export const fetchSheetsList = () => {
// 	return api.get(`${API_URL}/sheets`);
// };
// export const fetchSheetById = (id) =>{
//     return api.get(`${API_URL}/sheets/${id}`);
// }
import axios from 'axios';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSheetsList = () => {
  return api.get(`${API_URL}/get-files`); 
};


export const fetchSheetById = (id) => {
  return api.get(`${API_URL}/get-files/${id}`); 
};


export const uploadSheet = (formData) => {

  return api.post(`${API_URL}/upload-files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
};

