const fs = require("fs");
const path = require("path");

const express = require("express"); //익스프레스 라이브러리 사용

const app = express(); //익스프레스 실행

app.use(express.urlencoded({extended:false})); //요청을 살펴보고 요청이 데이터를 가지고있고 찾는데이터라면 데이터를 구문분석해서 js객체로 변환시킨다.


app.get("/currenttime",function(req,res){//들어오는 요청에 대해 요청핸들러 정의 (요청 처리) ,첫번째 매개변수:주소 두번째:실행되어야할 함수
    res.send('<h1>' + new Date().toISOString() +'</h1>'); //응답을 보내는 메서드 
});   //localhost:3000/currenttime

app.get("/",function(req,res){
    res.send('<form action="/store-user" method="POST"><label>Your Name:</label><input type="text" name="username"><button>제출</button></form>')
});  //localhost:3000/

app.post("/store-user",function(req,res){ 
    const userName = req.body.username;

    const filePath = path.join(__dirname, "data", "users.json"); //경로

    const fileData = fs.readFileSync(filePath);  //파일 읽기 
    const existingUsers = JSON.parse(fileData);  //js객체 또는 배열로 변환 

    existingUsers.push(userName); //해당 배열 또는 js객체에 새로운 항목을 추가 
    
    fs.writeFileSync(filePath, JSON.stringify(existingUsers)); //경로를 연결후 변경한 내용을 저장/ JSON.stringify() =>제이슨형식으로 변환

    res.send('<h1>이름 저장!!</h1>');
});

app.get("/users",function(req,res){ //json파일에 저장된 내용 보여줌
    const filePath = path.join(__dirname, "data", "users.json"); //경로

    const fileData = fs.readFileSync(filePath);  //파일 읽기 
    const existingUsers = JSON.parse(fileData);  //js객체 또는 배열로 변환 
    
    let responseData = '<ul>';

    for (const user of existingUsers) {
        responseData += "<li>" + user + "</li>";
    }
    
    responseData += "</ul>";

    res.send(responseData);
});

app.listen(3000); //익스프레스 포트번호 설정


