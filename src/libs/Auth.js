import api from "../controller/api";

function IsAuthenticated() {
  const zvix_user_id = localStorage.getItem("zvix_token");

  if (zvix_user_id) {
    const AuthStr = "Bearer ".concat(zvix_user_id);

    api
      .get("/api/v1/ok")
      .then(() => {
        return true;
      })
      .catch((erro) => {
        console.log(erro);
        return false;
      });
  } else {
    return false;
  }
}

export default IsAuthenticated;
