var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://glaring-fire-5963.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key)
  },
  render: function() {
    return <div>
     <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          checked={this.state.done}
          onChange={this.handleDoneChange} />
      </span>
      <span>
        <input type="text"
          disabled={this.state.done}
          className="form-control list-item"
          value={this.state.text}
          onChange={this.handleTextChange} />
      </span>
      <span className="input-group-btn">
        {this.changesButtons()}
        <button 
          className="btn btn-danger"
          onClick={this.handleDeleteClick}
          >
          Delete
        </button>
      </span>
      </div>
      <div>
        <hr className="hr-lines" />
      </div>
    </div>
  },
  changesButtons: function() {
    if(!this.state.textChanged) {
      return null
    }
    else {
      return [
        <button
          onClick={this.handleSaveClick}
          className="btn btn-success"
          >
          Save
        </button>,
        <button 
          onClick={this.handleUndoClick}
          className="btn btn-info"
          >
          Undo
        </button>
      ]
    }
  },
  handleSaveClick: function(event) {
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  },
  handleUndoClick: function(event) {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleTextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked}

    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick: function(event) {
    this.fb.remove();
  }
})