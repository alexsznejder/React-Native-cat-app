import axios from "axios";

const instance = axios.create({
  baseURL: "http://4730c0ef.ngrok.io",
  headers: {
    "Content-Type": "application/json"
  }
});

export const getSensorsData = async () => {
  const response = await instance.get("/");
  return response.data;
};

export const getMotionSensorData = async () => {
  const response = await instance.get("/motion");
  return response;
};

export const getThermometerData = async () => {
  const response = await instance.get("/thermometer");
  return response;
};

export const getLiquidSensorData = async () => {
  const response = await instance.get("/liquid");
  return response.data;
};

export const getDistanceSensorData = async () => {
  const response = await instance.get("/distance");
  return response;
};

export const resetMotionSensor = async () => {
  await instance.post("/reset", {
    motion: true
  });
};

export const resetDistanceSensor = async () => {
  await instance.post("/reset", {
    distance: true
  });
};
