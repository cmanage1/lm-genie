import React from 'react';
import Typography from '@material-ui/core/Typography';
import styles from './Landing.module.css'

function Landing(){
    return(
        <div className={styles.intro}>
            <Typography variant="h4" component="h4">
                LM Genie matches a LAW or MED School in North America for you
            </Typography>
            <img className={styles.logo} src={require('../images/genie.png')} alt="logo" />
        </div>
    )
}

export default Landing;