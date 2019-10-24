import axios from 'axios';
import React from 'react';
import Item from '../collection/item/item';
import './search.scss';
import { Link } from 'react-router-dom';

class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            items: [],
            keyword: '',
        }
    }
    
    render(){
        console.log(this);
        let items = this.state.items && this.state.items.map(m =>{ return <Item item={m}/>} );
        return(
            <div className="search-container">
                <Link to="/"><p>{`<`} Back to collection</p></Link>
                <p className="title">Search from Nasa</p>
                <input type="text" className="input"  onChange={e => {this.setKeyword(e.target.value)}} placeholder="Search..." />
                {this.state.totalResult !== undefined ? <p>{this.state.totalResult} result for {this.state.keyword}</p>: ''}
                <div className="item-container">
                    {items}
                </div>
            </div>
        )
    }
    setKeyword(){
        debounce(keyword => {
            this.setState({ keyword });
            this.search(keyword);
        }, 100)
    }
    search(e){
            axios.get(`https://images-api.nasa.gov/search?q=${e}`,
                { headers: {'Content-Type': 'application/json'}}
                ).then(response => {
                this.setState({items: response.data.collection.items.filter(m => m.links && m.data),
                                totalResult: response.data.collection.metadata.total_hits}) ;
            })
        
        
    }
    
}
const debounce = (fn, delay) => {
    let timer = null;
    return function (...args) {
        const context = this;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}
export default SearchPage;