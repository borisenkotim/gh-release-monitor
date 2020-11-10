import React from "react";

export default class Repository extends React.Component {
  constructor(props) {
    super(props);
    const repo = this.props.data;
    let lastReleaseDate = "N/A";
    let lastVersion = "";
    let newestUrl = "";
    if (repo != null) {
      if (repo.data != null && repo.data.length > 0) {
        let latest = repo.data[0]; // gets the most recent repo release data, first item in list
        let str = latest.created_at; // gets release date
        lastReleaseDate = str.split("T")[0]; // extracts the part of date we need
        lastVersion = latest.tag_name; // gets version ID
        newestUrl = latest.html_url; // gets url to newest release
      }
    }
    this.state = {
      realeaseDate: lastReleaseDate,
      version: lastVersion,
      newRelease: true,
      url: newestUrl,
    };
  }
  delete = () => {
    // makes call to get this component (repo) removed from the page and local storage
    this.props.deleteRepo(this.props.repoObj.repo);
  };
  seen = () => {
    // triggers the update to make the last seen date be today
    this.props.seen(this.props.repoObj.repo);
  };
  isNewRelease = () => {
    // determines if the release date is more recent than the last seen date
    let realeaseDate = this.state.realeaseDate.split("-");
    let seenDate = this.props.repoObj.seen.split("-");
    if (this.state.newRelease === false) return false;
    if (realeaseDate[0] > seenDate[0]) {
      return true;
    } else if (
      realeaseDate[0] === seenDate[0] &&
      realeaseDate[1] > seenDate[1]
    ) {
      return true;
    } else if (
      realeaseDate[0] === seenDate[0] &&
      realeaseDate[1] === seenDate[1] &&
      realeaseDate[2] > seenDate[2]
    ) {
      return true;
    } else {
      return false;
    }
  };
  openNewTab = () => {
    // opens the release details in new tab
    let newPageUrl = this.state.url;
    window.open(newPageUrl, "_blank");
  };
  render() {
    return (
      <div className="repo-block">
        <button className="close" onClick={this.delete}>
          &times;
        </button>
        <div className="repo-name">{this.props.repoObj.repo}</div>
        <div className="repo-release-date">
          Latest Version: {this.state.version}
        </div>
        <div className="repo-release-date">
          Latest Release: {this.state.realeaseDate}
        </div>
        <div>
          <button className="btn-bottom" onClick={this.openNewTab}>
            Details
          </button>
          {this.isNewRelease() ? (
            <button className="btn-bottom new" onClick={this.seen}>
              New! Mark As Seen
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
