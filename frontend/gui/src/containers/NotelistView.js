

import React from "react";
import axios from "axios";
import Note from "../components/Note";
import CustomForm from "../components/forms"

class Notelist extends React.Component{
    
   
    state={
        Notes: []
    };
    // x = localStorage.getItem('token')
    fetchArticles = () => {
        
        axios.get("http://127.0.0.1:8000/api/list/",{auth:{
            username:'Abhishek',
            password:'@admin123'
             }
        })
                            // localStorage.getItem('token'),
                            // "Content-Type": "application/json",
                            // Authorization: 'Bearer ' + this.props.token
                            // })
                             
                        
        .then(res => 
        this.setState({
            Notes: res.data
            
        }));
     }
    

    componentDidMount() {
        this.fetchArticles();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token) {
        this.fetchArticles();      
        }
    }

    render(){
            return (
                <div>
                <Note data={this.state.Notes}/>
                <br />
                <h1>Share a note</h1>
                <CustomForm requestType="post" noteId={null} btnText="Create" />
                </div>
                 
            )
        }
}

export default Notelist;