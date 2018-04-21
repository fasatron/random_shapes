import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import random from 'lodash/random';

import { addShape, removeShape } from '../../actions/shapes';

import {
  SHAPE_TYPES,
  SQUARE_SIZES,
  CIRCLE_SIZES,
  TRIANGLE_SIZES
} from '../../constants';

class App extends Component {
  handleClick = e => {
    if (e.target.classList.contains('shape')) return this.handleRemoveShape(e);

    this.handleAddShape(e);
  };

  handleAddShape = e => {
    const { onAddShape } = this.props;

    const coords = {
      x: e.clientX,
      y: e.clientY
    };

    const style = this.getShapeStyle(coords);
    const shape = { style };

    onAddShape(shape);
  };

  handleRemoveShape = e => {
    const { onRemoveShape, shapes } = this.props;

    const shape = shapes.find(
      (shape, index) => index === ~~e.target.dataset.index
    );

    onRemoveShape(shape);
  };

  get randomShapeType() {
    const values = Object.values(SHAPE_TYPES);

    return values[random(0, values.length - 1)];
  }

  get randomSquareSize() {
    return random(SQUARE_SIZES.MIN_SIZE, SQUARE_SIZES.MAX_SIZE);
  }

  get randomCircleSize() {
    return random(CIRCLE_SIZES.MIN_SIZE, CIRCLE_SIZES.MAX_SIZE);
  }

  get randomTriangleSize() {
    return random(TRIANGLE_SIZES.MIN_SIZE, TRIANGLE_SIZES.MAX_SIZE);
  }

  get randomShapeColor() {
    const r = random(0, 255);
    const g = random(0, 255);
    const b = random(0, 255);

    return [r, g, b];
  }

  getShapeStyle(coords) {
    const shapeType = this.randomShapeType;
    const backgroundColor = `rgb(${this.randomShapeColor})`;
    let size;

    switch (shapeType) {
      case SHAPE_TYPES.CIRCLE:
        size = this.randomCircleSize;

        return {
          left: `${coords.x - size / 2}px`,
          top: `${coords.y - size / 2}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor
        };

      case SHAPE_TYPES.TRIANGLE:
        size = this.randomTriangleSize;

        return {
          left: `${coords.x - size / 2}px`,
          top: `${coords.y - Math.sqrt(3) / 3 * size}px`,
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${backgroundColor}`
        };

      case SHAPE_TYPES.SQUARE:
        size = this.randomSquareSize;

        return {
          left: `${coords.x - size / 2}px`,
          top: `${coords.y - size / 2}px`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor
        };

      default:
        return null;
    }
  }

  render() {
    const { shapes } = this.props;

    return (
      <div className="container" onClick={this.handleClick}>
        {shapes.map((shape, index) => (
          <div
            key={index}
            style={shape.style}
            data-index={index}
            className="shape"
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shapes: state.shapes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddShape: bindActionCreators(addShape, dispatch),
    onRemoveShape: bindActionCreators(removeShape, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
