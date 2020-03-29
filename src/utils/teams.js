const teams = [];

const addTeam = ({ id, name, room }) => {
    name = name.trim();
    room = room.trim().toLowerCase();

    if (!name || !room) return { error: 'Team name and room are required!' };

    const isExistingTeam = teams.find(team => team.room === room && team.name === name);

    if (isExistingTeam) return { error: 'Team name is in use!' };

    const score = 0;

    const team = { id, name, room, score }
    teams.push(team);
    return { team };
};

const removeTeam = (id) => {
    const index = teams.findIndex(team => team.id === id);
    if (index !== -1) return teams.splice(index, 1)[0];
};

const getTeam = id => teams.find(team => team.id === id);

const getTeamsInRoom = room => teams.filter(team => team.room === room);

module.exports = {
    addTeam,
    removeTeam,
    getTeam,
    getTeamsInRoom
};