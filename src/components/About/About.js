import React from 'react';
import Typography from '@material-ui/core/Typography';
import styles from './About.module.css'

function About() {
    return (
        <div className={styles.intro}>
            <Typography variant="h4" component="h4">
                This website is powered by React.js and Flask
            </Typography>

        </div>
    )
}

export default About;