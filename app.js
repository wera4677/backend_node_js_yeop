const fs = require("fs");
const path = require("path"); //경로

const express = require("express");
const uuid = require("uuid");


const app = express();

app.set("views", path.join(__dirname, "views")); //처리하려는 템플릿 파일을 찾을 위치를 익스프레스에 알림
app.set("view engine", "ejs"); //옵션을 설정 첫번째 매개변수 => view에 있는 HTML파일 을 처리하기 위한 템플릿 ,두번째 => ejs 사용

app.use(express.static("public")); //public 폴더의 파일을 요청이 들어오면 맞게 응답
app.use(express.urlencoded({ extended: false })); //들어온 요청을 구문분석(변환)

app.get("/", function (req, res) {
  res.render("index"); //템플릿 이름 전달
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json"); //경로

  const fileData = fs.readFileSync(filePath); //파일 읽기
  const storedRestaurants = JSON.parse(fileData); //파일 변환

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants, //ejs 단일 값을 반복문을 통해 json에서 값 가져올수있다.
  }); //매개변수 1 은 템플릿파일이름 , 2는 {ejs변수 키와 값 }
});

app.get("/restaurants/:id",function ( req, res) { //동적경로를 정의 / 도메인/restaurants/r1 을 방문하면 r1의값에 연결가능
    const restaurantId = req.params.id; //사용자에 의해 입력된 id 
    const filePath = path.join(__dirname, "data", "restaurants.json"); //경로

    const fileData = fs.readFileSync(filePath); //파일 읽기
    const storedRestaurants = JSON.parse(fileData); //파일 변환

    for (const restaurant of  storedRestaurants ) {//json 에서 특정 데이터를 찾는다 
        if (restaurant.id === restaurantId) {
           return res.render("restaurant-detail",{ restaurant: restaurant }); //id 를 전달하기위해 사용
        }
    }

    res.render("404");//경로를 찾지못할경우 404페이지 응답
});




app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body; //전체적인 키를 json에 저장하기위해 지정
  restaurant.id = uuid.v4();  
  const filePath = path.join(__dirname, "data", "restaurants.json"); //경로

  const fileData = fs.readFileSync(filePath); //파일 읽기
  const storedRestaurants = JSON.parse(fileData); //파일 변환

  storedRestaurants.push(restaurant); //데이터 추가

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); //다시 json파일 변환후 저장

  res.redirect("/confirm"); //응답으로 다른 페이지를 보내야한다 라는 뜻
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.use(function(req, res) { //다른 경로에서 처리되지않은 요청이 있을때마다 실행
    res.render("404");
}); //사용자입력 경로가 잘못된경우 404페이지 응답

app.use(function(error, req, res, next){
    res.render("500"); //서버측에 오류발생시 500페이지 응답
})

app.listen(3000);
