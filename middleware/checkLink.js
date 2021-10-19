// Check if data already exist

const checkLink = async (src) => {
  const a = new Audio(src);
  try {
    a.play();
    a.pause();
    console.log('good link');
  } catch (err) {
    console.error(err);
  }
};

module.exports = checkLink;
