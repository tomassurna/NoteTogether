import Alert from "react-s-alert";

const processError = (error) => {
  let errorCode = "";

  console.debug(error);

  try {
    if (!!error.data) {
      const keys = Object.keys(error.data);
      keys.forEach((key) => {
        if (error.data[key].hasOwnProperty("reason")) {
          errorCode = error.data[key].reason;
        }
      });
    }

    if (!errorCode && error.hasOwnProperty("reason")) {
      errorCode = error.reason;
    }
  } catch (err) {
    // do nothing
  }

  let errorMessage = "";

  switch (errorCode) {
    case "E001":
      errorMessage = "Invalid post id.";
      break;
    case "E002":
      errorMessage = "You have already purchased this post.";
      break;
    case "E003":
      errorMessage = "Post minnium fee is required for purchase.";
      break;
    case "E004":
      errorMessage = "You do not own this post.";
      break;
    case "E005":
      errorMessage = "You have already rated this post.";
      break;
    case "E006":
      errorMessage = "Post owner cannot vote on their own post.";
      break;
    default:
      errorMessage = "An error has occured.";
      break;
  }

  Alert.error(errorMessage, {
    position: "top-right",
    effect: "stackslide",
    offset: "50",
  });

  setTimeout(function () {
    Alert.closeAll();
  }, 3000);
};

export { processError as default };
