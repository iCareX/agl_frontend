import axios from "axios";

export const PDFUploadAPI = async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_APP_PUBLIC_URL}/process`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
