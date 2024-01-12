const fs = require("fs"); 
const path = require("path"); //경로

const express = require("express");

const app = express();

app.use(express.static("public")); //public 폴더의 파일을 요청이 들어오면 맞게 응답
app.use(express.urlencoded({extended:false})); //들어온 요청을 구문분석(변환) 


app.get("/", function(req,res){
    const indexHtml = path.join(__dirname,"views","index.html");
    res.sendFile(indexHtml);
});

app.get("/restaurants", function(req,res){
    const htmlFilePath = path.join(__dirname,"views","restaurants.html") //파일의 절대경로를 가져옴
    res.sendFile(htmlFilePath) //응답으로 파일을 보냄
});

app.get("/recommend", function(req,res){
    const recommendHtml = path.join(__dirname,"views","recommend.html");
    res.sendFile(recommendHtml);
});

app.post("/recommend", function(req,res){
    const restaurant = req.body; //전체적인 키를 json에 저장하기위해 지정
    const filePath = path.join(__dirname,"data","restaurants.json"); //경로

    const fileData = fs.readFileSync(filePath) //파일 읽기 
    const storedRestaurants =JSON.parse(fileData); //파일 변환

    storedRestaurants.push(restaurant) //데이터 추가 

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); //다시 json파일 변환후 저장

    res.redirect("/confirm") //응답으로 다른 페이지를 보내야한다 라는 뜻
});

app.get("/confirm",function(req,res){
    const confirmHtml = path.join(__dirname,"views","confirm.html");
    res.sendFile(confirmHtml);
});

app.get("/about",function(req,res){
    const aboutHtml = path.join(__dirname,"views","about.html");
    res.sendFile(aboutHtml);
});



app.listen(3000);