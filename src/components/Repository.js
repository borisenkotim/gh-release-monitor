import React from "react";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    const repo = this.props.data;
    let lastReleaseDate = "N/A";
    let lastVersion = "";
    let newestUrl = "";
    if (repo != null) {
      if (repo.data != null && repo.data.length > 0) {
        let latest = repo.data[0];
        let str = latest.created_at;
        lastReleaseDate = str.split("T")[0];
        lastVersion = latest.tag_name;
        newestUrl = latest.html_url;
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
    this.props.deleteRepo(this.props.repoObj.repo);
  };
  seen = () => {
    this.props.seen(this.props.repoObj.repo);
  };
  isNewRelease = () => {
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
        {this.isNewRelease() ? (
          <div className="repo-new-release">
            <button className="btn-bottom" onClick={this.openNewTab}>
              New
            </button>
            <button className="btn-bottom" onClick={this.seen}>
              Mark As Seen
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
