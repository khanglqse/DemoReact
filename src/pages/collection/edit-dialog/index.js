import React from 'react';
import { Close, Check} from '@material-ui/icons';
import './index.scss';
import { editItem } from '../../../redux/actions/collection.action';

import { connect } from "react-redux";

class ItemEditDialog extends React.Component {
    constructor(props){
        super(props);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.state = {
            title: this.props.item.data[0].title,
            description: this.props.item.data[0].description,
            media_type: this.props.item.data[0].media_type,
            href: this.props.item.links[0].href
        }
    }
    render(){
        const {item} = this.props;
        return (
            <div>
                <div className="dialog-header">
                    <span>Edit</span>
                    <button><Close onClick={this.props.dismiss}></Close></button>
                </div>
                <div className="box-info">
                    <div className="title">Title</div>
                    <input onChange={this.handleInputChange} name="title" type="text" value={this.state.title}/>
                </div>
                <div className="box-info">
                    <div className="title">Description</div>
                    <textarea onChange={this.handleInputChange} name="description" type="text" value={this.state.description}></textarea>
                </div>
                <div className="box-info">
                    <div className="title">Type</div>
                    <input  onChange={this.handleInputChange} name="media_type" type="text" value={this.state.media_type}/>
                </div>
                <div className="box-info">
                    <div className="title">Link preview image Url</div>
                    <input onChange={this.handleInputChange} name="href" type="text" value={this.state.href}/>
                </div>
                
                <button className="dialog-action" onClick={this.onSave}><Check></Check>Save</button>
            </div>
        )
    }
    handleInputChange(e){
        const target = e.target;
        const {value, name} = target;
        this.setState({
            [name]:value
        })
    }
    onSave(e){
        this.props.editItem({...this.state, nasa_id: this.props.item.data[0].nasa_id});
        this.props.dismiss();
        e.preventDefault();
    }
    handleDismiss(){
        this.props.dismiss();
    }
    
}
function mapDispatchToProps(dispatch){
    return {
        editItem: item => dispatch(editItem(item)),
    }
}
export default  connect(null, mapDispatchToProps)(ItemEditDialog);