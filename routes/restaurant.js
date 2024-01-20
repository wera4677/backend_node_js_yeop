//레스토랑의 특정 라우트와 페이지를 유지
const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurant-data");//내파일을 가져오기

const router = express.Router(); 


router.get("/restaurants", function (req, res) {
    let order =req.query.order; //레스토랑.ejs의 order을 가지고온다
    let nextOrder = "desc";

    if (order !== "asc" && order !== "desc"){
        order ="asc";
    }

    if (order === "desc"){
        nextOrder ="asc";
    }

    const storedRestaurants = resData.getStoredRestaurnts();

    storedRestaurants.sort(function(resA, resB){
        if (
            ( order === "asc" && resA.name > resB.name) || 
            (order === "desc" && resB.name > resA.name)
        ){ //정렬
            return 1;
        }
        return -1;    
    }); 

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants, //ejs 단일 값을 반복문을 통해 json에서 값 가져올수있다.
    nextOrder: nextOrder,
  }); //매개변수 1 은 템플릿파일이름 , 2는 {ejs변수 키와 값 }
});

router.get("/restaurants/:id",function ( req, res) { //동적경로를 정의 / 도메인/restaurants/r1 을 방문하면 r1의값에 연결가능
    const restaurantId = req.params.id; //사용자에 의해 입력된 id 
    const storedRestaurants = resData.getStoredRestaurnts();

    for (const restaurant of  storedRestaurants ) {//json 에서 특정 데이터를 찾는다 
        if (restaurant.id === restaurantId) {
           return res.render("restaurant-detail",{ restaurant: restaurant }); //id 를 전달하기위해 사용
        }
    }

    res.status(404).render("404");//경로를 찾지못할경우 404페이지 응답
});


router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body; //전체적인 키를 json에 저장하기위해 지정
  restaurant.id = uuid.v4();  
 const restaurants = resData.getStoredRestaurnts(); //경로 연결 + 읽기 + 변환

 restaurants.push(restaurant); //데이터 추가

 resData.storeRestaurants(restaurant); //json 파일로 변환

  res.redirect("/confirm"); //응답으로 다른 페이지를 보내야한다 라는 뜻
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

//지침서 작성
module.exports =  router; //파일 외부에서도 사용할수있게 한다.