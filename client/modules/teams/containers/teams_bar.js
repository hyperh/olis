import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import TeamsBar from '../components/teams_bar.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addTeam: actions.teams.add,
  selectTeam: actions.teams.select,
  teamId: context.LocalState.get('teamId')
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('teams.list').ready()) {
    const teams = Collections.Teams.find().fetch();
    onData(null, {teams});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TeamsBar);
