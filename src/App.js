import React, {Component} from 'react';
import router from './router'
import Header from './common/head/header'
import {Provider} from 'react-redux';
import store from './store'
// import {PersistGate} from 'redux-persist/integration/react'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {/*<PersistGate loading={null} persistor={store.persistor}>*/}
                <React.Fragment>
                    <Header/>
                    {router}
                </React.Fragment>
                {/*</PersistGate>*/}
            </Provider>

        )
    }

}
export default App