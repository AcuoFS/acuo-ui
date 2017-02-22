import React, {PropTypes} from 'react'
import styles from './SimpleCenteredPopup.css'


const SimpleCenteredPopup = ({handlerClosePopup, children}) => (
  <div className={styles.popContainer}>
    <div className={styles.closeButton}
         onClick={() => handlerClosePopup()}>
      x
    </div>

    {children}

  </div>
)

SimpleCenteredPopup.PropTypes = {
  handlerClosePopup: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export {SimpleCenteredPopup}