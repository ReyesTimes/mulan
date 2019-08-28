function renderPhone(telephone) {
    if (telephone) {
        return `Teléfono: ${telephone}`;
    }

    return '';
};

module.exports = function renderMessage(data) {
    return `
        Nombre: ${data.name},
        ${renderPhone(data.telephone)}
        Email: ${data.email},
        Mensaje: ${data.description},
    `;
};