export const addComplaint = (complaint) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const complaintFrom = getState().firebase.auth.uid;

        firestore.collection('complaints').add({
            ...complaint,
            complaintFromFirstName: profile.firstName,
            complaintFromLastName: profile.lastName,
            complaintFromId: complaintFrom,
            createdAt: new Date()
        }).then(()=>{
            dispatch({
                type: 'ADD_COMPLAINT_SUCCESS',
            });
        }).catch((err) => {
            dispatch({
                type: 'ADD_COMPLAINT_ERROR',
                err
            });
        })
    }
};