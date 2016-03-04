import {Convos, Notes} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  const NOTES_SINGLE = 'notes.single';
  Meteor.publish(NOTES_SINGLE, function ({convoId}) {
    check(arguments[0], {
      convoId: String
    });

    if (!this.userId) {
      throw new Meteor.Error(NOTES_SINGLE, 'Must be logged in to get note.');
    }
    const convo = Convos.findOne(convoId);
    if (!convo) {
      throw new Meteor.Error(NOTES_SINGLE, 'Must get a note from an existing convo.');
    }
    if (!convo.isUserInConvo(this.userId)) {
      throw new Meteor.Error(NOTES_SINGLE, 'Must be a member of convo to get the convo\'s note.');
    }

    return Notes.find({convoId});
  });
}
