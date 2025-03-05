const HttpSuccess = (data = null, message = "Success", slug = "success") => {
  return {
    data,
    message,
    slug,
  };
};

module.exports = {
  HttpSuccess,
};
