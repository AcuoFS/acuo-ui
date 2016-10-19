import React from 'react'

import styles from '../table.css'

class Section extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open: false,
      class: styles.sectionClose
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: styles.sectionClose
      })
    }else{
      this.setState({
        open: true,
        class: styles.sectionOpen
      });
    }
  }
  render() {
    console.log(this.state.open)
    return (
      <div className={this.state.class}>
      <button onClick={this.handleClick}>toggle</button>
      <div className={styles.sectionhead} onClick={this.handleClick}>{this.props.title}</div>
      <div className={styles.articlewrap}>
      <div className={styles.article}>
      {this.props.children}
      </div>
      </div>
      </div>
    );
  }
};

export default Section
