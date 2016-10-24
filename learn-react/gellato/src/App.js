import React, { Component } from 'react';
import Canvas from './Canvas';
import Rectangle from './Rectangle';
import Text from './Text';
import { Row } from 'react-foundation';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="grid-basics-example">
				<Row className="display">
					<Canvas fontSize="13" upperCase={true} padding={2}>
						<Rectangle />
						<Rectangle width={50} height={50} fill="blue" left={200} top={200} />
						<Text value="Jimmy Ganteng" />
						<Text left={100} top={100} />
	      	</Canvas>
				</Row>
      </div>
    );
  }
}

export default App;
