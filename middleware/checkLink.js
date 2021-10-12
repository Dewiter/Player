// Check if data already exist

const checkLink = async (model, value) => {
  const query = await model
    .find({ name: value }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return result;
      }
    })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};

module.exports = checkLink;
