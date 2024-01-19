// 백엔드 코드를 리팩토링 하기 위해 중복함수를 묶어서 좀더 간략하게 사용
//패키지를 사용하기위해 app.js 파일 뿐만 아니라 여기도 패키지사용을 지정해야한다
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"..","data", "restaurants.json"); //경로

function getStoredRestaurnts(){

  const fileData = fs.readFileSync(filePath); //파일 읽기
  const storedRestaurants = JSON.parse(fileData); //파일 변환

  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) { //원래 쓰던 변수가 내부 변수로 되었기때문에 미들웨어를 추가해 해결
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); //다시 json파일 변환후 저장
}

//지침서를 추가 
// 함수를 노출하거나 내보내기 
module.exports ={
    getStoredRestaurnts : getStoredRestaurnts,
    storeRestaurants : storeRestaurants
};

