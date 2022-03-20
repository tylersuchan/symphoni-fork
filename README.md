# symphoni
## Overview
A fork of Symphoni, a webapp integrated with spotify allowing users to create a shared playlist for any celebration. I forked this repo as a side project to use my experience to try and improve upon the baseline implementation. This will improve the repo with up-to-date standards and break up each component within its own microservice. 

## Backend Todos
- ✅ The requirements.txt needs to be updated with the proper versions of each library required.
- Currently, app.py loads in a 'config.ini' file, and there is no documentation providing what is required from it. Create a template file that documents which values it requires
- There's no docstrings on any of the functions
- Perhaps look into documentation as code?
- There's no DB - we used a global dictionary at the time. Persistent DB storage would be nice
- Containerize symphoni-api
## Frontend Todos
- Don't even think about it till the backend is ready!