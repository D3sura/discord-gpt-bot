const conversations = new Map();

function getConversation(userId) {
  if (!conversations.has(userId)) {
    conversations.set(userId, [
      { role: "system", content: "You are a helpful Discord assistant." }
    ]);
  }
  return conversations.get(userId);
}

function addMessage(userId, role, content) {
  const convo = getConversation(userId);
  convo.push({ role, content });
}

module.exports = { getConversation, addMessage };