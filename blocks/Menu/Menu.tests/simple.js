import React from 'react';
import ReactDom from 'react-dom';
import './simple.css';
import Menu from 'b:Menu m:mode=radio|check|radio-check';
import MenuItem from 'b:Menu e:Item';
import MenuGroup from 'b:Menu e:Group';
import Link from 'b:Link';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.onRadioChange = this.onRadioChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.onRadioCheckChange = this.onRadioCheckChange.bind(this);
        this.onMutableMenuCheckChange = this.onMutableMenuCheckChange.bind(this);

        this.state = {
            menuRadioValue : 2,
            menuCheckValue : [2],
            menuRadioCheckValue : 2,
            mutableMenuItems : [
                { value : 1, text : 'one' },
                { value : 2, text : 'two' },
                { value : 3, text : 'three' },
                { value : 4, text : 'four' },
                { value : 5, text : 'five' },
                { value : 6, text : 'six' }
            ]
        };
    }

    onRadioChange(value) {
        console.log(value);
        this.setState({ menuRadioValue : value });
    }

    onCheckChange(value) {
        console.log(value);
        this.setState({ menuCheckValue : value });
    }

    onRadioCheckChange(value) {
        console.log(value);
        this.setState({ menuRadioCheckValue : value });
    }

    onMutableMenuCheckChange([value]) {
        console.log(value);
        this.setState({
            mutableMenuItems : this.state.mutableMenuItems
                .reduce((acc, item) => acc.concat(item.value === value ? [] : item), [])
        });
    }

    render() {
        return (
            <div>
                <Menu
                    mode="radio"
                    value={this.state.menuRadioValue}
                    onChange={this.onRadioChange}>
                    <MenuGroup title="group">
                        <MenuItem value={1}>one</MenuItem>
                        <MenuItem value={2}>two</MenuItem>
                    </MenuGroup>
                    <MenuItem value={3}>three</MenuItem>
                </Menu>
                <br/>
                <Menu
                    mode="check"
                    value={this.state.menuCheckValue}
                    onChange={this.onCheckChange}>
                    <MenuItem value={1}>one</MenuItem>
                    <MenuItem value={2} disabled>two disabled</MenuItem>
                    <MenuItem value={3}>three</MenuItem>
                </Menu>
                <br/>
                <Menu
                    mode="radio-check"
                    value={this.state.menuRadioCheckValue}
                    onChange={this.onRadioCheckChange}>
                    <MenuItem value={1}>one</MenuItem>
                    <MenuItem value={2}>two</MenuItem>
                    <MenuItem value={3}>three</MenuItem>
                </Menu>
                <br/>
                <Menu>
                    <MenuItem><Link url="#1">one</Link></MenuItem>
                    <MenuItem><Link url="#2">two</Link></MenuItem>
                    <MenuItem><Link url="#3">three</Link></MenuItem>
                </Menu>
                <br/>
                <Menu disabled mode="radio" value={1}>
                    <MenuItem value={1}>one</MenuItem>
                    <MenuItem value={2}>two</MenuItem>
                    <MenuItem value={3}>three</MenuItem>
                </Menu>
                <br/>
                <Menu
                    mode="check"
                    onChange={this.onMutableMenuCheckChange}>
                    {
                        this.state.mutableMenuItems
                            .map((item, i) =>
                                <MenuItem
                                    key={`item-${i}`}
                                    value={item.value}>
                                    {item.text}
                                </MenuItem>)
                    }
                </Menu>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
