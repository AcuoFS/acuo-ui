import React from 'react'
import ReactDOM from 'react-dom'

require('./table.css')

class Section extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open: false,
      class: "section"
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: "section"
      })
    }else{
      this.setState({
        open: true,
        class: "section open"
      });
    }
  }
  render() {
    console.log(this.state.open)
    return (
      <div className={this.state.class}>
      <button onClick={this.handleClick}>toggle</button>
      <div className="sectionhead" onClick={this.handleClick}>{this.props.title}</div>
      <div className="articlewrap">
      <div className="article">
      {this.props.children}
      </div>
      </div>
      </div>
    );
  }
};

class Table extends React.Component{
  render() {
    return (
      <div className="main">
      <div className="title">{this.props.title}</div>
      <Section title="Section Title One">   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nemo harum voluptas aliquid rem possimus nostrum excepturi!
      </Section>
      <Section title="Section Title Two">   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nemo harum voluptas aliquid rem possimus nostrum excepturi!
      </Section>
      <Section title="Section Title Three">   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nemo harum voluptas aliquid rem possimus nostrum excepturi!
      </Section>
      </div>
    );
  }
}

export default Table
