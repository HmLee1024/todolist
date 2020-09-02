import React from 'react';
import './App.css';
import { Typography,List, ListItem, ListItemText } from '@material-ui/core';
import moment from 'moment';
import Input from './components/Input'


class App extends React.Component {
  constructor(props){
    super(props);
    this.localStorage = window.localStorage;
    const getItem = localStorage.getItem('todolist_state');
    if(getItem){
      this.state = JSON.parse(getItem);
    }else {
      this.state = {
        todoList:[]
      }
    }
  }

  addTodoList(data) {
    const nowList = this.state.todoList;
    nowList.push(data);
    this.setState({
      todoList: nowList,
    }, ()=>{
      const stringState = JSON.stringify(this.state)
      this.localStorage.setItem("todolist_state",stringState);
      
    });
  }

  render(){
    const {todoList} = this.state;
    
    
    return (
      <div className="app">
        <div className="header">TODO LIST</div>
          <Input addTodoList = {this.addTodoList.bind(this)}/>
        <div className="list-area">리스트 영역
            <List>
              {todoList.map((todoItem, idx)=> {
                const{
                  title, content, startDate, startTime, endDate, endTime
                } = todoItem;

                if((typeof moment(startDate)) == "string"){
                  startDate = moment(startDate);
                  startTime = moment(startTime);
                  endDate = moment(endDate);
                  endTime = moment(endTime);
                }

                const checkToday = moment().isBetween(startDate,endDate);
                const checkF = (moment().diff(startDate)<0);
                const checkB = (moment().diff(endDate)>0);

                let fontColor = "black";
                if(checkToday) fontColor="blue";
                if(checkF) fontColor="grey";
                if(checkB) fontColor="red";

                console.log(moment().diff('2020-06-02'));

                return (
                  <ListItem key={idx} role={undefined} dense button>
                    <ListItemText
                      primary={title}
                      style={{color:fontColor}}
                      secondary={moment(startDate).format('yyyy-MM-DD')+' '+ moment(startTime).format('HH:MM')+' ~ '+moment(endDate).format('yyyy-MM-DD')+' '+moment(endTime).format('HH:MM')}
                    />
                  </ListItem>
                )
              })}
            </List>
        </div>
        <div>
          <Typography variant="body2" color="textSecondary" align="center" >
            {'Copyright @ Hyemin ' + new Date().getFullYear() + '.'}
          </Typography>
        </div>
      </div>
    );
  }
}

export default App;