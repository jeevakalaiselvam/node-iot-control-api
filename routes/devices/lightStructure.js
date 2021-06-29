let info = {
    actions: {
        fade: {
            title: "Fade Light",
            description: "Dim light brightness to a specified level",
            input: {
                type: "object",
                properties: {
                    level: {
                        type: "integer",
                        minimum: 0,
                        maximum: 100,
                    },
                },
            },
        },
    },
};

module.exports = info;
