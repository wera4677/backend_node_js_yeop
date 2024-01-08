const http = require("http"); //http 패키지 (응답,요청 처리)

function handleRequest(request, response) {//서버 생성 시 실행되는 함수

  if (request.url === "/currenttime") {//도메인+포트 의 뒷부분의 주소
    //localhost:3000/currenttime

    response.statusCode = 200; //statusCode 는 요청이 성공했는지 여부를 알림
    response.end('<h1>' + new Date().toISOString() +'</h1>'); //현재시각 응답

  } else if (request.url === "/") {//뒷주소가 / 일경우 실행
    //localhost:3000/
    
    response.statusCode = 200; //statusCode 는 요청이 성공했는지 여부를 알림
    response.end("<h1>Hello world!</h1>"); //응답 준비 끝낸후 클라이언트에 데이터 보냄
  }
}

const server = http.createServer(handleRequest); //웹서버 생성

server.listen(3000); //테스트 포트번호 설정
