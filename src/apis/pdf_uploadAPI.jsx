import axios from "axios";

export const PDFUploadAPI = async (formData) => {
  const response = await axios.post(`https://agl-backend-v01-f18b523e279d.herokuapp.com/process`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const PDFAnalytics = async (jobid) => {
  const response = await axios.get(`https://agl-backend-v01-f18b523e279d.herokuapp.com/results/${jobid}`);

  return response;
};
