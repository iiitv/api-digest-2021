export const formatDate = (time) =>
  new Date(time * 1000).toLocaleDateString("en-In");
