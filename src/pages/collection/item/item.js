import React, {PropTypes} from 'react';
import './item.scss';
import { Favorite, Delete , Edit, Add} from '@material-ui/icons';
import { addItem, toggleFavorite, removeItem } from '../../../redux/actions/collection.action';
import { connect } from "react-redux";
import ModalSetup from '../../../shared/modal';
import ItemEditDialog from '../edit-dialog/index'


class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            isModalOpen:false,
            item : props.item
        }
        this.addToCollection = this.addToCollection.bind(this);
        this.removeItemFromCollection = this.removeItemFromCollection.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.dismissable = this.dismissable.bind(this);
      }
    componentWillReceiveProps(nextProps){
        this.setState({item: nextProps.item})
    }
    handleModalOpen(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }
    dismissable() {
        this.setState({isModalOpen: false})
      }
    render(){
        const {isModalOpen} = this.state;
        console.log(this.state.item.isFavorite);
        let children;
        if(isModalOpen){
            children = (<ItemEditDialog dismiss={this.dismissable} item={this.state.item}/>);
        } 
        const formatedDate = this.formatDate(this.state.item.data[0].date_created);
        return (
        <div className="item">
            <img src={this.state.item.links[0].href} />
            <div className="item-info">
                <span>{this.state.item &&this.state.item.data[0].keywords && this.state.item.data[0].keywords.length > 0 ? this.state.item.data[0].keywords[0]: ''}</span>
                <span>{formatedDate}</span>
            </div>
            <div className="detail">
                <p className="title">{this.state.item.data[0].title.length > 100 ?this.state.item.data[0].title.substring(0, 100) + '...' :  this.state.item.data[0].title}</p>
                <span>{this.state.item.data[0].description.length > 200 ?this.state.item.data[0].description.substring(0, 200) + '...' :  this.state.item.data[0].description}</span>
            </div>
            {this.props.isCollection ? 
                <div className="action">
                    <button onClick={this.toggleFavorite} className={this.state.item.isFavorite ? 'red': 'default'}><Favorite></Favorite></button>
                    <button onClick={this.removeItemFromCollection}><Delete></Delete></button>
                    <button onClick={this.handleModalOpen}><Edit></Edit></button>
                </div> : 
                <div className="action"><button onClick={this.addToCollection} className="w-100"><Add ></Add> Add to NASA Collection</button></div>}
            
            <ModalSetup client="50%" visible={isModalOpen} dismiss={this.dismissable} children={children} />
        </div>
        )
    }
    removeItemFromCollection(e){
        this.props.removeItem(this.props.item);
        e.preventDefault();

    }
    addToCollection(e){
        this.props.addItem(this.props.item);
        e.preventDefault();
    }
    toggleFavorite(e){
        this.props.toggleFavorite(this.props.item);
        e.preventDefault();
    }
    formatDate(input) {
        const monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
        const date = new Date(input);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      }
}
function mapDispatchToProps(dispatch){
    return {
        addItem: item => dispatch(addItem(item)),
        toggleFavorite: item => dispatch(toggleFavorite(item)),
        removeItem: item => dispatch(removeItem(item))
    }
}
const ConnectedCollection = connect(null, mapDispatchToProps)(Item)

export default ConnectedCollection;