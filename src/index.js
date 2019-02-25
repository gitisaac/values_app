import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial_data';
import Column from './column';

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const {destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newValueIds = Array.from(start.valueIds);
      newValueIds.splice(source.index, 1);
      newValueIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        valueIds: newValueIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    // moving from one list to another
    const startValueIds = Array.from(start.valueIds);
    startValueIds.splice(source.index, 1);
    const newStart = {
      ...start,
      valueIds: startValueIds,
    };

    const finishValueIds = Array.from(finish.valueIds);
    finishValueIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      valueIds: finishValueIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDrageUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const values = column.valueIds.map(valueId => this.state.values[valueId]);

            return <Column key={column.id} column={column} values={values} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
