const embeds = {
  user: {
    color: 12115178,
    title: 'user',
    // description: 'Status: ',
    fields: [
      {
        name: 'Actions',
        value: '-',
      }
    ],
    timestamp: new Date(),
  },

  tile: {
    color: 12115178,
    title: '(0, 0)',
    description: 'Status: ',
    fields: [
      {
        name: 'Actions',
        value: '-',
      }
    ],
    timestamp: new Date(),
  }
}

module.exports = embeds;