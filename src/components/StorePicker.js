import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends Component {

    static propTypes = {
        history : PropTypes.object
    }

    myInput = React.createRef();

    goToStore = (e) => {
        e.preventDefault();
        // get the text from the input
        const storeName = this.myInput.value.value;
        // change the page to /store/storeName -- without refreshing the page using router
        this.props.history.push(`/store/${storeName}`);
    }

    render() {
        return (
            <form action="" className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()}/>
                <button type="submit">Visit Store →</button>
            </form>     
        );
    }
}

export default StorePicker;