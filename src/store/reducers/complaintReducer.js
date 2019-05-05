const initState = {}

const complaintReducer = (state = initState, action) => {
    switch (action.type){
        case 'ADD_COMPLAINT_SUCCESS':
            console.log("COMPLAINT CREATED!", action.complaint);
            break;
        case 'ADD_COMPLAINT_ERROR':
            console.log("COMPLAINT FAILED!", action.err);
            break;
        case 'UPDATE_COMPLAINT_SUCCESS':
            console.log("COMPLAINT STATUS CHANGE SUCCESSFUL!", action.err);
            break;
        case 'UPDATE_COMPLAINT_ERROR':
            console.log("COMPLAINT STATUS FAILED!", action.err);
            break;
        default:
            break;
    }
    return state;
}

export default complaintReducer;