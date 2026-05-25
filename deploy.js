require('dotenv').config();

const { REST, Routes, SlashCommandBuilder } = require('discord.js');

console.log("TOKEN CHECK:", process.env.DISCORD_TOKEN);

const commands = [
  new SlashCommandBuilder()
    .setName('cluster')
    .setDescription('Show cluster info'),

  new SlashCommandBuilder()
    .setName('testark')
    .setDescription('Test ARK RCON connection')
].map(command => command.toJSON());

const rest = new REST({ version: '10' })
  .setToken(process.env.DISCORD_TOKEN);

(async () => {
  await rest.put(
    Routes.applicationCommands('1508475227804274790'),
    { body: commands }
  );

  console.log('Commands registered');
})();