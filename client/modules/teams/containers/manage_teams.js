import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import ManageTeams from '../components/ManageTeams.jsx';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  selectTeamAndGo: actions.teams['manageTeams.selectAndGo'],
  goToChat: actions.msgs.goToChat
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  let teams = [];
  let teamConvos = {};
  let invites = [];

  const userId = Meteor.userId();
  if (Meteor.subscribe('teams.list').ready()) {
    teams = Collections.Teams.find({userIds: userId}).fetch();
    invites = Collections.Invites.find({userId}).fetch();

    const teamIds = teams.map(team => team._id);
    if (Meteor.subscribe('convos.list.multi', {teamIds}).ready()) {
      const convos = Collections.Convos.find({teamId: {$in: teamIds}}).fetch();
      teamConvos = R.groupBy(R.prop('teamId'), convos);
    }
  }
  onData(null, {teams, teamConvos, invites});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ManageTeams);
