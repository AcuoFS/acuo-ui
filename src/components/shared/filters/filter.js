/**
 * Created by vikassaryal on 26/10/16.
 */
import React from 'react'
import {connect} from 'react-redux'
import {List, Set, Map, OrderedSet} from 'immutable'

import * as actionCreators from '../../../action_creators'

import styles from './filter.css'

class Filter extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        filterBarNameClicked: true,
        filterBar: styles.open,
        filterItems: styles.show,
        activeDropdown: '',
        filterEntity: '',
        timeWindowTitle: 'Today',
        timeWindowSlot: 'Today: ALL',
        timeArrowLeft: styles.show,
        timeArrowRight: styles.show
      }

      this.getDeriv = this.getDeriv.bind(this)
      this.getFilters = this.getFilters.bind(this)
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
      this.filterEntities = this.filterEntities.bind(this)
      this.selectFilteredEntities = this.selectFilteredEntities.bind(this)
      this.renderEntitySelection = this.renderEntitySelection.bind(this)
      this.handleTimeWindowChange = this.handleTimeWindowChange.bind(this)
      this.renderPrevDay = this.renderPrevDay.bind(this)
      this.renderNextDay = this.renderNextDay.bind(this)
      this.preventClose = this.preventClose.bind(this)
      this.checkTimeDay = this.checkTimeDay.bind(this)

    }

    resetActiveDropdown(){
        this.setState({
            activeDropdown: ''
        })
        document.removeEventListener("click", this.toggleDropDown)
    }

    getDeriv(){
        return this.props.derivatives || List()
    }

    getFilters(){
        return this.props.filters || Map()
    }

    handleLegalEntityChange(e){
        this.props.filterStateLegal(e.currentTarget.dataset.ref)
        this.resetActiveDropdown()
        e.stopPropagation()
    }

    handleDerivChange(e){
        this.props.filterStateDeriv(e.currentTarget.dataset.ref)
        this.resetActiveDropdown()
        e.stopPropagation()
    }

    handleTimeWindowChange(e){
        let currTime =new Date('Sun Oct 23 2016 13:58:04 GMT+0800 (SGT)')
      if(e.currentTarget.dataset.min =='All'){
        this.setState({
            timeWindowSlot: this.state.timeWindowTitle + ': All'
        })
        this.props.filterTimeWindowStatus(this.state.timeWindowTitle + ":"+ e.currentTarget.dataset.min, null)
      }
      else {
        if (this.state.timeWindowTitle == 'Yesterday') currTime.setDate(currTime.getDate() - 1)
        else if (this.state.timeWindowTitle == 'Tomorrow') currTime.setDate(currTime.getDate() + 1)

        let minTimeRange = new Date(currTime.setHours(e.currentTarget.dataset.min, 0, 0))
        let maxTimeRange = new Date(currTime.setHours(e.currentTarget.dataset.max, 0, 0))
        this.props.filterTimeWindowStatus(minTimeRange, maxTimeRange)
        this.setState({
            timeWindowSlot: this.state.timeWindowTitle + ': ' + e.currentTarget.innerHTML
        })
      }

    }

    handleStatusChange(e){
        this.props.filterStateStatus(e.currentTarget.dataset.ref)
        this.resetActiveDropdown()
        e.stopPropagation()
    }

    handleCptyOrgChange(e){
        this.props.filterCptyOrg(e.currentTarget.dataset.ref)
        this.resetActiveDropdown()
        e.stopPropagation()
    }

    handleCPTYEntityChange(e){

      if(!this.getFilters().getIn(['cptyEntityFilter', 'filter']) || e.currentTarget.dataset.ref == "All"){
        this.props.filterCptyEntity(Set().add(e.currentTarget.dataset.ref))
      }
      else{
        this.selectFilteredEntities(e)
      }
      e.stopPropagation()
    }

    fetchActionList(deriv = this.getDeriv()){
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

    renderTimeWindow(){
        return(
            <ul className={styles.filtersList+' '+styles.timeSlot}>

                <li className={styles.timeTitle} onClick={this.preventClose}>
                    <div className={styles.timeArrowLeft+' '+this.state.timeArrowLeft} onClick={this.renderPrevDay}></div>
                    <span>{this.state.timeWindowTitle}</span>
                    <div className={styles.timeArrowRight+' '+this.state.timeArrowRight} onClick={this.renderNextDay}></div>
                </li>

                <li onClick={this.handleTimeWindowChange} data-min="All">ALL</li>
                <li onClick={this.handleTimeWindowChange} data-min="0" data-max="3">0H - 3H</li>
                <li onClick={this.handleTimeWindowChange} data-min="03" data-max="6">3H - 6H</li>
                <li onClick={this.handleTimeWindowChange} data-min="06" data-max="9">6H - 9H</li>
                <li onClick={this.handleTimeWindowChange} data-min="09" data-max="12">9H - 12H</li>
                <li onClick={this.handleTimeWindowChange} data-min="12" data-max="15">12H - 15H</li>
                <li onClick={this.handleTimeWindowChange} data-min="15" data-max="18">15H - 18H</li>
                <li onClick={this.handleTimeWindowChange} data-min="18" data-max="21">18H - 21H</li>
                <li onClick={this.handleTimeWindowChange} data-min="21"data-max="0">21H - 24H</li>
            </ul>
        )
    }

    checkTimeDay(){
        switch (this.state.timeWindowTitle) {
            case 'Yesterday':
                return (
                    this.setState({
                        timeWindowTitle: 'Yesterday',
                        timeArrowLeft: styles.hide,
                        timeArrowRight: styles.show
                    })
                )

            case 'Tomorrow':
                return (
                    this.setState({
                        timeWindowTitle: 'Tomorrow',
                        timeArrowLeft: styles.show,
                        timeArrowRight: styles.hide
                    })
                )

            default:
                return (
                    this.setState({
                        timeWindowTitle: 'Today',
                        timeArrowLeft: styles.show,
                        timeArrowRight: styles.show
                    })
                )
        }
    }

    renderPrevDay(){
        if(this.state.timeWindowTitle == 'Today') {
            this.state.timeWindowTitle = 'Yesterday'
        } else {
            this.state.timeWindowTitle = 'Today'
        }
        this.checkTimeDay()
    }

    renderNextDay(){
        if(this.state.timeWindowTitle == 'Today') {
            this.state.timeWindowTitle = 'Tomorrow'
        } else {
            this.state.timeWindowTitle = 'Today'
        }
        this.checkTimeDay()
    }

    preventClose(e){
        return e.stopPropagation()
    }

    renderStatus(){
        return this.getDeriv().reduce((listSumZ, derivative)=>{
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
      let filterSet = this.getFilters().getIn(['cptyEntityFilter', 'filter']) || Set()

      let cptyEntityList = this.fetchActionList().reduce((listSum , x)=> {
        if(this.getFilters().getIn(['cptyOrgFilter', 'filter']) && this.getFilters().getIn(['cptyOrgFilter', 'filter']) != 'All') {
          return (!listSum.includes(x.get('cptyEntity')) && x.get('cptyOrg') == this.getFilters().getIn(['cptyOrgFilter', 'filter']) ? listSum.add(x.get('cptyEntity')) : listSum)
        } else {
          return (!listSum.includes(x.get('cptyEntity')) ? listSum.add(x.get('cptyEntity')) : listSum)
        }
      } ,Set()).sort().filter((x)=> {
        return x.toUpperCase().includes(this.state.filterEntity.toUpperCase())
      })

      if(filterSet.size > 0)
        return cptyEntityList.filter(x =>
          filterSet.includes(x)
        ).toOrderedSet().sort().union(cptyEntityList.filter(x =>
          !filterSet.includes(x)
        ).toOrderedSet().sort()).map(x =>
          <li key={x} className={filterSet.includes(x) ? styles.selectedList : ''} data-ref={x} onClick={this.handleCPTYEntityChange}>{x.toUpperCase()}</li>
        )
      else
        return cptyEntityList.map(x => <li key={x} className={filterSet.includes(x) ? styles.selectedList : ''} data-ref={x} onClick={this.handleCPTYEntityChange}>{x.toUpperCase()}</li>)

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

    filterEntities(e){
      this.setState({
        filterEntity: e.currentTarget.value
      })
    }

    selectFilteredEntities(e){
      let filterSet = this.getFilters().getIn(['cptyEntityFilter', 'filter'])

      if(!filterSet.includes(e.currentTarget.dataset.ref))
        this.props.filterCptyEntity(filterSet.add(e.currentTarget.dataset.ref).remove("All"))
      else
        if(filterSet.size == 1)
          this.props.filterCptyEntity(filterSet.remove(e.currentTarget.dataset.ref).add("All"))
        else
          this.props.filterCptyEntity(filterSet.remove(e.currentTarget.dataset.ref).remove("All"))

    }

    renderEntitySelection(){

      if(!this.getFilters().getIn(['cptyEntityFilter', 'filter']) || this.getFilters().getIn(['cptyEntityFilter', 'filter']).includes("All") || this.getFilters().getIn(['cptyEntityFilter', 'filter']).size == 0)
        return "All"

      if(this.getFilters().getIn(['cptyEntityFilter', 'filter']).size < 2)
        return this.getFilters().getIn(['cptyEntityFilter', 'filter']).first()

      if(this.getFilters().getIn(['cptyEntityFilter', 'filter']).size > 1)
        return "Multiple"

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

            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Legal Entity</label>
              <div className={styles.filters + ' ' + this.checkActive('legal-entity')} onClick={this.toggleDropDown} onMouseLeave={this.resetActiveDropdown} id="legal-entity">
                  <div className={styles.selectedText}>{(this.getFilters().getIn(['legalEntityFilter', 'filter']) || 'All').toUpperCase()}</div>
                  <ul className={styles.filtersList}>
                    <li onClick={this.handleLegalEntityChange} data-ref="All" className={styles.all}>ALL</li>
                    {this.renderLegalEntity()}
                  </ul>
              </div>
              <div className={styles.filterDropdownArrow}></div>
            </div>


            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Deriv Type</label>
              <div className={styles.filters + ' ' + this.checkActive('type')} onClick={this.toggleDropDown} onMouseLeave={this.resetActiveDropdown} id="type">
                <div className={styles.selectedText}>{(this.getFilters().getIn(['typeFilter', 'filter']) || 'All').toUpperCase()}</div>
                <ul className={styles.filtersList}>
                  <li onClick={this.handleDerivChange} data-ref="All" className={styles.all}>ALL</li>
                  {this.getDeriv().map(this.renderFilter)}
                </ul>

              </div>
              <div className={styles.filterDropdownArrow}></div>
            </div>


              <div className={styles.filterItem}>
                  <label className={styles.filterLabel}>Time Window</label>
                  <div className={styles.filters + ' ' + this.checkActive('timewindow')} onClick={this.toggleDropDown} onMouseLeave={this.resetActiveDropdown} id="timewindow">

                      <div className={styles.timeDay}>{this.state.timeWindowSlot}</div>

                      {this.renderTimeWindow()}

                  </div>
                  <div className={styles.filterDropdownArrow}></div>
              </div>


            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Status</label>
              <div className={styles.filters + ' ' + this.checkActive('status')} onClick={this.toggleDropDown} onMouseLeave={this.resetActiveDropdown} id="status">
                  <div className={styles.selectedText}>{(this.getFilters().getIn(['statusFilter', 'filter']) || 'All').toUpperCase()}</div>
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
                <div className={styles.selectedText}>{(this.getFilters().getIn(['cptyOrgFilter', 'filter']) || 'All').toUpperCase()}</div>
                <ul className={styles.filtersList}>
                  <li onClick={this.handleCptyOrgChange} data-ref="All" className={styles.all}>ALL</li>
                  {this.renderCPTYOrg()}
                </ul>
              </div>
              <div className={styles.filterDropdownArrow}></div>
            </div>

            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>CPTY Entity</label>
              <div className={styles.filters + ' ' + this.checkActive('cpty-entity')} onClick={this.toggleDropDown} onMouseLeave={this.resetActiveDropdown} id="cpty-entity">
                <div className={styles.selectedText}>
                  {this.renderEntitySelection().toUpperCase()}
                </div>
                <ul className={styles.filtersList}>
                  <li className={styles.paddingless} onClick={(e) => e.stopPropagation()}><input type="text" className={styles.filterSearchBox} onChange={this.filterEntities} placeholder="Search..."/></li>
                  <li onClick={this.handleCPTYEntityChange} data-ref="All" className={styles.all}>ALL</li>
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

function mapStateToProps(state){
    return {
        derivatives : state.getIn(['data', 'derivatives']),
        filters: state.getIn(['inputs', 'filters'])
    }
}

export const FilterContainer = connect(mapStateToProps, actionCreators)(Filter)
