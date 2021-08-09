import Alert from "react-s-alert";

const processError = (error) => {
  console.debug(error);

  Alert.error("Error", {
    position: "top-right",
    effect: "stackslide",
    offset: "50",
  });

  setTimeout(function () {
    Alert.closeAll();
  }, 3000);
};

export { processError as default };
