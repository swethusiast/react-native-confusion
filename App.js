import React, { Component } from 'react';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './components/LoadingComponent';
const { persistor, store } = configureStore();
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<Loading />} persistor={persistor}>
                    <Main />
                </PersistGate>
            </Provider>
        );
    }
}
export default App;
