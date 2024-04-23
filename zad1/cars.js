const cars = [
    {id: 1, make: "Toyota", model: "Yaris", year: 2001, color: "white"},
    {id: 2, make: "Ford", model: "Fiesta", year: 2015, color: "black"},
    {id: 3, make: "BMW", model: "M2", year: 2021, color: "blue"},
    {id: 4, make: "Mercedes", model: "EQS", year: 2023, color: "white"},
    {id: 5, make: "Volkswagen", model: "Passat", year: 2017, color: "black"}
];

const getCars = () => cars;

const getCarInformation = (id) => {
  const car = cars.find(car => car.id === id);
  if (car) {
    const { make, model, year, color } = car;
    return `Make: ${make}, Model: ${model}, Year: ${year}, Color: ${color}.`;
  } else {
    return "Car doesn't exist";
  }
};

const getCarAge = (id) => {
  const car = cars.find(car => car.id === id);
  if (car) {
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - car.year;
    return `Car is ${carAge} years old.`;
  } else {
    return "Car doesn't exist";
  }
};

module.exports = {getCars, getCarInformation, getCarAge};