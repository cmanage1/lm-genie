import React,{useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import styles from './Lsat.module.css';

function Lsat(){

    const [userProvince, setUserProvince] = useState('any');
    const [checked, setChecked] = useState(false);
    const [results, setResults] = useState([]);
    const isHidden = checked === false;
    const [state, setState] = useState({
        userGPA: '',
        userLSAT: '',
        userTuitionBudget: ''
    })
    const timerRef = React.useRef();
    const [query, setQuery] = React.useState('idle');

    React.useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        [],
    );

    const handleLoading = () => {
        clearTimeout(timerRef.current);

        if (query !== 'idle') {
            setQuery('idle');
            return;
        }
        setQuery('progress');
        timerRef.current = setTimeout(() => {
            setQuery('success');
        }, 2000);
    };

    function handleChange(event){
        const value = event.target.value;
        setState( { 
            ...state,
            [event.target.id] : value 
        });
    };

    const handleProvinceChange = (event) =>{ 
        setUserProvince(event.target.value)
    }

    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
    }

    function handleSubmit(event){ 
        event.preventDefault();

        var gpa = state.userGPA;
        var lsatScore = state.userLSAT;
        var tuitionBudget = state.userTuitionBudget;
        var data = {
            userProvince, 
            gpa , 
            lsatScore , 
            tuitionBudget ,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(data)
        };

        fetch('/lsat_calc', options)
            .then(res => res.json())
            .then( (data) => {
                console.log(data)
                setResults(data)
            }).catch( e => {
                console.error(e);
            });
    }

    var gpaIsInvalid = state.userGPA > 4.0 || state.userGPA < 1.0  ;
    var lsatIsInvalid = state.userLSAT > 180 || state.userLSAT < 120 ;
    

    return(
        <div >
            <form 
                className={styles.form} 
                noValidate 
                autoComplete="off"
                onSubmit={ handleSubmit } >
                <Typography variant="h4" component="h4">
                    Law School Matchmaker
                </Typography>
                <Typography variant="body1" component="span">
                    Please complete the form below and click submit
                </Typography>
                <div className={styles.selection}>
                    <TextField
                        select
                        id="userProvince"
                        value={  userProvince }
                        onChange={ handleProvinceChange }
                        helperText="Select your preferred province"
                        variant="outlined"
                    >
                        <MenuItem value={'any'}>Any</MenuItem>
                        <MenuItem value={'alberta'}>Alberta </MenuItem>
                        <MenuItem value={'britishcolumbia'}>British Columbia</MenuItem>
                        <MenuItem value={'newbrunswick'}>New Brunswick</MenuItem>
                        <MenuItem value={'newfoundlandandlabrador'}>Newfoundland and Labrador</MenuItem>
                        <MenuItem value={'novascotia'}>Nova Scotia</MenuItem>
                        <MenuItem value={'princeedwardisland'}>Prince Edward Island</MenuItem>
                        <MenuItem value={'ontario'}>Ontario</MenuItem>
                        <MenuItem value={'quebec'}>Quebec</MenuItem>
                        <MenuItem value={'saskatchewan'}>Saskatchewan</MenuItem>
                    </TextField>
                </div>
                <div className={styles.textFields}>
                    <TextField
                        error = {gpaIsInvalid}
                        id="userGPA"
                        helperText=" Anticipated GPA (Between 1 and 4)"
                        onChange={handleChange}
                        variant="outlined"
                        type="number"
                        >
                    </TextField>

                    <TextField
                        error = {lsatIsInvalid}
                        id="userLSAT"
                        helperText="Anticipated LSAT Score (Between 120 and 180)"
                        onChange={handleChange}
                        variant="outlined"
                        type="number"
                        >
                    </TextField>
                </div>

                <div >   
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={handleCheckChange}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label="Include Tuition Budget"
                    />             
                    <Fade in={checked}>
                        <TextField
                            id="userTuitionBudget"
                            helperText="Tution Budget"
                            onChange={handleChange}
                            disabled={isHidden} 
                            
                            >
                        </TextField> 
                    </Fade>
                </div>
                <div>
                    <Typography variant="body1" component="span">
                        <b className="disclaimerHeader"> Disclaimer! </b><br></br>
                        We take into the account the <b>minimum</b> MCAT score and GPA
                        required for each school. You can look at
                        our database <a href="https://github.com/cmanage1/SchoolFinder/blob/master/server/lawSchoolsDB.json">here </a>
                        to see where you stand.
                    </Typography>

                </div>
                <Button 
                    onClick={handleLoading} 
                    type="submit" 
                    value="Submit"
                    disabled= { gpaIsInvalid || lsatIsInvalid} > 
                        Match Me
                </Button>
            </form>

            <div className={styles.results}>
                {query === 'success' ? (
                    results.map(school =>
                        <div
                            key={school} >
                            <h4> {school}</h4>
                        </div>
                    )
                    ) : (
                    <Fade
                        in={query === 'progress'}
                        style={{
                            transitionDelay: query === 'progress' ? '600ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                    )}
            </div>

        </div>
    )
}

export default Lsat;