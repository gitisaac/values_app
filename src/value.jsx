import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 2px;
  background-color: ${props => (props.isDragging ? 'mediumaquamarine' : 'white')};
`;

export default class Value extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.value.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.value.content}
          </Container>
        )}

      </Draggable>
    );
  }
}
