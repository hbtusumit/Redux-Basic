const { default: Axios } = require('axios');
const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
var ReduxThunk = require('redux-thunk').default

const intialState={
    loading:false,
    users:[],
    error:''
}

// Define Action

const USER_REQUEST = 'USER_REQUEST';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_ERROR = 'USER_ERROR';

// Create Action 

const userRequest = ()=>{
    return {
        type:USER_REQUEST
    }
}

const userSuccess = (users)=>{
    return {
        type:USER_SUCCESS,
        payload:users
    }
}

const userError = (error)=>{
    return {
        type:USER_ERROR,
        payload:error
    }
}


// Create Reducer

const reducer =(state=intialState,action)=>{
    console.log(action,'action');
    switch(action.type){
        case 'USER_REQUEST': return {
            ...state,
            loading:true
        }

        case 'USER_SUCCESS': return {
            loading:false,
            users:action.payload,
            error:''
        }

        case 'USER_ERROR': return {
            loading:false,
            users:[],
            error:action.payload
        }

        default: return state ;
    }

}

const fetchUser=()=>{
    return function(dispatch){
        dispatch(userRequest())
        Axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
          const users=response.data.map(user=>user.name)
          dispatch(userSuccess(users))
        })
        .catch(error=>{
            dispatch(userError(error.message))
        })
    }

}

const store=createStore(reducer,applyMiddleware(ReduxThunk));
store.subscribe(()=>{console.log(store.getState())});
store.dispatch(fetchUser());
