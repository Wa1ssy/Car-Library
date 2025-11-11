export default async (db) => {
  const [volvo, carCreated] = await db.Cars.findOrCreate({
    where: { name: "Volvo" },
    defaults: {
      name: "Volvo",
      model: "240",
      releaseDate: new Date("1989-02-10T09:30:00.000Z"),
      price: "7100.00",
    },
  });
  console.log("Car created:", carCreated);

  const [driver, userCreated] = await db.Users.findOrCreate({
    where: { username: "opilane" },
    defaults: {
      username: "opilane",
      password: "$2a$10$OjEII2iqxMpjdd8kSEZty.ZNVVqLjm1YtHDWBpqxyMstdV09XlfSy",
    },
  });
  console.log("User created:", userCreated);

  const [carPlay, carPlayCreated] = await db.CarPlays.findOrCreate({
    where: { id: 1 },
    defaults: {
      CarId: volvo.id,
      UserUsername: driver.username,
      driveTimeMinutes: 120,
    },
  });
  console.log("Car Play created:", carPlayCreated);

  console.dir(carPlay.get({ plain: true }), { depth: null });
};
