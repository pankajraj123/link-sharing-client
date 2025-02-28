import {FETCH_TOPIC_DESCRIPTIONS} from '../types/resourceTopicType'

const  initialState={
    topicData:[],
}
const resourceReducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_TOPIC_DESCRIPTIONS:
        return {
            ...state,
           topicData: action.payload
        }
        default:
            return state;
    }
}

export default resourceReducer;

