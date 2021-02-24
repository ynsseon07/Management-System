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

        let query = 'select * from customers';

        // connection이 성공할시에 query문을 수행하여 result에 JSON 객체를 받아옴
        connection.execute(query, {}, {outFormat:oracledb.OBJECT}, (err, result) => {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('success');

            // /api/customers 입력시 App.js에 데이터 전송
            res.send(result.rows)
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

// 기본 express 폼
app.listen(port, () => console.log(`Listening on port ${port}`));