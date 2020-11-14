export const authMiddleWare = (history) => {
  const authToken = localStorage.getItem("AuthToken");
  const authTokenTime = localStorage.getItem("AuthTokenTime");
  let nowTime = new Date().getTime();

  const diff_minutes = (dt2, dt1) => {
    var diff = (dt2 - dt1) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  };

  if (authToken === null || diff_minutes(nowTime, authTokenTime) >= 60) {
    history.push("/login");
  }
};
