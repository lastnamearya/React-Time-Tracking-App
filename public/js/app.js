class TimersDashboard extends React.Component {
  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
        {/* Main Parent Component have two Sub-Child Components */}
        {/* Component for Showing Timers */}
          <EditableTimerList />
          {/* Component for Showing + Button */}
          <ToggleableTimerForm
          // Passing additional Prop isOpen={true}, when true display the form to create new timer
            isOpen={false}
          />
        </div>
      </div>
    );
  }
}

class EditableTimerList extends React.Component {
  render() {
    return (
      <div id="timers">
      {/* This component will render the Timer's Face */}
        <EditableTimer 
        // Passing additonal props to our EditableTimer Component
          title="Learn React"
          project="Web Domination"
          elapsed="8986300"
          runningSince={null}
          // Edit form
          editFormOpen={false}
        />
        {/* This Component will render a Timer's Edit Form */}
        <EditableTimer 
          title="Learn Component in-depth"
          project="World Domination"
          elapsed="3890985"
          runningSince={null}
          editFormOpen={true}
        />
      </div>
    );
  }
}

class EditableTimer extends React.Component {
  render() {
    if (this.props.editFormOpen) {
      return (
        // Edit Timer 
        <TimerForm
          title={this.props.title}
          project={this.props.project}
        />
      ); 
    } else {
        return (
          // Current Timer
          <Timer
            title={this.props.title}
            project={this.props.project}
            elapsed={this.props.elapsed}
            runningSince={this.props.runningSince}
          />
        );
    }
  }
}

class TimerForm extends React.Component {
  render() {
    // this.props.title to determine what text the submit button at the bottom of the form should display. If title is present, we know we're editing an existing timer, so it displays update. Otherwise it displays "Create".
    const submitText = this.props.title ? 'Update' : 'Create';
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Title</label>
              <input type="text" defaultValue={this.props.title} />
            </div>
            <div className="field">
              <label>Project</label>
              {/* defaultValue - React Property, when the form is used for editing as it is here, this set the fields to current values of the timer as desired */}
              <input type="text" defaultValue={this.props.project} />
            </div>  
            <div className="ui two bottom attached buttons">
              <button className="ui basic blue button">
                {submitText}
              </button>
              <button className="ui basic red button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ToggleableTimerForm extends React.Component {
  render () {
    if (this.props.isOpen) {
      return (
        // TimerFom doesn't receive any props from ToggleableTimerForm, as such it's title and project fields will be rendered empty.
        <TimerForm />
      );
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button className="ui basic button icon">
            <i className="plus icon" />
          </button>
        </div>
      );
    }
  }
}

class Timer extends React.Component {
  render() {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed);
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">
            {this.props.title}
          </div>
          <div className="meta">
            {this.props.project}
          </div>
          <div className="center aligned description">
            <h2>
              {elapsedString}
            </h2>
          </div>
          <div className="extra content">
            <span className="right floated edit icon">
              <i className="edit icon" />
            </span>
            <span className="right floated trash icon">
              <i className="trash icon" />
            </span>
          </div>
        </div>
        <div className="ui bottom attached blue basic button">
          Start
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <TimersDashboard />,
  document.getElementById('content')
);