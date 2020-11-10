import { Octokit } from "@octokit/core";

const octokit = new Octokit();

export async function fetchRepo(repoObject) {
  // api call to fetch github repo data for a specifc repo based on params passed in (repoObject)
  const response = await octokit.request("GET /repos/{owner}/{repo}/releases", {
    owner: repoObject.owner,
    repo: repoObject.repo,
  });
  return response;
}
