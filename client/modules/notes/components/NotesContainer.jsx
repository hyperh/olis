import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import NotesHeader from './NotesHeader.jsx';
import { Widgets } from '/client/modules/widgets';
import Widget from '/client/modules/widgets/widget/components/Widget.jsx';

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.scrollToBottom = () => {
      const ele = $(this._container);
      const scrollHeight = ele[0].scrollHeight;
      ele.animate({ scrollTop: scrollHeight }, 500);
    };
  }

  componentDidUpdate(prevProps) {
    const numWidgetsOld = prevProps.widgets.length;
    const numWidgetsNew = this.props.widgets.length;
    if (numWidgetsNew - numWidgetsOld === 1) {
      this.scrollToBottom();
    }
  }

  renderWidgets() {
    const {
      userId, note, widgets, locks,
      removeWidget, moveWidget, updateWidget, requestAndReleaseOtherLocks, releaseLock
    } = this.props;

    const DraggableWidget = Widgets['draggable'];

    return widgets.map((widget, index) => {
      const {data, _id, noteId, type} = widget;

      const lock = locks[_id];
      return (
        <DraggableWidget
          key={_id}
          index={index}
          noteId={note._id}
          widgetId={_id}
          moveWidget={moveWidget}
        >
          <Widget
            data={data}
            type={type}
            widgetId={_id}
            noteId={noteId}
            remove={removeWidget}
            update={updateWidget}
            userId={userId}
            lock={lock}
            requestAndReleaseOtherLocks={requestAndReleaseOtherLocks}
            releaseLock={releaseLock}
          />
        </DraggableWidget>
      );
    });
  }

  // _getContainerEle() {
  //   const gm = $('#notes-data-wrapper .gm-scrollbar-container');
  //   return gm.length > 0 ? $('#notes-data-wrapper .gm-scroll-view') : $(this._container);
  // }

  render() {
    const { note, addWidget } = this.props;
    return (
      <div id="notes-container">
        <NotesHeader noteId={note._id} updatedAt={note.updatedAt} addWidget={addWidget} />
        <div className="notes-data-wrapper" ref={x => this._container = x}>
          {this.renderWidgets()}
        </div>
      </div>
    );
  }
}
NotesContainer.defaultProps = {
  widgets: []
};

export default DragDropContext(HTML5Backend)(NotesContainer);
