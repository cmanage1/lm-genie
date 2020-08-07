import React,{useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function Lsat(){
    
    const classes = useStyles();
    const [state, setState] = useState({
        userGPA: '',
        userLSAT: '',
        userTuitionBudget: ''
    })
    const [userProvince, setUserProvince] = useState('any');
    const [results, setResults] = useState(0);
    
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

    function handleSubmit(event){ 
        console.log("Submitted" );
    }

    useEffect(() => {
        fetch('/lsat_calc').then(res => res.json()).then(data => {
            console.log(data)
            setResults(data.time); 
        })
    }, []);

    return(
        <form 
            className={classes.root} 
            noValidate 
            autoComplete="off"
            onSubmit={ handleSubmit } >
            <h2>
                Please complete the form below and click submit
            </h2>
            <div>
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
            <div>
                <TextField
                    id="userGPA"
                    helperText="Anticipated GPA"
                    onChange={handleChange}>
                </TextField>

                <TextField
                    id="userLSAT"
                    helperText="Anticipated LSAT Score"
                    onChange={handleChange}>
                </TextField>

                <TextField
                    id="userTuitionBudget"
                    helperText= "Tution Budget"
                    onChange={handleChange}>
                </TextField>
            </div>
            <div>
                <p className="disclaimer"> <b className="disclaimerHeader"> Disclaimer! </b><br />
                We take into the account the <b>minimum</b> MCAT score and GPA
                required for each school. You can look at
                our database <a href="https://github.com/cmanage1/SchoolFinder/blob/master/server/lawSchoolsDB.json">here </a>
                to see where you stand.
                </p>
            </div>
            <Button type="submit" value="Submit"> Submit
            </Button>
            <h3> The time right now is : { results }</h3>
        </form>
    )
}

export default Lsat;