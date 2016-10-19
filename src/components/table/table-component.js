import React from 'react'
import Section from './table-subcomponent/table-subcomponent'
import styles from './table.css'

class Table extends React.Component{
  render() {
    return (
      <div className={styles.main}>
      <div className={styles.title}>{this.props.title}</div>
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
