const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

 const createNotification = ((notification) => {
    return admin.firestore().collection('notifications')
      .add(notification)
      .then(doc => console.log('notification added', doc));
  });


  exports.complaintCreated = functions.firestore
  .document('complaints/{complaintId}')
  .onCreate(doc => {

    const complaint = doc.data();
    const link = doc.id;
    var name = '';
    if(complaint.isAnnonymous){
      name = 'Annonymous';
    }else{
      name = complaint.complaintFromFirstName + ' ' + complaint.complaintFromLastName;
    }
    const notification = {
      content: 'added a new complaint',
      user: `${name}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
      userid: complaint.complaintFromId,
      against: complaint.department,
      link: link
    }

    return createNotification(notification);

});

exports.complaintUpdated = functions.firestore
.document('complaints/{complaintId}')
.onUpdate(change => {

  const complaint = change.after.data();
  const link = change.after.id;
  var name = '';
  if(complaint.isAnnonymous){
    name = 'Annonymous';
  }else{
    name = complaint.complaintFromFirstName + ' ' + complaint.complaintFromLastName;
  }
  var status = complaint.status === 0 ? 'Pending' :  complaint.status === 1 ? 'Resolved' : 'Rejected';
  const markedBy = complaint.markedBy;
  const msg = " complaint is now marked as " + status + " by " + markedBy + ", which was";
  const notification = {
    content: msg,
    user: `${name}`,
    time: admin.firestore.FieldValue.serverTimestamp(),
    userid: complaint.complaintFromId,
    against: complaint.department,
    link: link
  }

  return createNotification(notification);

});



exports.userJoined = functions.auth.user()
  .onCreate(user => { 
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'joined the complaint system',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotification(notification);

      });
});