import axios from "axios";
/**
 * Fetches images by sending a POST request to the backend API.
 *
 * @param {Array.<string|Blob>} files - An array of file paths or Blob objects representing the images to be uploaded.
 * @returns {Promise}
 */
const postImagesFetcher = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  return axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/upload-images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
