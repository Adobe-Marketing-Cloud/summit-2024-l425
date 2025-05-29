const { REACT_APP_HOST_URI, REACT_APP_USE_PROXY } = process.env;

const serviceURL = REACT_APP_USE_PROXY === "true" ? "/" : REACT_APP_HOST_URI;

export const getURI = (path = "") => {
  return serviceURL + path;
};

export const getServiceURL = () => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  if (searchParams.has("service")) {
    return searchParams.get("service");
  }
  return null;
};