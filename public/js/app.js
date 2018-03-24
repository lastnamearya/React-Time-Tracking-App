class TimersDashboard extends React.Component {
  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
        {/* Main Parent Component have two Sub-Child Components */}
        {/* Component for Showing Timers */}
          <EditableTimerList />
          {/* Component for Showing + Button */}
          <ToggleTimerForm
          // Passing additional Prop isOpen={true}, when true display the form to create new timer
            isOpen={true}
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
          title="Learn Extreme ironing"
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