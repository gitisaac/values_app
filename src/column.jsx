import React from 'react';
import styled from 'styled-components';
import Value from './value';
import { Droppable } from 'react-beautiful-dnd';


const Container = styled.div`
  margin: 12px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 2200px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 10px;
`;
const ValueList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightslategrey' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <ValueList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.values.map((value, index) => (
                <Value key={value.id} value={value} index={index} />
              ))}
              {provided.placeholder}
            </ValueList>
          )}
        </Droppable>
      </Container>
    );
  }
}
