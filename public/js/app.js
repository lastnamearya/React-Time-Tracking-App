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
        <EditableTimer 
          title="Learn React"
          project="Web Domination"
          elapsed="8986300"
          runningSince={null}
          editFormOpen={false}
        />
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