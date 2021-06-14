const searchBoxDropdown = document.querySelector(".search-box-dropdown");
const searchButton = document.querySelector("#search")
const jubran = document.querySelector("#searchBar");

const userInput = document.getElementById(searchBar)
function clearSearchBoxDropdown() {
  while(searchBoxDropdown.lastChild){
    searchBoxDropdown.removeChild(searchBoxDropdown.lastChild)
  }
}
const getDriver = async () => {
  const url = `https://ergast.com/api/f1/2021/drivers.json?`;
  
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
        filteredDrivers.slice(0,16).forEach(driver => {
          const p = document.createElement("p");
          p.innerText = driver.givenName + " " + driver.familyName
          searchBoxDropdown.appendChild(p);
        })
      })
    }
    getDriver();
    const getCurrentDriver = async () => {
      const currentDriver = jubran.value.toLowerCase();
      const response = await axios.get(`https://ergast.com/api/f1/2021/drivers/${currentDriver}.json?`)
      const driverDetails = response.data.MRData.DriverTable.Drivers[0];
      console.log(response);
      displayDriver(driverDetails);
    };

    const displayDriver = (driverDetails) => {
      const displayDetails= document.querySelector('.driver');
      const displayName = document.createElement('displayName');
      displayName.innerText = driverDetails.givenName + " " + driverDetails.familyName + " " + driverDetails.permanentNumber + " " + driverDetails.dateOfBirth + " " + driverDetails.nationality; 
      displayDetails.appendChild(displayName)
      console.log(driverDetails);
    }
    jubran.addEventListener('change', getCurrentDriver)

    // searchButton.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   getData();
    // })