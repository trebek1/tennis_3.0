import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (sort) => {
    this.props.sortPoints(sort);
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          variant="contained"
        >
          {this.props.title}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {Object.keys(this.props.config).map((court) => {
            const { id, text } = this.props.config[court];
            return (
              <MenuItem key={id} onClick={() => this.handleClose(id)}>
                {text}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
