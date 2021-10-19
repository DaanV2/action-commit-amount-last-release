# action-commit-amount-last-release

This action returns the amount of commits made since the last release

## Inputs

## `token`

**Optional** The token to use for github, defaults to github.token.

## Outputs

## `amount`

The amount of commits

## Example usage



```yml
  uses: actions/action-commit-amount-last-release@latest
  id: commit-amount

  run: echo ${{ steps.commit-amount.outputs.amount > 0 }} 
  if: ${{ steps.commit-amount.outputs.amount > 0 }}
```