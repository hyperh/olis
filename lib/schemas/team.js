import {Meteor} from 'meteor/meteor';
import {Astro} from 'meteor/jagi:astronomy';
import {Teams} from '../collections';
import R from 'ramda';
import {Roles} from 'meteor/alanning:roles';

const Team = Astro.Class({
  name: 'Team',
  collection: Teams,
  fields: {
    name: {
      type: 'string',
      default() { return 'Default Team'; }
    },
    userIds: {
      type: 'array',
      default() { return []; }
    },
    info: {
      type: 'string',
      default() { return 'Give your team members some information about what the team is about.'; }
    },
    shadowId: {
      type: 'string',
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  },
  methods: {
    isUserInTeam(input) {
      const userIds = input.constructor === Array ? input : [ input ];
      const uniqueIds = R.uniq(userIds);
      return R.intersection(uniqueIds, this.userIds).length === uniqueIds.length;
    },
    isUserAdmin(userId) {
      return Roles.userIsInRole(userId, 'admin', this._id);
    },
    isUserMember(userId) {
      return Roles.userIsInRole(userId, 'admin', this._id) ||
        Roles.userIsInRole(userId, 'member', this._id);
    },
    getRolesForUser(userId) {
      return Roles.getRolesForUser(userId, this._id);
    }
  }
});
// Meteor toys is basically the server, can see the server only fields too
// but if you do console log on client, won't see it.
if (Meteor.isServer) {
  Team.extend({
    fields: {
      serverOnly: {
        type: 'string',
        default() { return 'Only server guys can read this.'; }
      }
    }
  });
}
export default Team;
