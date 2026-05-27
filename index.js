const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events
} = require('discord.js');

const { Rcon } = require('rcon-client');

let rcon;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, async () => {

  try {
    rcon = new Rcon({
      host: process.env.RCON_HOST,
      port: parseInt(process.env.RCON_PORT),
      password: process.env.RCON_PASSWORD
    });

    await rcon.connect();
    console.log("✅ Connected to ARK RCON");
  } catch (err) {
    console.error("❌ RCON failed:", err);
  }

  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

  // Slash command
if (interaction.isChatInputCommand()) {

  // /cluster command
  if (interaction.commandName === 'cluster') {

    const embed = new EmbedBuilder()
      .setTitle('10x 2Man Cluster Information')
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
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('rates')
        .setLabel('Rates')
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('drops')
        .setLabel('Drops')
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }

  // /testark command (SEPARATE)
  if (interaction.commandName === 'testark') {

    try {
      const response = await rcon.send('ListPlayers');

      await interaction.reply({
        content: `ARK Response: ${response}`,
        ephemeral: true
      });

    } catch (err) {
      await interaction.reply({
        content: 'RCON failed',
        ephemeral: true
      });
    }
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
    
    if (interaction.customId === 'rates') {
      await interaction.reply({
    content:
`📈 **Server Rates**

🦖 Taming: Instant
📦 Harvest: 10x
⚡ XP: 25x
🥚 Breeding: 10x
👶 Maturation: 25x
🐤 EggHatchSpeed: 10x
🔫 TurretDmg: 1x
💥 TurretCap: 115
☢️ BossNerf: 50%
✈️ TekEngrams: lvl120`,
    ephemeral: true
      });
    }

    if (interaction.customId === 'drops') {
  await interaction.reply({
    content:
`🎁 **Drop Information**

⚪ **White Drops**
• Boss Tributes

🟢 **Green Drops**
• Boss Tributes

🔵 **Blue Drops**
• Consumables

🟣 **Purple Drops**
• Saddles
• Chance for Saddle Blueprints

🟡 **Gold Drops**
• Taming Supplies

🔴 **Red Drops**
• Weapons
• Chance for Weapon Blueprints

⭐ **Boosted Drops**
• Better loot
• Higher quality items
• Increased quantities`,
    ephemeral: true
  });
}
  }
});

client.login(process.env.DISCORD_TOKEN);
