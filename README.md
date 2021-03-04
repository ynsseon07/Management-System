# Management-System

< 사용기술 >
 * Frontend - ReactJS 사용
 * Backend - nodeJS express 서버, oracle DB 사용
 
 
< Frontend 구현기능 >

 1. 고객 데이터 CRUD
  - 고객 데이터 추가, 삭제, 조회 가능
  - 고객 데이터 수정 구현 예정
  - 비동기 통신 사용해 고객리스트를 화면에 출력
  - 필터 기능 이용해 고객을 검색한 결과를 화면에 출력
  - 고객 추가 및 삭제 후 stateRefresh() 함수 선언 및 사용을 통해 고객리스트 조회목록 부분만을 새로고침
  
 2. Material UI 템플릿 사용
  - 모달창 구현
  - progress bar 구현
  - app bar 구현
 
 3. package.json
  - 포트번호가 5000인 express 서버와 통신하기 위해 proxy 설정
  
  
< Backend 구현기능 >

 1. Oracle DB와 express 서버 연동
  - dbConfig.js 파일을 통해 연결할 Oracle DB의 정보 저장
  - server.js 파일에서 express 서버를 사용해 Oracle DB와 연결
  - express 서버에서 REST API를 사용해 DB와 통신하여 select, insert, delete 작업 수행
  - App.js로 데이터 전송

 2. 이미지 파일 업로드
 - multer 라이브러리 사용 : 업로드되는 이미지 파일의 이름이 중복되지 않게 랜덤으로 생성되어 파일 저장
 - upload 폴더 안에 이미지 파일 저장
 
 3. package.json
 - client(frontend)와 server(backend) 동시 구동을 위한 코드 작성 : "dev"
 
 
< .gitignore 파일 >
 - 용량이 큰 database, node_modules, 이미지 파일을 담은 upload 폴더 등은 깃에 업로드되지 않도록 설정
