import api from "../controller/api";

function IsAuthenticated() {
  const zvix_user_id = localStorage.getItem("zvix_token");

  if (zvix_user_id) {
    return true;
  } else {
    return false;
  }
}

export default IsAuthenticated;
