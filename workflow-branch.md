# Git Branching & Pull Request Workflow

## The Big Picture

A branch is a **separate line of work** created from `main`.

Instead of making changes directly to `main`, you create a branch, do your work there, and then propose merging that work back into `main` through a **Pull Request (PR)**.

```text
                    ┌── feature branch ── work ── commit ── push ──┐
                    │                                               │
main ───────────────●───────────────────────────────────────────────●
                    │                                               │
                    └────────────── Pull Request → Merge ───────────┘
```

Think of it as:

> **Main = the shared, stable version of the project.**
> **Branch = your temporary workspace for a specific change.**

---

# 1. Start on `main`

Before starting new work, make sure you're on `main`:

```bash
git switch main
```

Then make sure your local `main` has the latest version from GitHub:

```bash
git pull
```

Your goal:

```text
Your computer                 GitHub

main ──────────────────────── main
       same version
```

---

# 2. Create a Branch

Create a branch for the work you're about to do:

```bash
git switch -c branch-name
```

For example:

```bash
git switch -c add-product-filter
```

This does two things:

1. Creates the branch.
2. Immediately switches you onto it.

Now:

```text
main
  │
  ●
   \
    ●  ← add-product-filter
```

Your new branch starts with the current state of `main`.

### Check which branch you're on

```bash
git branch
```

The `*` shows your current branch:

```text
  main
* add-product-filter
```

---

# 3. Do Your Work

Now work normally in VS Code.

Modify your files, test the application, and make sure your changes work.

Your changes exist only on your branch at this point.

```text
main ───────────────●

add-product-filter ─●──●──●
                       ↑
                    your work
```

`main` has not been changed.

---

# 4. Commit Your Work

Once your changes are ready:

```bash
git add .
```

Then create a commit:

```bash
git commit -m "Add product filter"
```

A commit is a **checkpoint** in your branch.

Think:

> "This is a meaningful version of my work that I want Git to remember."

You can make multiple commits while working.

---

# 5. Push Your Branch to GitHub

Your branch currently exists on your computer.

Push it to GitHub:

```bash
git push -u origin branch-name
```

For example:

```bash
git push -u origin add-product-filter
```

Now the branch exists in both places:

```text
Your computer                 GitHub

add-product-filter ────────── add-product-filter
```

The `-u` connects your local branch to its GitHub counterpart so future pushes can usually be done with:

```bash
git push
```

---

# 6. Create a Pull Request

Go to your repository on GitHub.

GitHub will usually show a button such as:

**Compare & pull request**

Click it.

You should see:

```text
base: main
compare: add-product-filter
```

This means:

> "I want to propose merging `add-product-filter` into `main`."

### Important

Creating a Pull Request **does not merge anything yet**.

The PR is a request for the changes to be reviewed and merged.

---

# 7. Review the Pull Request

Before merging, inspect:

### Files changed

Make sure the changes are what you intended.

### Commits

Make sure the expected commits are present.

### Direction

Make sure it says:

```text
add-product-filter → main
```

You are proposing:

```text
branch → main
```

not the other way around.

---

# 8. Merge the Pull Request

Once the changes have been reviewed and you're ready to merge:

Click:

**Merge pull request**

Then confirm the merge.

The changes from your branch are now incorporated into `main`.

Conceptually:

```text
BEFORE

main ─────────────●
                  \
branch ────────────●──●──●
                         ↑
                    your changes


AFTER

main ─────────────●──●──●
                     ↑
                merged changes
```

The branch's work is now part of `main`.

---

# 9. Return to Local `main`

After the PR is merged, switch back to `main`:

```bash
git switch main
```

Your local `main` may not yet contain the merge that happened on GitHub.

So update it:

```bash
git pull
```

Now:

```text
Your computer                 GitHub

main ──────────────────────── main
       same version
```

You are ready to start the next piece of work.

---

# 10. Delete the Finished Branch

Once the branch has been merged, you usually don't need it anymore.

Delete your local branch:

```bash
git branch -d branch-name
```

For example:

```bash
git branch -d add-product-filter
```

You can also delete the branch on GitHub from the merged Pull Request using GitHub's **Delete branch** button.

This is normal.

The branch was a temporary workspace for a specific change. Once its work is merged into `main`, the branch has served its purpose.

---

# The Complete Workflow

For future work, this is the sequence to remember:

```text
1. Switch to main
   git switch main

          ↓

2. Get the latest main
   git pull

          ↓

3. Create and switch to a branch
   git switch -c branch-name

          ↓

4. Make your changes
   VS Code

          ↓

5. Commit your changes
   git add .
   git commit -m "Describe the change"

          ↓

6. Push the branch to GitHub
   git push -u origin branch-name

          ↓

7. Create Pull Request
   branch → main

          ↓

8. Review the changes

          ↓

9. Merge Pull Request
   branch → main

          ↓

10. Switch back to main
    git switch main

          ↓

11. Get the merged changes
    git pull

          ↓

12. Delete the finished branch
    git branch -d branch-name
```

---

# The Mental Model

Don't think of Git branches as completely separate copies of your project.

Think of them as **different lines of development**.

```text
                         feature A
                        /         \
main ───────●──────────●──────────●
             \
              \
               feature B
                  \
                   ●──●
```

`main` represents the integrated project.

A feature branch lets you work independently:

```text
main
  │
  └── feature branch
          │
          ├── edit
          ├── test
          ├── commit
          └── push
                │
                ↓
          Pull Request
                │
                ↓
             main
```

The branch protects `main` from unfinished work.

The Pull Request provides the **review and integration point**.

---

# The Four Git Locations to Understand

A useful way to think about your workflow is that your code moves through several places:

```text
VS Code
   ↓
Local Git repository
   ↓
GitHub branch
   ↓
GitHub main
```

More specifically:

```text
WORK
VS Code
   ↓
git add
   ↓
Staging area
   ↓
git commit
   ↓
Local branch
   ↓
git push
   ↓
GitHub branch
   ↓
Pull Request
   ↓
Merge
   ↓
GitHub main
   ↓
git pull
   ↓
Local main
```

You don't need to memorize every internal Git mechanism yet.

The important idea is:

> **You work on a branch, commit your work, push it to GitHub, propose it through a Pull Request, merge it into `main`, then update your local `main`.**

That is the core branching workflow.
