export const markComplaint = (markData) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const complaint = getState().firestore.data.complaints[markData.comId];
        firestore.collection('complaints').doc(markData.comId).set({
            ...complaint,
            markedBy: profile.firstName + ' ' + profile.lastName,
            markedOn: new Date(),
            reason: markData.reason,
            status: markData.status,
            markedByDesignation: markData.markedByDesignation
        }).then(()=>{
            dispatch({
                type: 'UPDATE_COMPLAINT_SUCCESS',
            });
        }).catch((err) => {
            dispatch({
                type: 'UPDATE_COMPLAINT_ERROR',
                err
            });
        })
    }
};