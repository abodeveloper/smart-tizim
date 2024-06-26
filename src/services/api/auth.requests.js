import request from "./request";

function httpPostSignIn(loginDto) {
  return request.post("/login/", loginDto);
}

export { httpPostSignIn };
