const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

  // Slash command
  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === 'cluster') {

      const embed = new EmbedBuilder()
        .setTitle('20x 2Man Cluster Information')
        .setDescription('Server information & utility panel')
        .setColor('#00ffcc');

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('ips')
          .setLabel('IPs')
          .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId('mods')
          .setLabel('Mods')
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId('settings')
          .setLabel('Player Settings')
          .setStyle(ButtonStyle.Success)
      );

      await interaction.reply({
        embeds: [embed],
        components: [row]
      });
    }
  }

  // Button clicks
  if (interaction.isButton()) {

    if (interaction.customId === 'ips') {
      await interaction.reply({
        content: 'Ragnarok: 144.76.91.226:27045',
        ephemeral: true
      });
    }

    if (interaction.customId === 'mods') {
      await interaction.reply({
        content: 'Update Soon!',
        ephemeral: true
      });
    }

    if (interaction.customId === 'settings') {
      await interaction.reply({
        content:
`⚙️ **Player Settings**

❤️ HP: 15% Per Level  
🏃 Stam: 15% Per Level  
🌊 Oxy: 60% Per Level  
🍖 Food/Water: No Drain  
🎒 Weight: Infinite  
⚔️ Melee: 7.5% Per Level  
🏃‍♂️ Movement: 1.8% Per Level  
🔨 Crafting Skill: 15% Per Level (Use Crafting Skill Potion)  
🛡️ Fortitude: 10% Per Level`,
        ephemeral: true
      });
    }
  }
});

client.login(process.env.TOKEN);
