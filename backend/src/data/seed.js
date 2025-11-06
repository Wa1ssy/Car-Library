export default async (db) => {
    await db.Cars.findOrCreate({
        where: {name: "Volvo"},
        defaults: {
            name: "Volvo",
            model: "Mojang",
            releaseDate: new Date("1989-02-10T09:30Z"),
            price: "7100"
        },
    });
}