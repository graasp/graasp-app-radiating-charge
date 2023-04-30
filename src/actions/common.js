const flag = (type) => (payload) => (dispatch) =>
  dispatch({
    type,
    payload,
  });

const receiveMessage = () => (event) => {
  const { data } = event;
  try {
    const message = JSON.parse(data);

    const { type } = message;

    switch (type) {
      default:
        return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export { flag, receiveMessage };
