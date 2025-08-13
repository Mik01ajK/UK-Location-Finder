**Git Version Fluency Example**

**1. Branching & Merging**
   Created a new test Branch using git checkout -b feature/demo-branch
   - Made a small change in my code
   - Commited the change
   - Swicthed back to main and merged my feature branch.
  
**2. Rebase & interactive Rebase**
   Created another feature branch which I will use for demo.
   - Made multiple small commits fixing typos
   - Used interactive rebase to squash the commits into one clean commit
  "git rebase -i HEAD~3" I used this code to open the text editor with the last 3 commits and I could choose what to do with each commit:

//Changed the second and third "pick" to "s" (short for squash) which will then show one clean commit
    pick a1b2c3 Add first change
    s d4e5f6 Add second change
    s g7h8i9 Add third change

 - Finally I pushed the rebased branch so the commits have been added into the main branch

**3. Undo Mistakes & Reset**

   Created another new branch so I can display commits I made git checkout -b feature/day3-practice
   - I made a commit with a deliberate mistake in a txt file
   - Used git reset --soft HEAD~1 to undo the commit but keep changes staged
   - Fixed the mistake and commited properly
   - Practiced using git reset --hard on a seperate file to discard any unwanted changes, this cannot be seen within the commmit history

