const path = require("path"); //경로

const express = require("express");

const defaultRoutes = require("./routes/default"); //표준 라우터 가져오기 
const restaurantRoutes = require("./routes/restaurant");//레스토랑 관련 라우터 가져오기

const app = express();

app.set("views", path.join(__dirname, "views")); //처리하려는 템플릿 파일을 찾을 위치를 익스프레스에 알림
app.set("view engine", "ejs"); //옵션을 설정 첫번째 매개변수 => view에 있는 HTML파일 을 처리하기 위한 템플릿 ,두번째 => ejs 사용

app.use(express.static("public")); //public 폴더의 파일을 요청이 들어오면 맞게 응답
app.use(express.urlencoded({ extended: false })); //들어온 요청을 구문분석(변환)

app.use("/",defaultRoutes); //매개변수 1 = 들어오는 경로의 시작을 확인 매개변수 2 =

app.use("/",restaurantRoutes) 

app.use(function(req, res) { //다른 경로에서 처리되지않은 요청이 있을때마다 실행
    res.status(404).render("404");
}); //사용자입력 경로가 잘못된경우 404페이지 응답

app.use(function(error, req, res, next){
    res.status(500).render("500"); //서버측에 오류발생시 500페이지 응답
})

app.listen(3000);
