const getDriver = () => {
  const url = "http://ergast.com/api/f1/drivers";
  
  axios 
  .get(url)
  .then((res) => console.log(res.data))
  .catch((error) => console.error(error));
}

getDriver();