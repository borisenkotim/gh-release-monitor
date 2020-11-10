import React from "react";
import Modal from "./Modal.js";
import Repository from "./Repository.js"
import { fetchRepo } from "./ApiCalls";


export default class HomePage extends React.Component {
  constructor() {
    super();
    // local storage will only store the owner name and repo name, no actual data
    this.state = {
      showModal: false,
      listOfRepos: []
    };
  }
  componentDidMount() {
     // localStorage.clear();
    for (var i = 0; i < localStorage.length; i++){
        const item = localStorage.getItem(localStorage.key(i));
        this.apiFetchData(JSON.parse(item));
    }
  }
  toggleShowModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };
  removeRepo = (myKey) => {
    let list = this.state.listOfRepos;
    for (var i = 0; i < list.length; i++) {
        if(list[i].key === myKey){
            list.splice(i, 1);
            localStorage.removeItem(myKey);
            this.setState({listOfRepos: list});
            return;
        }
    }
  }
  handleData = (repoObj) => {
      // APi call here to fetch repo data for repoObj data
      // and adding the new repo to the list of repos showing
      const repoName = repoObj.repo;
      if (localStorage.getItem(repoName) != null){
        alert("Item Already Exists");
      }
      else {
        let dataObject = {
            owner: repoObj.owner,
            repo: repoName,
            seen: "2020-11-03" //new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(Date.now())
        }
        localStorage.setItem(repoName,JSON.stringify(dataObject));
        this.apiFetchData(dataObject);
      }
  };

  apiFetchData = (repoObj) => {
    const repoName = repoObj.repo;
    fetchRepo(repoObj).then(data => {
        if (data.status === 200){
            // place data into repo component in list
            let list = this.state.listOfRepos;
            list.push(<li key={repoName}>{<Repository repoObj={repoObj} data={data} deleteRepo={this.removeRepo} seen={this.markSeen}/>}<br></br></li>);
            this.setState({
                listOfRepos: list
            }); 
        }
        else {
            alert("Could not find repo " + repoObj.repo + " with the owner " + repoObj.owner);
        }
      }).catch(err => {
        alert("Error! Could not find repo " + repoObj.repo + " with the owner " + repoObj.owner);
        localStorage.removeItem(repoName);
        console.log(err);
    });
  }

  markSeen = (repo) => {
    const data = JSON.parse(localStorage.getItem(repo));
    const newDataObject = {
        owner: data.owner,
        repo: repo,
        seen: new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(Date.now())
    }
    localStorage.removeItem(repo);   // needed to swap out the old data with the new
    localStorage.setItem(repo,JSON.stringify(newDataObject));
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <h1 className="App-header">Repository Tracker</h1>
        <button className="btn btn-alt-color-theme" onClick={this.toggleShowModal}>Add A Repo</button>
        {this.state.showModal ? (
          <Modal close={this.toggleShowModal} addRepo={this.handleData}/>
        ) : null}
        <div><br></br>{this.state.listOfRepos.length < 1 ? <h3 className="sub-title">No Saved Data</h3> : <ul>{this.state.listOfRepos}</ul>}</div>
      </div>
    );
  }
}
