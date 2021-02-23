import React, { Component } from 'react';
import Customer from './components/Customer'
import "./App.css";

const customers = [
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
]

class App extends Component {
  render() {
    return (
      <div>
        {
          // 반복문 처리하기 위해 map 사용
          customers.map(c => {
            return (
              <Customer
                key={c.id}  // 구분할 수 있는 고유값
                id={c.id}
                image={c.image}
                name={c.name}
                birth={c.birthday}
                gender={c.gender}
                job={c.job}
              />
              );
          })
        }
      </div>
    );
  }
}

export default App;

// 웹사이트 내용의 화면출력 담당