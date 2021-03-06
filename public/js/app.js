class TimersDashboard extends React.Component {
  // Before Inital Render, React initializes the component.state is set to an object with the property timers, a blank array is returned. 
  state = {
    timers: [],
  };

  componentDidMount() {
    this.loadTimersFromServer();
    setInterval(this.loadTimersFromServer, 5000);
  }

  loadTimersFromServer = () => {
    // Asyn call using client.js library to get Timers stored in our App Database
    client.getTimers((serverTimers) => (
      this.setState({ timers: serverTimers })
      )
    );
  }
  // .....

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  };

  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });

    client.createTimer(t);
  };

  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
  };

  updateTimer = (attrs) => {
    this.setState( {
      timers: this.state.timers.map((timer) => {
        if(timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project,
          });
        } else {
          return timer;
        }
      }),
    });

    client.updateTimer(attrs);
  };

  handleTrashClick = (timerId) => {
    this.deleteTimer(timerId);
  };

  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId),
    });

    client.deleteTimer(
      { id: timerId }
    );
  };

  handleStartClick = (timerId) => {
    this.startTimer(timerId);
  };

  startTimer = (timerId) => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map((timer) => {
        if(timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now,
          });
        } else {
          return timer;
        }
      }),
    });

    client.startTimer(
      { id: timerId, start: now}
    );
  };


  handleStopClick = (timerId) => {
    this.stopTimer(timerId);
  };

  stopTimer = (timerId) => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map((timer) => {
        if(timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null,
          });
        } else {
          return timer;
        }
      }),
    });

    client.stopTimer(
      { id: timerId, stop: now}
    );
  };

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
        {/* Main Parent Component have two Sub-Child Components */}
        {/* Component for Showing Timers */}
          <EditableTimerList 
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          {/* Component for Showing + Button */}
          <ToggleableTimerForm 
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
}

// ********************************************************************* //

class EditableTimerList extends React.Component {
  render() {
      const timers = this.props.timers.map((timer) => (
        <EditableTimer
          key={timer.id}
          id={timer.id}
          title={timer.title}
          project={timer.project}
          elapsed={timer.elapsed}
          runningSince={timer.runningSince}
          onFormSubmit={this.props.onFormSubmit}
          onTrashClick={this.props.onTrashClick}
          onStartClick={this.props.onStartClick}
          onStopClick={this.props.onStopClick}
        />
      ));

      return (
        <div id="timers">
          {timers}
        </div>
      );
  }
}

// ********************************************************************* //

class EditableTimer extends React.Component {
  state = {
    editFormOpen: false,
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({editFormOpen: false});
  };

  openForm = () => {
    this.setState({editFormOpen: true});
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        // Edit Timer 
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      ); 
    } else {
        return (
          // Current Timer
          <Timer
            id={this.props.id}
            title={this.props.title}
            project={this.props.project}
            elapsed={this.props.elapsed}
            runningSince={this.props.runningSince}
            onEditClick={this.handleEditClick}
            onTrashClick={this.props.onTrashClick}
            onStartClick={this.props.onStartClick}
            onStopClick={this.props.onStopClick}
          />
        );
    }
  }
}

// ********************************************************************* //

class TimerForm extends React.Component {
  state = {
    title: this.props.title || "",
    project: this.props.project || "",
  };

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  };

  handleProjectChange = (e) => {
    this.setState({project: e.target.value});
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      // Passes a data object, id is undefined in case of creating a new form
      id: this.props.id,
      title: this.state.title,
      project: this.state.project,
    });
  };

  render() {
    // Tweaked to check wheterh id is present or not
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Title</label>
              <input 
                type="text" 
                value={this.state.title} 
                // React's onChange attribute, React will invoke the function specified.
                onChange={this.handleTitleChange}
              />
            </div>
            <div className="field">
              <label>Project</label>
              <input 
                type="text" 
                value={this.state.project} 
                // React's onChange attribute, React will invoke the function specified.
                onChange={this.handleProjectChange}
              />
            </div>  
            <div className="ui two bottom attached buttons">
              <button 
                className="ui basic blue button"
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button 
                className="ui basic red button"
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ********************************************************************* //

class ToggleableTimerForm extends React.Component {
  state = {
    isOpen: false,
  };

  // This function will toggle the state of the form to open:
  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false });
  };

  render () {
    if (this.state.isOpen) {
      return (
        // TimerFom doesn't receive any props from ToggleableTimerForm, as such it's title and project fields will be rendered empty.
        <TimerForm 
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {  
      return (
        <div className="ui basic content center aligned segment">
          <button 
            className="ui basic button icon"
            onClick={this.handleFormOpen}
          >
            <i className="plus icon" />
          </button>
        </div>
      );
    }
  }
}

// ********************************************************************* //

class Timer extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleStartClick = () => {
    this.props.onStartClick(this.props.id);
  };

  handleStopClick = () => {
    this.props.onStopClick(this.props.id);
  };

  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  render() {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);
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
            <span 
              className="right floated edit icon"
              onClick={this.props.onEditClick}
            >
              <i className="edit icon" />
            </span>
            <span 
              className="right floated trash icon"
              onClick={this.handleTrashClick}
            >
              <i className="trash icon" />
            </span>
          </div>
        </div>
        <TimerActionButton
        // timerIsRunning --> !! returns false when runningSince is null. 
          timerIsRunning={!!this.props.runningSince}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
        />
      </div>
    );
  }
}

// ********************************************************************* //

class TimerActionButton extends React.Component {
  render() {
    // We render one HTML snippet or another based on this.props.timerIsRunning
    if (this.props.timerIsRunning) {
      return (
        <div
          className="ui botton attached red basic button"
          onClick={this.props.onStopClick}
        >
          Stop
        </div>
      );
    } else {
      return (
        <div  
          className="ui bottom attached green basic button"
          onClick={this.props.onStartClick}
        >
          Start
        </div>
      );
    }
  }
}

// ********************************************************************* //

ReactDOM.render(
  <TimersDashboard />,
  document.getElementById('content')
);

