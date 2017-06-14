const PreMapStateToProps = (Process, Helper)=>(
   (stateProps, dispatchProps, ownProps)=> Process( {stateProps, dispatchProps, ownProps} , Helper )
)

export default PreMapStateToProps
