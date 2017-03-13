import React, {PropTypes} from 'react'
import styles from './SimpleCenteredPopup.css'

/**
 * Simple modal popup that renders child props and closes upon clicking out of popup
 *
 * @param handlerClosePopup
 * @param children
 * @param overridePopupStyle
 * @constructor
 */
const SimpleCenteredPopup = ({handlerClosePopup, children, overridePopupStyle}) => (
  <div className={styles.overlay} onClick={() => handlerClosePopup()}>
    <div className={styles.popContainer} style={overridePopupStyle}
         onClick={(e) => e.stopPropagation()}>
      <div className={styles.closeButton}
           onClick={() => handlerClosePopup()}>
        x
      </div>

      {children}

    </div>
  </div>
)

SimpleCenteredPopup.PropTypes = {
  handlerClosePopup: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export {SimpleCenteredPopup}