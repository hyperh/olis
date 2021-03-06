import React from 'react';
import ChatIcon from 'material-ui/lib/svg-icons/action/question-answer';

import RaisedButton from 'material-ui/lib/raised-button';
import NewConvoDialog from '/client/modules/convos/components/NewConvoDialog.jsx';

export default function NoConvoSelected(props) {
  const colors = {
    foreground: '#999',
    background: '#EEE',
  };
  const styles = {
    container: {
      height: '100%',
      width: 'calc(78% - 80px)',
      minWidth: 'calc(100% - 400px)',
      maxWidth: 'calc(100% - 260px)',
      position: 'relative',
      backgroundColor: colors.background,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: colors.foreground,
    },
    icon: {
      height: '128px',
      width: '128px',
      display: 'block',
      margin: 'auto',
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <ChatIcon style={styles.icon} color={colors.foreground}/>
        <h1>Welcome to Olis!</h1>
        <p>Click the button to start a chat:</p>
        <div style={{marginBottom: '50px'}}>
          <RaisedButton
            label="Start a Chat"
            secondary={true}
            onClick={() => this._dialog.handleOpen()}
          />
        </div>
      </div>

      <NewConvoDialog ref={x => this._dialog = x} {...props} />
    </div>
  );
}
