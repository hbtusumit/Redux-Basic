const redux =require('redux');
const createStore =redux.createStore;
const combineReducers =redux.combineReducers;
const applyMiddleware=redux.applyMiddleware;
// const intialState={
//     numberOfBook:10,
//     numberOfPen:20
// }

const booksIntialState={
    numberOfBook:10
}

const pensIntialState={
    numberOfPen:20
}


function buyBook(){
    return{
        type:"Buy_Book",
        payload:"My first Action"
    }
}

function buyPen(){
    return{
        type:"Buy_Pen",
        payload:"My second Action"
    }
}


// const Reducer =(state=intialState,action)=>{
//     console.log(action,'action');
//     switch(action.type){
//         case 'Buy_Book': return {
//             ...state,
//             numberOfBook:state.numberOfBook-1
//         }
//         case 'Buy_Pen': return {
//             ...state,
//             numberOfPen:state.numberOfPen-2
//         }

//         default: return state ;
//     }

// }

const booksReducer =(state=booksIntialState,action)=>{
    console.log(action,'action');
    switch(action.type){
        case 'Buy_Book': return {
            ...state,
            numberOfBook:state.numberOfBook-1
        }

        default: return state ;
    }
}

    const pensReducer =(state=pensIntialState,action)=>{
        console.log(action,'action');
        switch(action.type){
            case 'Buy_Pen': return {
                ...state,
                numberOfPen:state.numberOfPen-2
            }
    
            default: return state ;
        }
    }
    
// Middleware function to seeing log

const logger=store=>{

    return next=>{

        return action=>{
            const result=next(action);
            console.log("Middleware Log",result);
            return result;
        }

    }
}

// Combine Reducer

const reducer=combineReducers({
    Book:booksReducer,
    Pen:pensReducer
});

//const store=createStore(Reducer);
const store=createStore(reducer,applyMiddleware(logger));

console.log("Intial State Value",store.getState());
const unsubscribe=store.subscribe(()=>{console.log("Updated State Value",store.getState())})
store.dispatch(buyBook())
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyPen())
store.dispatch(buyPen());
store.dispatch(buyPen());
unsubscribe();
