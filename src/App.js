import React, { Component } from 'react';
import Customer from './components/Customer'
import "./App.css";
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  }
})

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
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>

        <h2>Management System</h2>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            // 반복문 처리하기 위해 map 사용
            customers.map(c => {
              return (
                <Customer
                  key={c.id}  // 구분할 수 있는 고유값
                  id={c.id}
                  img={c.image}
                  name={c.name}
                  birth={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
              );
            })
            }
          </TableBody>
        </Table>
        
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

// 웹사이트 내용의 화면출력 담당