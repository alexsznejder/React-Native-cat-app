import Cat from "../models/Cat";
import Product from "../models/Product";

export const CATS = [
  new Cat(1, "Naboki", "male", "2016-07-23", "other", true, 4.9, null),
  new Cat(2, "Goya", "female", "2018-05-08", "other", true, 5.2, null)
];

export const SENSORS = [
  {
    id: 1,
    name: "Sensor in the cuvette",
    active: true,
    value: 5
  },
  {
    id: 2,
    name: "Sensor in the water bowl",
    active: false,
    value: 10
  }
];
