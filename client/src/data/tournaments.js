export const tournaments = [
    {
        id: 1,
        name: "Sobotní fóčo",
        ownerId: 1,
        type: "5V5",
        teams: [1, 2, 3, 4, 5, 6],
        isFinished: false,
        date: "18.11.2023",
        place: "Úvaly",
        prize: 5000,
    },
    {
        id: 2,
        name: "Chodovské derby",
        ownerId: 2,
        type: "5V5",
        teams: [6, 7, 8, 9],
        isFinished: false,
        date: "22.11.2023",
        place: "Westfield Chodov",
        prize: 10000,
    },
    {
        id: 3,
        name: "4fun fóčo",
        ownerId: 1,
        type: "5V5",
        teams: [1, 2, 3, 4, 5],
        isFinished: true,
        date: "30.11.2023",
        place: "Black Bridge",
        prize: 7000,
    },
    {
        id: 4,
        name: "Derby Sražských S",
        ownerId: 4,
        type: "11V11",
        teams: [1, 2],
        isFinished: true,
        date: "24.12.2023",
        place: "Eden",
        prize: 50000,
    },
]

export default tournaments;