import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import TargetBin from './TargetBin';
import Box from './Box';
import update from 'react/lib/update';

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetbins: [
        { accepts: [ItemTypes.BOX], lastDroppedItem: null },
      ],
      boxes: [
        { name: 's', type: ItemTypes.BOX, origin: '' },
        { name: 'a', type: ItemTypes.BOX, },
        { name: 't', type: ItemTypes.BOX,},
        { name: 'i', type: ItemTypes.BOX,},
        { name: 'p', type: ItemTypes.BOX,},
        { name: 'n', type: ItemTypes.BOX,}
      ],
      droppedBoxNames: []
    };
  }
  render() {
    const { targetbins, boxes } = this.state;
    return (
      <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {targetbins.map(({ accepts, lastDroppedItem }, index) =>
            <TargetBin accepts={accepts}
                     lastDroppedItem={lastDroppedItem}
                     onDrop={(item) => this.handleDrop(index, item)}
                     key={index} />
          )}
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {boxes.map(({ name, type }, index) =>
            <Box name={name}
                 type={type}
                 isDropped={this.isDropped.bind(this, name)}
                 key={index} />
          )}
        </div>
        {this.props.children}
      </div>
    );
  }
  handleDrop(index, item) {
    console.log('I received ', item);
    // this.setState(update(this.state, {
    //
    // }));
  }
  isDropped(name) {
    console.log('I was dropped', name);
  }
}
