// 기본 express 폼
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// oracle 데이터베이스 설정
const oracledb = require('oracledb');
const dbConfig = require('./dbConfig.js');

oracledb.autoCommit = true;

// REST API 생성하는 부분
// 고객 리스트를 조회 ( SELECT )
app.get('/api/customers', (req, res) => {

    // oracle DB와 연결
    oracledb.getConnection({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString
    },
    function(err, connection) {
        if(err) {
            console.error(err.message);
            return;
        }

        let query = 'select * from customers where isDeleted = 0';

        // connection이 성공할시에 query문을 수행하여 result에 JSON 객체를 받아옴
        connection.execute(query, {}, {outFormat:oracledb.OBJECT}, (err, result) => {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('success');

            // /api/customers 입력시 App.js에 데이터 전송
            res.send(result.rows);
            doRelease(connection, result.rows);
        });
    });

    // connection 해제
    function doRelease(connection, rowList) {
        connection.release((err) => {
            if(err) {
                console.error(err.message);
            }
        });
    }
});


// 고객 정보 추가 ( INSERT )
// multer 라이브러리로 인해 업로드되는 파일의 이름이 중복되지 않게 랜덤으로 생성되어 저장
const multer = require('multer');
const upload = multer({dest: './upload'});

// 이미지 파일 업로드
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res) => {
    let query = 'insert into customers values (seq.nextval, :image, :name, :birthday, :gender, :job, sysdate, 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];

    // oracle DB와 연결
    oracledb.getConnection({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString
    },
    function(err, connection) {
        if(err) {
            console.error(err.message);
            return;
        }

        connection.execute(query, params, (err, result) => {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('success');

            res.send(result.rows);
            doRelease(connection, result.rows);
        });
    });

    // connection 해제
    function doRelease(connection, rowList) {
        connection.release((err) => {
            if(err) {
                console.error(err.message);
            }
        });
    }
})


// 고객 삭제 ( DELETE )
app.delete('/api/customers/:id', (req, res) => {
    let query = 'update customers set isDeleted = 1 where id = :id';
    let params = [req.params.id];

    // oracle DB와 연결
    oracledb.getConnection({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString
    },
    function(err, connection) {
        if(err) {
            console.error(err.message);
            return;
        }

        connection.execute(query, params, (err, result) => {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('success');

            res.send(result.rows);
            doRelease(connection, result.rows);
        });
    });

    // connection 해제
    function doRelease(connection, rowList) {
        connection.release((err) => {
            if(err) {
                console.error(err.message);
            }
        });
    }
})

// 기본 express 폼
app.listen(port, () => console.log(`Listening on port ${port}`));