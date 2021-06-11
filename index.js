const getDriver = () => {
  const url = "http://ergast.com/api/f1/drivers.json?limit=100";
  
  axios 
  .get(url)
  .then((res) => console.log(res.data))
  .catch((error) => console.error(error));
}
getDriver();
const searchBar = document.getElementById('searchBar')
  searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value);
  })