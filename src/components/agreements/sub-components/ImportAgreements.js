import React from 'react'
import styles from './ImportAgreements.css'


const ImportAgreements = ({propHandlerCloseImportPopup}) => {
  return (
    <div className={styles.popContainer}>
      <div className={styles.closeButton}
           onClick={() => propHandlerCloseImportPopup()}>
        x
      </div>
    </div>
  )
}

export default ImportAgreements
