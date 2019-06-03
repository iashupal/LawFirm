import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import produce from 'immer';
import { R, RU } from 'helpers/ramda';
import { connect } from 'react-redux';

const { changeURL, parseQueryStr, mlMessage, getRoleAuth } = RU;

class DownshiftMultiple extends React.Component {
  state = {
    inputValue: '',
  };

  handleChange = item => {
    let sItem = R.pluck('name', this.props.items);
    if (sItem.indexOf(item) === -1) {
      sItem = [...sItem, item];
    }

    sItem.map(v1 => {
      this.props.allUserList.map(v => {
        if (v1 === v.name) {
          this.setState(
            produce(this.state, draft => {
              draft.inputValue = '';
              if (this.props.items.findIndex(a => a.UserID === v.UserID) < 0) {
                this.props.handleAddItem(v);
              }
            }),
          );
        }
        return '';
      });
      return '';
    });
  };

  handleDelete = item => {
    const index = this.props.items.findIndex(a => a.UserID === item.UserID);
    this.props.handleRemoveItem(index);
  };

  render() {
    const { classes } = this.props;
    const { items, isReadOnly } = this.props;
    const { inputValue } = this.state;

    const renderInput = inputProps => {
      const { InputProps, classes, ref, ...other } = inputProps;
      return (
        <TextField
          InputProps={{
            // inputref: ref,
            classes: {
              root: classes.inputRoot,
            },
            ...InputProps,
          }}
          label={mlMessage('component.autoComplate.multi')}
          disabled={isReadOnly}
          {...other}
        />
      );
    };

    const getSuggestions = value => {
      const inputValue = deburr(value.trim()).toLowerCase();
      const inputLength = inputValue.length;
      let count = 0;

      return inputLength === 0
        ? []
        : this.props.allUserList.filter(suggestion => {
            const keep = count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;
            if (keep) {
              count += 1;
            }
            return keep;
          });
    };

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={item => this.handleChange(item)}
        selectedItem={R.pluck('name', items)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: items.map((item, index) => {
                  if (isReadOnly) {
                    return <Chip key={index} tabIndex={-1} label={item.name} className={classes.chip} />;
                  }
                  return (
                    <Chip
                      key={index}
                      tabIndex={-1}
                      label={item.name}
                      className={classes.chip}
                      onDelete={e => this.handleDelete(item)}
                    />
                  );
                }),
                onChange: e => this.setState({ ...this.state, inputValue: e.target.value }),
              }),
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2).map((suggestion, index) => {
                  return (
                    <MenuItem
                      {...getItemProps({ item: suggestion.name })}
                      key={suggestion.name}
                      selected={highlightedIndex === index}
                      component="div"
                      style={{
                        fontWeight: (selectedItem2 || '').indexOf(suggestion.name) > -1 ? 500 : 400,
                      }}
                    >
                      {suggestion.name}
                    </MenuItem>
                  );
                })}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

const mapStateToProps = ({ common }) => {
  const { allUserList } = common;
  return { allUserList };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DownshiftMultiple));
