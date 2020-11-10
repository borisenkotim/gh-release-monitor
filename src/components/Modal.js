import React from "react";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "", 
      repo: ""
    };
  }
  returnData = (event) => {
    event.preventDefault();
      let repoObj = {owner: this.state.owner, repo: this.state.repo}
      this.props.addRepo(repoObj);
      this.props.close();
  }
  update = (event) => {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value});
  }
  render() {
    return (
      <div className="modal" role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <center>
                <h3 className="modal-title">
                  <b>Search Repositories</b>
                </h3>
              </center>
            </div>
            <div className="modal-body">
              <form onSubmit={this.returnData}>
                <label>
                  Enter name of repo owner:
                  <br></br>
                  <input
                    className="form-center"
                    name="owner"
                    type="input"
                    size="35"
                    placeholder="Owner Name"
                    required={false}
                    value={this.state.owner}
                    onChange={this.update}
                  />
                  <br></br>
                  Enter Repository Name:
                  <br></br>
                  <input
                    className="form-center"
                    name="repo"
                    type="input"
                    size="35"
                    placeholder="Repo Name"
                    required={false}
                    value={this.state.repo}
                    onChange={this.update}
                  />
                </label>
                <br />
                <button
                  onClick={this.props.close}
                  className="btn btn-color-theme modal-submit-btn"
                >
                  <span></span>&nbsp;Cancel
                </button>
                <button type="submit"
                  className="btn btn-color-theme modal-submit-btn"
                >
                  <span></span>&nbsp;Add Repo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}