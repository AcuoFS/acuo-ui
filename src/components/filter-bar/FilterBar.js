/**
 * Created by vikassaryal on 26/10/16.
 */
import React,  { PropTypes } from 'react'
import {List, Set, Map, OrderedSet} from 'immutable'
import styles from './FilterBar.css'
import FilterDropdown from './FilterBarDropdown'


export default class FilterBar extends React.Component{
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

      this.handleLegalEntityChange = this.handleLegalEntityChange.bind(this)
      this.handleDerivChange = this.handleDerivChange.bind(this)
      this.handleStatusChange = this.handleStatusChange.bind(this)
      this.handleCptyOrgChange = this.handleCptyOrgChange.bind(this)
      this.handleCPTYEntityChange = this.handleCPTYEntityChange.bind(this)
      this.toggleFilter = this.toggleFilter.bind(this)
      this.toggleDropDown = this.toggleDropDown.bind(this)
      this.checkActive = this.checkActive.bind(this)
      this.resetActiveDropdown = this.resetActiveDropdown.bind(this)
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

    handleLegalEntityChange(e){
      this.props.onLegalEntityChange(e)
      this.resetActiveDropdown()
    }

    handleDerivChange(e){
      this.props.onDerivChange(e)
      this.resetActiveDropdown()
    }

    handleTimeWindowChange(e){
        let currTime =new Date('Sun Oct 23 2016 13:58:04 GMT+0800 (SGT)')
        if(e.currentTarget.dataset.min =='All'){
            this.setState({
                timeWindowSlot: this.state.timeWindowTitle + ': All'
            })
            this.props.onFilterTimeWindowStatus(this.state.timeWindowTitle + ":"+ e.currentTarget.dataset.min, null)
        }
        else {
            if (this.state.timeWindowTitle == 'Yesterday') currTime.setDate(currTime.getDate() - 1)
            else if (this.state.timeWindowTitle == 'Tomorrow') currTime.setDate(currTime.getDate() + 1)

            let minTimeRange = new Date(currTime.setHours(e.currentTarget.dataset.min, 0, 0))
            let maxTimeRange = new Date(currTime.setHours(e.currentTarget.dataset.max, 0, 0))
            this.props.onFilterTimeWindowStatus(minTimeRange, maxTimeRange)
            this.setState({
                timeWindowSlot: this.state.timeWindowTitle + ': ' + e.currentTarget.innerHTML
            })
        }
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
        if(!this.props.filters.getIn(['cptyEntityFilter', 'filter']) || e.currentTarget.dataset.ref == "All"){
            this.props.onCPTYEntityChange(Set().add(e.currentTarget.dataset.ref), e)
        }
        else{
            this.selectFilteredEntities(e)
        }
        e.stopPropagation()
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

    renderCPTYEntity(){
      let filterSet = this.props.filters.getIn(['cptyEntityFilter', 'filter']) || Set()

      let cptyEntityList = this.fetchActionList().reduce((listSum , x)=> {
        if(this.props.filters.getIn(['cptyOrgFilter', 'filter']) && this.props.filters.getIn(['cptyOrgFilter', 'filter']) != 'All') {
          return (!listSum.includes(x.get('cptyEntity')) && x.get('cptyOrg') == this.props.filters.getIn(['cptyOrgFilter', 'filter']) ? listSum.add(x.get('cptyEntity')) : listSum)
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
      let filterSet = this.props.filters.getIn(['cptyEntityFilter', 'filter'])

      if(!filterSet.includes(e.currentTarget.dataset.ref)){
          this.props.onCPTYEntityChange(filterSet.add(e.currentTarget.dataset.ref).remove("All"), e)
      }
      else{
          if(filterSet.size == 1)
              this.props.onCPTYEntityChange(filterSet.remove(e.currentTarget.dataset.ref).add("All"), e)
          else
              this.props.onCPTYEntityChange(filterSet.remove(e.currentTarget.dataset.ref).remove("All"), e)
      }
    }

    renderEntitySelection(){

      if(!this.props.filters.getIn(['cptyEntityFilter', 'filter']) || this.props.filters.getIn(['cptyEntityFilter', 'filter']).includes("All") || this.props.filters.getIn(['cptyEntityFilter', 'filter']).size == 0)
        return "All"

      if(this.props.filters.getIn(['cptyEntityFilter', 'filter']).size < 2)
        return this.props.filters.getIn(['cptyEntityFilter', 'filter']).first()

      if(this.props.filters.getIn(['cptyEntityFilter', 'filter']).size > 1)
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


              <FilterDropdown
                  title={'Legal Entity'}
                  handlerOnClick={this.toggleDropDown}
                  handlerResetActiveDropdown={this.resetActiveDropdown}
                  handleOnSelectedItemChange={this.handleLegalEntityChange}
                  options={this.props.legalEntityList} />

              <FilterDropdown
                  title={'Deriv Type'}
                  handlerOnClick={this.toggleDropDown}
                  handlerResetActiveDropdown={this.resetActiveDropdown}
                  handleOnSelectedItemChange={this.handleDerivChange}
                  options={this.props.derivativeType} />

              <div className={styles.filterItem}>
                  <label className={styles.filterLabel}>Time Window</label>
                  <div className={styles.filters + ' ' + this.checkActive('timewindow')} onClick={this.toggleDropDown} onMouseLeave={this.resetActiveDropdown} id="timewindow">

                      <div className={styles.timeDay}>{this.state.timeWindowSlot}</div>

                      {this.renderTimeWindow()}

                  </div>
                  <div className={styles.filterDropdownArrow}></div>
              </div>


              <FilterDropdown
                  title={'Status'}
                  handlerOnClick={this.toggleDropDown}
                  handlerResetActiveDropdown={this.resetActiveDropdown}
                  handleOnSelectedItemChange={this.handleStatusChange}
                  options={this.props.statusList} />

              <FilterDropdown
                  title={'CPTY Organisation'}
                  handlerOnClick={this.toggleDropDown}
                  handlerResetActiveDropdown={this.resetActiveDropdown}
                  handleOnSelectedItemChange={this.handleCptyOrgChange}
                  options={this.props.cptyOrganisation} />

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


FilterBar.propTypes = {
    onLegalEntityChange : PropTypes.func.isRequired,
    onDerivChange : PropTypes.func.isRequired,
    onStatusChange : PropTypes.func.isRequired,
    onCptyOrgChange : PropTypes.func.isRequired,
    onCPTYEntityChange : PropTypes.func.isRequired,
    legalEntityList : PropTypes.arrayOf(PropTypes.string)
    //derivatives : PropTypes.arrayOf(PropTypes.object),
    // filters : PropTypes.array
}

FilterBar.defaultProps = {
    derivatives : List(),
    filters : Map()
}