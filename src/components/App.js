import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends Component {

    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        this.params = this.props.match.params;
        const localStorageRef = localStorage.getItem(this.params.storeId);

        // reinstate our locatStorage
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)})
        }

        // syncing this.state.fishes with firebase (web-socket)
        this.ref = base.syncState(`${this.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
    } 

    componentDidUpdate() {
        // when component is updated, set the local storage with the order this.state.order
        localStorage.setItem(this.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        //unbind connection before leaving the leaving this comompent
        // memory clean up
        base.removeBinding(this.ref);
    }

    showThis = (e) => {
        e.preventDefault();
        console.log(this);
    };

    addFish = (fish) => {
        //1. Take a copy of the existing fishes state
        const fishes = { ...this.state.fishes };
        //2.Add our new fish to the cloned fishes object
        fishes[`fish${Date.now()}`] = fish;
        //3. set the new fishes object to state
        this.setState({ fishes });
    };

    updateFish = (key, updateFish) => {
        //1. Take a copy of the existing fishes state
        const fishes = { ...this.state.fishes };
        //2. Update fish based on key
        fishes[key] = updateFish;
        //3. Set state
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        //1. take a compy of state fishes
        const fishes = { ...this.state.fishes };
        //2. Delete the requested fish
        fishes[key] = null;
        //3. Set state
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes : sampleFishes })
    }

    addToOrder = (key) => {
        //1. take a copy of order state
        const order = { ...this.state.order };
        //2. add or update the order
        order[key] = order[key] + 1 || 1;
        //3. call setstate to update
        this.setState({ order });
    }

    removeFromOrder = (key) => {
        //1. take a copy of order state
        const order = { ...this.state.order };
        //2. remove selected fish from order 
        delete order[key];
        //3. set state
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <button onClick={this.showThis}>this proof</button>
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory 
                    loadSampleFishes={this.loadSampleFishes} 
                    addFish={this.addFish} fishes={this.state.fishes} 
                    updateFish={this.updateFish} 
                    deleteFish={this.deleteFish}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        );
    }
}

export default App;