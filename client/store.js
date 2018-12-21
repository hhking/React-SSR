import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { getToday } from './api';

const SWITCH_TITLE = 'SWITCH_TITLE';
const TODAY_DATA = 'TODAY_DATA';

export const switchTitle = (title) => ({
  type: SWITCH_TITLE,
  payload: {
    content: title,
  }
});

export const todayData = (data) => ({
  type: TODAY_DATA,
  payload: {
    content: data,
  }
});

export const getTodayData = () => dispatch => {
  return getToday().then(res => {
    // console.log(res);
    return dispatch(todayData(res))
  })
}

const titleReducer = (state = {}, action) => {
  switch (action.type) {
    case SWITCH_TITLE:
      return action.payload
      break;
    default:
      return state
      break;
  }
}

const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case TODAY_DATA:
      return action.payload
      break;
  
    default:
      return state
      break;
  }
}

const reducer = combineReducers({
  title: titleReducer,
  todayData: dataReducer,
});

export default store => createStore(reducer, store, applyMiddleware(thunkMiddleware));