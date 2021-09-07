import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        color: 'white',
    },
});

class App extends React.Component {
    state = {
        DiscordName: '',
        CP: '',
        Stock: '',
        Strike: '',
        Price: '',
        date: '',
        Quant: '',
        Comments: '',
    };

    render() {
        const { classes } = this.props;
        let Name = this.state.DiscordName;
        let CP = this.state.CP;
        let Stock = this.state.Stock;
        let Strike = this.state.Strike;
        let date = this.state.date;
        let Price = this.state.Price;
        let Quant = this.state.Quant;
        let Comments = this.state.Comments;

        const playType = [
            {
                value: 'CALL',
                label: 'CALL',
            },
            {
                value: 'PUT',
                label: 'PUT',
            },
        ];

        const onStockSubmit = (e) => {
            e.preventDefault();
            var request = new XMLHttpRequest();
            var request2 = new XMLHttpRequest();
            request.open('POST', 'webhook here');
            request.setRequestHeader('Content-type', 'application/json');

            var params = {
                username: 'Options Player',
                avatar_url: '',
                content: '',
                embeds: [
                    {
                        title: Name + ' has executed a play!',
                        color: 3447003,
                        timestamp: new Date(),
                        footer: {
                            text: 'GSM PLAYS',
                        },
                        description:
                            Stock +
                            ' $' +
                            Strike +
                            ' ' +
                            CP +
                            ' ' +
                            date +
                            ' filled at $' +
                            Price,
                        fields: [
                            { name: 'Quanity', value: Quant },
                            {
                                name: 'Description',
                                value: '```' + Comments + '```',
                            },
                        ],
                    },
                ],
            };

            request.send(JSON.stringify(params));
            this.setState({
                CP: '',
                Stock: '',
                Strike: '',
                Price: '',
                date: '',
                Quant: '',
                Comments: '',
            });
        };

        return (
            <div className='app'>
                <h1 className='title'>GSM Options Player</h1>
                <div className='container'>
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete='off'
                    >
                        <TextField
                            InputLabelProps={{ className: classes.input }}
                            required
                            id='standard-required'
                            label='Discord Name'
                            variant='filled'
                            onChange={(e) => {
                                e.persist();
                                this.setState({
                                    DiscordName: e.target.value,
                                });
                            }}
                            value={this.state.DiscordName}
                        />
                        <TextField
                            InputLabelProps={{ className: classes.input }}
                            required
                            id='standard-required'
                            label='Stock'
                            variant='filled'
                            onChange={(e) => {
                                e.persist();
                                this.setState({
                                    Stock: e.target.value,
                                });
                            }}
                            value={this.state.Stock}
                        />
                        <TextField
                            InputLabelProps={{ className: classes.input }}
                            required
                            id='standard-required'
                            label='Type'
                            variant='filled'
                            select
                            onChange={(e) => {
                                e.persist();
                                this.setState({
                                    CP: e.target.value,
                                });
                            }}
                            value={this.state.CP}
                        >
                            {playType.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    onClick={(e) => {
                                        e.persist();
                                        this.setState({
                                            CP: e.target.value,
                                        });
                                    }}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            InputLabelProps={{ className: classes.input }}
                            required
                            id='standard-required'
                            label='Date'
                            variant='filled'
                            onChange={(e) => {
                                e.persist();
                                this.setState({
                                    date: e.target.value,
                                });
                            }}
                            value={this.state.date}
                        />
                        <br></br>
                        <TextField
                            InputLabelProps={{ className: classes.input }}
                            required
                            id='standard-required'
                            label='Strike'
                            variant='filled'
                            onChange={(e) => {
                                e.persist();
                                this.setState({
                                    Strike: e.target.value,
                                });
                            }}
                            value={this.state.Strike}
                        />
                        <TextField
                            InputLabelProps={{ className: classes.input }}
                            required
                            id='standard-required'
                            label='Price'
                            variant='filled'
                            onChange={(e) => {
                                e.persist();
                                this.setState({
                                    Price: e.target.value,
                                });
                            }}
                            value={this.state.Price}
                        />
                        <TextField
                            InputLabelProps={{ className: classes.input }}
                            required
                            id='standard-required'
                            label='Quantity'
                            variant='filled'
                            onChange={(e) => {
                                e.persist();
                                this.setState({
                                    Quant: e.target.value,
                                });
                            }}
                            value={this.state.Quant}
                        />
                        <br></br>
                        <TextField
                            InputLabelProps={{ className: classes.input }}
                            id='outlined-multiline-static'
                            label='Why did you enter/exit?'
                            style={{ width: 500 }}
                            multiline
                            rows={13}
                            variant='outlined'
                            onChange={(e) => {
                                e.persist();
                                this.setState({
                                    Comments: e.target.value,
                                });
                            }}
                            value={this.state.Comments}
                        />
                        <div className='button'>
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                                onClick={onStockSubmit}
                            >
                                Submit Play
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(App);
