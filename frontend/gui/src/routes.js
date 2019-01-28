

import React from "react";

import { Route } from 'react-router-dom';
import Notelist from "./containers/NotelistView";
import Notedetail from "./containers/NotedetailView";

import Login from "./containers/Login";
import Signup from "./containers/Signup"

    const BaseRouter = () => (
    <div>
        
        <Route exact path='/list' component={Notelist} />{" "}
        <Route exact path='/:noteId' component={Notedetail} />{" "}
        <Route exact path='/login' component={Login} />{" "}
        <Route exact path="/signup/" component={Signup} />{" "}
    </div>
    
        
    );

export default BaseRouter;