//레스토랑과 직접 관련없는 표준 라우트를 유지

const express = require("express");

const router = express.Router(); 

router.get("/", function (req, res) {
  res.render("index"); //템플릿 파일 이름 전달
});

router.get("/about", function (req, res) {
  res.render("about");
});

//지침서 작성
module.exports = router; ////파일 외부에서도 사용할수있게 한다.
