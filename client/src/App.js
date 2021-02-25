import React, { Component } from 'react';
import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd';
import "./App.css";
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  // 고객리스트 조회목록 부분만을 새로고침
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }
  

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);    // progress 함수가 20초 간격으로 수행되도록 설정
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');       // 해당 주소에 접속
    const body = await response.json();                   // 서버에서 수행된 결과값을 json 형태로 받아옴
    console.log(body);
    return body;                                          // 결과값 반환 (body가 상위 코드의 res로 반환된다)
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed+1});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
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
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
              {/* 반복문 처리하기 위해 map 사용 */}
              {this.state.customers ? this.state.customers.map(c => {
                return (
                  <Customer
                    stateRefresh={this.stateRefresh}
                    key={c.ID}  // 구분할 수 있는 고유값
                    id={c.ID}
                    img={c.IMAGE}
                    name={c.NAME}
                    birth={c.BIRTHDAY}
                    gender={c.GENDER}
                    job={c.JOB}
                  />
                );
              }) : 
              <TableRow>
                <TableCell colspan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
              }
          </TableBody>
        </Table>
      </Paper>
      
      <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

export default withStyles(styles)(App);

// 웹사이트 내용의 화면출력 담당