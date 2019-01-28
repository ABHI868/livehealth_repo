
import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import { Button,Card } from 'antd';
import CustomForm from "../components/forms";
class Notedetail extends React.Component{
   
    state={
        Note: {}
    }
    componentDidMount(){
        const noteId=this.props.match.params.noteId;
                        axios.get(`http://127.0.0.1:8000/api-auth/list/${noteId}`)
                        .then(res => {
                            this.setState({
                                Note: res.data });
                            });
                    }



        handleDelete = event => {
            event.preventDefault();
            const noteId = this.props.match.params.noteId;
            axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
            };
            axios.delete(`http://127.0.0.1:8000/api/${noteId}/delete/`)
            .then(res => {
            if (res.status === 204) {
                this.props.history.push(`/`);
            }
            })
        };

    render() {
        return (
        <div>
            <Card title={this.state.Note.title}>
            <p> {this.state.Note.note_description} </p>
            </Card>
            <CustomForm
            {...this.props}
            token={this.props.token}
            requestType="put"
            noteId={this.props.match.params.noteId}
            btnText="Update"
            />
            <form onSubmit={this.handleDelete}>
            <Button type="danger" htmlType="submit">
                Delete
            </Button>
            </form>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
token: state.token
};
};

export default connect(mapStateToProps)(Notedetail);

//     render(){
//             return (
//                 <Card title={this.state.Note.title}>
//                     <p>{this.state.Note.note_description}</p>
//                 </Card>
//             )
//         }
// }

// export default Notedetail;