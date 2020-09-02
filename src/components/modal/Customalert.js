import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

class Customalert extends React.Component {
   
    visibleAlert(){

    }

    render(){
        const {modalOpen,modalClose, message} = this.props;
        return(
            <Snackbar 
                open={modalOpen} 
                autoHideDuration={6000} 
                onClose={() => modalClose()} 
                anchorOrigin={{ vertical:"center", horizontal:"center"}}>

                <Alert onClose={() => modalClose()} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        );
    }
}

export default Customalert;
