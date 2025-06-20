export function formatMessageTime(date) {
  if (!date) return '';
  const messageDate = new Date(date);
  if (isNaN(messageDate.getTime())) return '';
  
  return messageDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}