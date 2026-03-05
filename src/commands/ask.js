const { SlashCommandBuilder } = require("discord.js");
const { askOpenAI } = require("../utils/openai");
const { getConversation, addMessage } = require("../utils/memory");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask the AI something")
    .addStringOption(option =>
      option.setName("question")
        .setDescription("Your question")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const userId = interaction.user.id;
    const question = interaction.options.getString("question");

    addMessage(userId, "user", question);

    const conversation = getConversation(userId);

    const response = await askOpenAI(conversation);

    addMessage(userId, "assistant", response);

    await interaction.editReply(response.substring(0, 2000));
  }
};