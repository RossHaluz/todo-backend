const CtrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.log(error);
    }
  };

  return func;
};

module.exports = {
  CtrlWrapper,
};
