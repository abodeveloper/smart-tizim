import request from "./request";

function httpPostSignIn(loginDto) {
  return request.post("/login/", loginDto);
}

function httpGetMe() {
  return request.get("/me/");
}

export { httpPostSignIn, httpGetMe };
