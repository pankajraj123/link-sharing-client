import {FETCH_TOPIC_DISCRIPTIONS} from '../types/resourceTopicType'

const  initialState={
    topicData:[],
}
const resourceReducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_TOPIC_DISCRIPTIONS:
        return {
            ...state,
           topicData: action.payload
        }
        default:
            return state;
    }
}

export default resourceReducer;
