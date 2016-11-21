/**
 * Created by vikassaryal on 26/10/16.
 */
import React,  { PropTypes } from 'react'
import {List, Set, Map} from 'immutable'
import styles from './FilterBar.css'
import FilterDropdown from './FilterBarDropdown'


export default class FilterBar extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        filterBarNameClicked: true,
        filterBar: styles.open,
        filterItems: styles.show,
        activeDropdown: ''
      }

      this.handleLegalEntityChange = this.handleLegalEntityChange.bind(this)
      this.handleDerivChange = this.handleDerivChange.bind(this)
      this.handleStatusChange = this.handleStatusChange.bind(this)
      this.handleCptyOrgChange = this.handleCptyOrgChange.bind(this)
      this.handleCPTYEntityChange = this.handleCPTYEntityChange.bind(this)
      this.toggleFilter = this.toggleFilter.bind(this)
      this.toggleDropDown = this.toggleDropDown.bind(this)
      this.checkActive = this.checkActive.bind(this)
      this.resetActiveDropdown = this.resetActiveDropdown.bind(this)
      this.renderFilter = this.renderFilter.bind(this)
    }

    resetActiveDropdown(){
      this.setState({
        activeDropdown: ''
      })
      document.removeEventListener("click", this.toggleDropDown)
    }

    handleLegalEntityChange(e){
      this.props.onLegalEntityChange(e)
      this.resetActiveDropdown()
    }

    handleDerivChange(e){
      this.props.onDerivChange(e)
      this.resetActiveDropdown()
    }

    handleStatusChange(e){
      this.props.onStatusChange(e)
      this.resetActiveDropdown()
    }

    handleCptyOrgChange(e){
      this.props.onCptyOrgChange(e)
      this.resetActiveDropdown()
    }

    handleCPTYEntityChange(e){
      this.props.onCPTYEntityChange(e)
      this.resetActiveDropdown()
    }

    fetchActionList(deriv = this.props.derivatives){
      return deriv.reduce((listSumZ, derivative)=>{
        return listSumZ.union(derivative.get('marginStatus').reduce((listSumY, marginStatus)=>{
          return listSumY.union(marginStatus.get('timeFrames').reduce((listSumX, timeFrames)=>{
            return listSumX.union(timeFrames.get('actionsList'))
          },Set()))
        }, Set()))
      }, Set())
    }


    renderFilter(deriv, index){
        return (
            <li key={index} onClick={this.handleDerivChange} data-ref={deriv.get('type')} >{deriv.get('type').toUpperCase()} </li>)
    }

    renderLegalEntity(){
      return this.fetchActionList().reduce((listSum , x)=>{
        return(!listSum.includes(x.get('legalEntity')) ? listSum.add(x.get('legalEntity')):listSum)},Set()).map((x)=>{
        return (<li key={x} onClick={this.handleLegalEntityChange} data-ref={x}>{x.toUpperCase()} </li>)
      })

    }

    renderStatus(){
        return this.props.derivatives.reduce((listSumZ, derivative)=>{
            return listSumZ.union(derivative.get('marginStatus').reduce((listSum, marginStatus)=>{
                return (!listSum.includes(marginStatus.get('status')) ? listSum.add(marginStatus.get('status')) : listSum)
            }, Set()))
        }, Set()).toList().map((x) => {
            return (<li key={x} data-ref={x} onClick={this.handleStatusChange}>{x.toUpperCase()} </li>)})
    }

    renderCPTYOrg(){
     return this.fetchActionList().reduce((listSum , x)=>{
         return(!listSum.includes(x.get('cptyOrg')) ? listSum.add(x.get('cptyOrg')):listSum)},Set()).sort().map((x)=>{
       return (<li key={x} data-ref={x} onClick={this.handleCptyOrgChange}>{x.toUpperCase()} </li>)
       })
    }

    renderCPTYEntity(){
      return this.fetchActionList().reduce((listSum , x)=> {

        if(this.props.filters.getIn(['cptyOrgFilter', 'filter']) && this.props.filters.getIn(['cptyOrgFilter', 'filter']) != 'All') {
          return (!listSum.includes(x.get('cptyEntity')) && x.get('cptyOrg') == this.props.filters.getIn(['cptyOrgFilter', 'filter']) ? listSum.add(x.get('cptyEntity')) : listSum)
        } else {
          return (!listSum.includes(x.get('cptyEntity')) ? listSum.add(x.get('cptyEntity')) : listSum)
        }
      } ,Set()).sort().map((x)=> {
        return(<li key={x} data-ref={x} onClick={this.handleCPTYEntityChange}>{x.toUpperCase()} </li>)
      })
    }

    toggleFilter(){
        if(!this.state.filterBarNameClicked){
            this.setState({
                filterBarNameClicked: !this.state.filterBarNameClicked,
                filterBar: styles.open,
                filterItems: styles.show
            })
        }else{
            this.setState({
                filterBarNameClicked: !this.state.filterBarNameClicked,
                filterBar: styles.close,
                filterItems: styles.hide
            })
        }
    }

    toggleDropDown(e){
      if(!this.state.activeDropdown){
        this.setState({
          activeDropdown: e.currentTarget.id
        })
      }else{
        this.setState({
          activeDropdown: ''
        })
      }
    }

     checkActive(id){
      if(this.state.activeDropdown == id){
        return styles.openDropdown
      }else{
        return styles.closeDropdown
      }
    }

    render(){
        return(
        <div className={styles.filterContainer}>
            <div className={styles.filterBarName + ' ' + this.state.filterBar} onClick={this.toggleFilter}>
                <span>Filter</span>
                <div className={styles.switchArrow}>
                    <div className={styles.arrowLine} id={styles.line1}></div>
                    <div className={styles.arrowLine} id={styles.line2}></div>
                </div>
            </div>

            <div className={styles.filterItemWrap + ' ' + this.state.filterItems}>


                <FilterDropdown
                    title={'Legal Entity'}
                    divId = 'legal-entity'
                    handlerOnCheckActive={this.checkActive}
                    handlerOnClick={this.toggleDropDown}
                    handlerResetActiveDropdown={this.resetActiveDropdown}
                    handleOnSelectedItemChange={this.handleLegalEntityChange}
                    options={this.props.legalEntityList} />

                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>Deriv Type</label>
                    <div className={styles.filters + ' ' + this.checkActive('type')} onClick={this.toggleDropDown} onMouseLeave={this.resetActiveDropdown} id="type">
                      <div className={styles.selectedText}>{(this.props.filters.getIn(['typeFilter', 'filter']) || 'All').toUpperCase()}</div>
                      <ul className={styles.filtersList}>
                        <li onClick={this.handleDerivChange} data-ref="All">ALL</li>
                        {this.props.derivatives.map(this.renderFilter)}
                      </ul>
                    </div>
                    <div className={styles.filterDropdownArrow}></div>
                </div>

                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>Status</label>
                    <div className={styles.filters + ' ' + this.checkActive('status')} onClick={this.toggleDropDown} onMouseLeave={this.resetActiveDropdown} id="status">
                      <div className={styles.selectedText}>{(this.props.filters.getIn(['statusFilter', 'filter']) || 'All').toUpperCase()}</div>
                      <ul className={styles.filtersList}>
                        <li onClick={this.handleStatusChange} data-ref="All">ALL</li>
                        {this.renderStatus()}
                      </ul>
                    </div>
                    <div className={styles.filterDropdownArrow}></div>
                </div>

                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>CPTY Organisation</label>
                    <div className={styles.filters + ' ' + this.checkActive('cpty-org')} onClick={this.toggleDropDown} onMouseLeave={this.resetActiveDropdown} id="cpty-org">
                      <div className={styles.selectedText}>{(this.props.filters.getIn(['cptyOrgFilter', 'filter']) || 'All').toUpperCase()}</div>
                      <ul className={styles.filtersList}>
                        <li onClick={this.handleCptyOrgChange} data-ref="All">ALL</li>
                        {this.renderCPTYOrg()}
                      </ul>
                    </div>
                    <div className={styles.filterDropdownArrow}></div>
                </div>

                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>CPTY Entity</label>
                    <div className={styles.filters + ' ' + this.checkActive('cpty-entity')} onClick={this.toggleDropDown} onMouseLeave={this.resetActiveDropdown} id="cpty-entity">
                      <div className={styles.selectedText}>{(this.props.filters.getIn(['cptyEntityFilter', 'filter']) || 'All').toUpperCase()}</div>
                      <ul className={styles.filtersList}>
                        <li onClick={this.handleCPTYEntityChange} data-ref="All">ALL</li>
                        {this.renderCPTYEntity()}
                      </ul>
                    </div>
                    <div className={styles.filterDropdownArrow}></div>
                </div>
            </div>
        </div>
        )

    }
}


FilterBar.propTypes = {
    onLegalEntityChange : PropTypes.func.isRequired,
    onDerivChange : PropTypes.func.isRequired,
    onStatusChange : PropTypes.func.isRequired,
    onCptyOrgChange : PropTypes.func.isRequired,
    onCPTYEntityChange : PropTypes.func.isRequired,
    legalEntityList : PropTypes.arrayOf(PropTypes.string)
    //derivatives : PropTypes.arrayOf(PropTypes.object),
    //filters : PropTypes.array
}

FilterBar.defaultProps = {
    derivatives : List(),
    filters : Map()
}