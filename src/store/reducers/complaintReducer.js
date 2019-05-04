const initState = {}

const complaintReducer = (state = initState, action) => {
    switch (action.type){
        case 'ADD_COMPLAINT_SUCCESS':
            console.log("COMPLAINT CREATED!", action.complaint);
            break;
        case 'ADD_COMPLAINT_ERROR':
            console.log("COMPLAINT FAILED!", action.err);
            break;
        default:
            break;
    }
    return state;
}

export default complaintReducer;