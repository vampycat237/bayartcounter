# bayartcounter.github.io
NOTE: Multi-bay support is still a WORK IN PROGRESS!
Current Multi-bay support features:
- Changing the amount of bays in a piece that have the same specifications (example: 2 flatcolor fullbodies with minimal shading and a tween animation)
- Adding new bays with different specifications (example: 1 flatcolor fullbody, 1 flatcolor halfbody)
- When the active bay is stored, it will look for exact matches of other bayfoxes on the list of bayfoxes, and if a match is found it will stack them together. This only happens when you store the active bay, which happens when you add a new bay currently, and will happen in the future when you switch bays as well.

Multi-bay support features to come:
- Switching between your different (groups of) bayfoxes (example: you have 1 flatcolor fullbody and 1 flatcolor halfbody, and have the halfbody selected, and need to change the shading on the fullbody)
- Removing a (group of) bayfoxes (example: you have 1 flatcolor fullbody and 1 flatcolor halfbody in your art, but you accidentally added a third group of 1 grayscale fullbody)
- Ability to save your calculations as a cookie, 100% opt-in! This would save your bayList, activeBay and ask you for a name to save it as.
- ^List of cookies you can load.

Because these features are still in progress, this version of the bay art counter has not been pushed to the main branch.

---

Vampy's Bay Art Counter is a web-based shell calculator for your bayfox art submissions!
It helps save time and has the potential to make art submission a bit more accessible.
Please let me know if you run into any bugs, or have a suggestion for how to improve the tool!

By the way, you are 100% ALLOWED to use any and all code from this project to make art point counters for other art RPGs!
It would be cool of you to credit me as the person who wrote all of this nightmare code if you do so.
For those of you who want to mess with this, all of the math for point calculations is in "shellcounter.js", helper methods are mostly in "arthelper.js", and the main functionality of the site is in "artmanager.js"!

Thank you and have a good one!
