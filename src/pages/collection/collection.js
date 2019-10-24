import Item from "./item/item";
import React from 'react';
import { connect } from "react-redux";
import './collection.scss';
import { Link } from 'react-router-dom';

class CollectionPage extends React.Component {
    constructor(props){
        super(props);
    }
   
    componentDidMou(){
        this.setState({inputValue: this.props.inputValue});
    }
    render() {
        const {collectionReducer: {collection: collec = []}} = this.props;
        let collection = collec.map((m,index) =>{ return <Item item={m} key={`key-${index}`} isFavorite={m.isFavorite} isCollection={true}/>} );
        return (<div className="container">
      <header className="header">
        <span>NASA Collection</span>
        <Link to="/search"><button>+ Add new item</button></Link>
      
      </header>
      <div className="item-container">
                {collection}
            </div>
    </div>
        )
    }
  
}

const mapStateToProps = (state) => {
    const { collectionReducer } = state;
    return { 
        collectionReducer,
     };
};

export default connect(mapStateToProps)(CollectionPage);