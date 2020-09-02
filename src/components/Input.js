import React from 'react';
import { TextField,Paper,Dialog,DialogContent,DialogContentText,DialogTitle,Snackbar} from '@material-ui/core';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CAlert from './modal/Customalert';




class Input extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      title: "",
      content: "",
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      modalOpen: false,
    }
  }

  saveTodoList() {
    /*
    const nowList = this.state.todoList;
    const {title, content, startDate, startTime, endDate, endTime} = this.state;
    nowList.push({
      title, content, startDate, startTime,endDate, endTime
    });
    this.setState({
      todoList: nowList,
      title: "",
      content: "",
      startDate:null,
      startTime: null,
      endDate: null,
      endTime:null
    }, ()=> console.log(this.state))
    */
  }

  checkValidate() {
    const {
      title, content, startDate,startTime,endDate,endTime
    } = this.state;
    if(!title || !content || !startDate || !startTime || !endDate || !endTime) {
      return false;
    }
    return true;
  }

  addInputData() {
    const data = this.state;
    if(this.checkValidate()){
      this.props.addTodoList(data);
      this.setState({
        title: "",
        content: "",
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null
      });
    } else{
      this.setState({
        modalOpen: true
      });
    }
  }


  modalClose() {
    this.setState({
      modalOpen: false
    });
  }


  render(){
    const {title, content, startDate,startTime,endDate,endTime,modalOpen} = this.state;
    return (
        <Paper className="input-area" variant="outlined"style={{padding: '10px'}} >
          <TextField value={title} onChange={(value)=> this.setState({title : value.currentTarget.value})} label="제목" size="medium" margin="none" fullWidth required message="제목을 입력해주세요"/>
          <TextField value={content} onChange={(value)=> this.setState({content : value.currentTarget.value})} label="상세내용" size="medium" margin="none" fullWidth multiline/>
          <KeyboardDatePicker 
            disableToolbar
            variant="inline"
            format="yyyy/MM/DD"
            margin="normal"
            label="시작 예정일"
            value = {startDate}
            onChange={(value)=> this.setState({startDate : value._d})}
            style={{width: '50%'}}
            KeyboardButtonProps={{ 'aria-label' : 'change date',}}
          />
          <KeyboardTimePicker 
            margin="normal"
            label="시작시간"
            variant="inline"
            value={startTime}
            onChange={(value)=> this.setState({startTime : value._d})}
            style={{width: '50%'}}
            KeyboardButtonProps={{
              'aria-label' : 'change time',
            }}
          />
          <KeyboardDatePicker 
            disableToolbar
            variant="inline"
            format="yyyy/MM/DD"
            margin="normal"
            label="종료 예정일"
            value = {endDate}
            onChange={(value)=> this.setState({endDate : value._d})}
            style={{width: '50%'}}
            KeyboardButtonProps={{ 'aria-label' : 'change date',}}
          />
          <KeyboardTimePicker 
            margin="normal"
            label="종료시간"
            variant="inline"
            value={endTime}
            onChange={(value)=> this.setState({endTime : value._d})}
            style={{width: '50%'}}
            KeyboardButtonProps={{
              'aria-label' : 'change time',
            }}
          />
          <Button variant="contained" color="primary" style={{float: 'right'}} onClick={this.addInputData.bind(this)}>
            <SaveIcon></SaveIcon> 저장
          </Button> 
          <CAlert modalClose={this.modalClose.bind(this)} modalOpen={modalOpen} message="에러입니다" />
        </Paper>
    );
  }
}

export default Input;