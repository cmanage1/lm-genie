import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const provinces = [
    {
        value: 'any',
        label: 'Any',
    },
    {
        value: 'alberta',
        label: "Alberta",
    },
    {
        value: "britishcolumbia",
        label: "British Columbia",
    },
    {
        value: "newbrunswick",
        label: "New Brunswick",
    },
    {
        value: "newfoundlandandlabrador",
        label: "Newfoundland and Labrador",
    },
    {
        value: "novascotia",
        label: "Nova Scotia",
    },
    {
        value: "princeedwardisland",
        label: "Prince Edward Island",
    },
    {
        value: "ontario",
        label: "Ontario",
    },
    {
        value: "quebec",
        label: "Quebec",
    },
    {
        value: "saskatchewan",
        label: "Saskatchewan",
    }
];


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

    
function Lsat() {
    const classes = useStyles();
    const [province, setProvince] = React.useState('Any');

    const handleChange = (event) => {
        setProvince(event.target.value);
    };

    return(
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="userLsatForm"
                    select
                    label="Select"
                    value={province}
                    onChange={handleChange}
                    helperText="Preferred province"
                >
                {provinces.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                </TextField>

                <TextField
                    id="userGPA"
                    label= "Anticipated GPA">
                </TextField>
            </div>
            <div>
                <TextField
                    id="lsatScore"
                    label="Anticipated LSAT Score">
                </TextField>
                <TextField
                    id="tuitionBudget"
                    label= "Tution Budget">
                </TextField>
            </div>

        </form>
    )
}

export default Lsat;
