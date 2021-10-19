import { Checker } from './check';
import * as core from '@actions/core'

//Start code
try {
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // token: ${{ secrets.GITHUB_TOKEN }}
  core.setOutput("amount", -1);

  const checker = new Checker();
  const p = checker.check();

  p.then(() => console.log("Done!"));
  p.catch(handle_error);

} catch (error) {
  handle_error(error);
}

function handle_error(error: any): void {
  let message: string;

  if (error.message)
    message = error.message;
  else
    message = JSON.stringify(error);

  if (core)
    core.setFailed(message);

  else {
    console.log(message);
    process.exit(1);
  }
}