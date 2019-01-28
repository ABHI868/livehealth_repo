
import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import axios from "axios";

const FormItem = Form.Item;


class CustomForm extends React.Component {
  
  handleFormSubmit = async (event, requestType,noteId) => {
    event.preventDefault();

    const postObj = {
      username: event.target.elements.username.value,
      firstname: event.target.elements.firstname.value,
      Note_title: event.target.elements.Note_title.value,
      Note_Description: event.target.elements.Note_Description.value,
      Receiver: event.target.elements.Receiver.value
      


    }
  
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
     axios.defaults.headers ={
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.props.token}`,
    };
    
    // body_params={username:'Abhishek',password:'@admin123'}
    // console.log(this.props.token)
    if (requestType === "post") {
      await axios.post("http://127.0.0.1:8000/api/add/"
      // ,{ "auth": {  username: 'Abhishek', password: '@admin123'} }
        ,postObj)
        .then(res => {
          if (res.status === 201) {
            this.props.history.push(`/`);
          }
        })
    } else if (requestType === "put") {
      await axios.put(`http://127.0.0.1:8000/api/${noteId}/update/`, postObj)
        .then(res => {
          if (res.status === 200) {
            this.props.history.push(`/`);
          }
        })
    }
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={event =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.noteId
            )
          }
        >
          <FormItem label="username">
            <Input name="username" placeholder="Enter username here" />
          </FormItem>
          <FormItem label="firstname">
            <Input name="firstname" placeholder="Enter firstname" />
          </FormItem>
          <FormItem label="Note_title">
            <Input name="Note_title" placeholder="Enter note title ..." />
          </FormItem>
          <FormItem label="Note_Description">
            <Input name="Note_Description" placeholder="Enter note ..." />
          </FormItem>
          <FormItem label="Receiver">
            <Input name="Receiver" placeholder="Enter name of the receiver " />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(CustomForm);