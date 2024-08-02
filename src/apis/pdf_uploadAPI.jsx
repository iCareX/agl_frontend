import axios from "axios";

export const PDFUploadAPI = async (formData) => {
  const response = await axios.post(`https://cryptic-gorge-91877-fa2006f12c52.herokuapp.com/process`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const PDFAnalytics = async (jobid) => {
  const response = await axios.get(`https://cryptic-gorge-91877-fa2006f12c52.herokuapp.com/results/${jobid}`);

  return response;
};
