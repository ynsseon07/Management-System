const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// 기본 express 폼

// REST API 생성하는 부분
app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '성춘향',
            'birthday': '980520',
            'gender': '여자',
            'job': '대학생'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '홍길동',
            'birthday': '920105',
            'gender': '남자',
            'job': '대학원생'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '이몽룡',
            'birthday': '941210',
            'gender': '남자',
            'job': '직장인'
        }
    ]);
})

// 기본 express 폼
app.listen(port, () => console.log(`Listening on port ${port}`));