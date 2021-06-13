const searchBoxDropdown = document.querySelector(".search-box-dropdown");
function clearSearchBoxDropdown() {
  while(searchBoxDropdown.lastChild){
    searchBoxDropdown.removeChild(searchBoxDropdown.lastChild)
  }
}
const getDriver = async () => {
  const url = "http://ergast.com/api/f1/drivers.json?limit=1000";
  
  const response = await axios 
  .get(url)

  //create array for search conditions
  const driverArray = response.data.MRData.DriverTable.Drivers;
  
  //searchbar
  const searchBar = document.getElementById('searchBar')
  searchBar.addEventListener('keyup', (e) => {
    clearSearchBoxDropdown();
    const filteredDrivers = (driverArray.filter(driver => {
      const fullName = driver.givenName + " " + driver.familyName;
      return (
        fullName.toLowerCase().includes(e.target.value.toLowerCase())
        || driver.nationality.toLowerCase().includes(e.target.value.toLowerCase())
        || (driver.permanentNumber && driver.permanentNumber.includes(e.target.value))
        || driver.dateOfBirth.includes(e.target.value)
      )}));
      
      //search results
      console.log(filteredDrivers);
      filteredDrivers.slice(0,16).forEach(driver => {
       const p = document.createElement("p");
       p.innerText = driver.givenName + " " + driver.familyName + " " +driver.dateOfBirth + " " + driver.nationality;
        searchBoxDropdown.appendChild(p);
      })
  })
}
getDriver();