
import * as actiontype from "./actionTypes.js"


import axios from 'axios';



export const auth_Start=(()=>
    {
        return{ type:actiontype.AUTH_START}
    })


export const auth_Success=(token=>{
    return {
        type:actiontype.AUTH_SUCCESS,

        token:token,
    }
})

export const authFail=(error =>{

    return {type:actiontype.AUTH_FAIL, error:error}

})



export const logout=() =>{
        localStorage.removeItem('user');
        localStorage.removeItem('expirationdate');
        return {
            type: actiontype.AUTH_LOGOUT    
        }
}


export const checkAuthTimeOut= expirationTime =>{
        return dispatch => { 
            setTimeout(()=> {
            dispatch(logout());
            }, expirationTime * 1000)
    }
}

export  const authLogin =(username,password)=> {
    return dispatch => {
        dispatch(auth_Start());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
                // username:username,
                // password:password
            // 
            
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
            
            })
        })
        .then(res => {
                this.localStorage.setItem('id_token',res.token) // Setting the token in localStorage
                console.log(res.token)
                return Promise.resolve(res);
        })}}
            // const token=res.data.key;
            // console.log(token)
            // const expirationdate=new Date(new Date().getTime()+3600*1000);
            // localStorage.setItem('token',token);
            // localStorage.setItem('expirationdate',expirationdate);
            // dispatch(auth_Success(token));
            //     let data = JSON.stringify({
            //     password: this.state.password,
            //     username: this.state.email
            // })
//             dispatch(checkAuthTimeOut(3600));
//             localStorage.setItem('token',data)})
//         .catch(err =>
//             {dispatch(authFail(err))})
        

    
// }}


export  const authSignup =(username,email,password1,password2)=> {
    return dispatch => {
        dispatch(auth_Start());
        axios.post('http://127.0.0.0:8000/registration', {
            username:username,
            email:email,
            password1:password1,
            password2:password2  
        }).then(res => {
            const token=res.data.key;
            const expirationdate=new Date(new Date().getTime()+3600*1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationdate',expirationdate);
            dispatch(auth_Success(token));
            dispatch(checkAuthTimeOut(3600));   
        })
        .catch(err =>
            {dispatch(authFail(err))})

    }
}

export const authCheckState=()=>
    {
        return dispatch=>{
            const token=localStorage.getItem('token')
            if (token===undefined){
                dispatch(logout());
            }
            else{
                const expirationdate=new Date(localStorage.getItem('expirationdate'))
                if (expirationdate <= new Date())
                {
                    dispatch(logout());
                }
                else{
                    dispatch(auth_Success(token))
                    dispatch(checkAuthTimeOut((expirationdate.getTime()-new Date().getTime())/1000));
                }
            }
        }
    }

