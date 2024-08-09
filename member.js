function skillsMembers() {
  return {
    name: 'skills',
    members: [
      {
        name: 'add',
        help: 'Add a new skill to your profile',
        run: async (context, args) => {
          const skill = args[0];
          if (!skill) {
            throw new Error('Please provide a skill to add');
          }

          const { data } = await context.octokit.rest.users.getAuthenticated();
          const skills = data.bio.match(/Skills:.*/g);

          if (skills) {
            const newSkills = skills[0] + `, ${skill}`;
            const newBio = data.bio.replace(skills[0], newSkills);
            await context.octokit.rest.users.updateAuthenticated({ bio: newBio });
          } else {
            await context.octokit.rest.users.updateAuthenticated({ bio: `Skills: ${skill}` });
          }
        },
      },
      {
        name: 'remove',
        help: 'Remove a skill from your profile',
        run: async (context, args) => {
          const skill = args[0];
          if (!skill) {
            throw new Error('Please provide a skill to remove');
          }

          const { data } = await context.octokit.rest.users.getAuthenticated();
          const skills = data.bio.match(/Skills:.*/g);

          if (skills) {
            const newSkills = skills[0].replace(new RegExp(`, ${skill}`), '');
            const newBio = data.bio.replace(skills[0], newSkills);
            await context.octokit.rest.users.updateAuthenticated({ bio: newBio });
          }
        },
      },
    ],
  };
}