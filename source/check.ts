import * as core from '@actions/core'
import * as github from '@actions/github'
import { GitHub } from '@actions/github/lib/utils';

export class Checker {
  private token: string;
  private octokit: InstanceType<typeof GitHub>;

  constructor() {
    this.token = core.getInput('token');
    this.octokit = github.getOctokit(this.token, {});
  }

  check(): Promise<void> {
    console.log("grabbing repo information");
    const latestRelease = this.octokit.rest.repos.getLatestRelease(github.context.repo);

    latestRelease.catch(err => {
      console.log(err);
      core.setFailed(err.message);
    })

    return latestRelease.then(repo_response => {
      const tag = repo_response.data.tag_name
      const date = repo_response.data.published_at;
      const date_value = Date.parse(date);

      console.log(`looking up for tag: ${tag}`);

      const request = {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        unitl: date,
        per_page: 100
      }

      return this.octokit.rest.repos.listCommits(request).then(commit_response => {
        console.log("reading commits");

        for (let I = 0; I < commit_response.data.length; I++) {
          const commit = commit_response.data[I];
          const commit_date = commit.commit.author.date;

          if (commit_date) {
            const commit_date_value = Date.parse(commit_date);

            if (commit_date_value < date_value) {
              core.setOutput("amount", I);
            }
          }
        }

        //Process all possible commits
        core.setOutput("amount", commit_response.data.length);
      });
    });
  }
}


