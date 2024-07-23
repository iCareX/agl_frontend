import axios from "axios";

export const PDFUploadAPI = async (formData) => {
  const response = await axios.post(`https://e16b-35-226-179-79.ngrok-free.app/process`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
