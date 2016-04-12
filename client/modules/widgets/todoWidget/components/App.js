import React from 'react';
import _ from 'lodash';

import Paper from 'material-ui/lib/paper';

import Header from './Header';
import Body from './Body';
// import './app.css';
// import './placeholder.css';

import {addTask, removeTask, toggleTask,
  updateTask, toggleAll, clearCompleted} from '../actions/actions';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const {data} = props;
    this.state = {
      todos: canSetStateFromProps(data) ?
        data.todos :
        []
    };
  }

  getActions() {
    return {
      addTask: addTask.bind(this),
      removeTask: removeTask.bind(this),
      toggleTask: toggleTask.bind(this),
      updateTask: updateTask.bind(this),
      toggleAll: toggleAll.bind(this),
      clearCompleted: clearCompleted.bind(this),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    if (canSetStateFromProps(data)) {
      this.setState({todos: data.todos});
    }
  }

  updateState(todos) {
    const {widgetId, update} = this.props;

    this.setState({todos});
    update(widgetId, {todos});
  }

  render() {
    const style = {
      position: 'relative',
      boxSizing: 'border-box',
      width: '100%',
    };
    const {todos} = this.state;
    const actions = this.getActions();
    return (
      <Paper className='todoapp' style={style}>
        <Header addTask={actions.addTask} />
        <Body todos={todos} actions={actions} />
      </Paper>
    );
  }
}

function canSetStateFromProps(data) {
  const hasData = data;
  const hasTodos = hasData && _.has(data, 'todos');
  return hasTodos;
}
