var dropdown=document.getElementById('dropdown')
var Weatherresult=document.getElementById('Weatherresult')
let countrySelect=document.createElement("select")
countrySelect.id="country"
dropdown.appendChild(countrySelect)

let stateSelect=document.createElement("select")
stateSelect.id="state"
dropdown.appendChild(stateSelect)
document.getElementById("state").innerHTML = "<option>Select</option>";

let citySelect=document.createElement("select")
citySelect.id="city"
dropdown.appendChild(citySelect)
document.getElementById("city").innerHTML = "<option>Select</option>";

let result=document.createElement("div")
result.id="result"
Weatherresult.appendChild(result)

var countrySelectID=document.getElementById("country");
var stateSelectID=document.getElementById("state");
var citySelectID=document.getElementById("city");


var countryStateData;
var stateDataList;
var country;
var state;

function country(countryDataList){

    document.getElementById("country").innerHTML = "<option>Select</option>";
    for (var i = 0; i < countryDataList.length; i++) {
       if(countryDataList[i].states.length>0){
            var option = document.createElement("option");
            countryStateData=countryDataList
            option.value = countryDataList[i].name;
            option.text = countryDataList[i].name;
            countrySelect.appendChild(option);
        }    
    }

}

async function getCities(APIURL,country,state){
    
    var countryState=
        {
            "country": country,
            "state": state
        }
    
    await fetch(APIURL,{
        method:"POST",
        body:JSON.stringify(countryState),
        headers:{
            "content-type":"application/json;chatacterset=UTF-8"
        }

    })
    .then((response)=>response.json())
    .then((data)=>{
        
        var cityDataList=data.data
        if (cityDataList.length>0){
            document.getElementById("city").disabled=false;
            document.getElementById("city").innerHTML = "<option>Select</option>";
            for (var i = 0; i < cityDataList.length; i++) {
                var option = document.createElement("option");
                option.value = cityDataList[i];
                option.text = cityDataList[i];
                citySelect.appendChild(option);
            }        
         
        }else{
            
        }

    })
    .catch(error=>console.log("Error",error))
}

countrySelectID.addEventListener("change",event=>{
    country=event.target.value
    
    
    document.getElementById("state").innerHTML = "<option>Select</option>";
    for(let i=0;i<countryStateData.length;i++){
        if(countryStateData[i].name==country){
            stateDataList=countryStateData[i].states
            for (var j = 0; j < stateDataList.length; j++) {
                    var option = document.createElement("option");
                    option.value = stateDataList[j].name;
                    option.text = stateDataList[j].name;
                    stateSelect.appendChild(option);
                }    
        }

    }

})

// https://www.educba.com/pagination-in-javascript/

citySelectID.addEventListener("change",event=>{
    var city=event.target.value
    
    var weatherAPI="https://goweather.herokuapp.com/weather/"+city
    fetch(weatherAPI)
    .then((response)=>response.json())
    .then((data)=>{
       
        document.getElementById("result").innerHTML = `<div class=" row col-sm-12 card text-white bg-info mb-3 text-center" style="max-width: 18rem;"><p class="card-text">Temperature: ${data.temperature}</p> <p class="card-text">Wind : ${data.temperature}</p><p class="card-text" >Climate : ${data.description}</div>`;
    })
    .catch((error)=>{
        document.getElementById("result").innerHTML = `<div class=" row col-sm-12 card text-white bg-info mb-3 text-center" style="max-width: 18rem;"><p>Sorry Your expected data country:  ${country} State: ${state} City:${city}  data service currently not available. So please try it after some time</p></div>`;
    })
})

stateSelectID.addEventListener("change",event=>{
    state=event.target.value
    document.getElementById("city").disabled=true;
    let cityAPIURL="https://countriesnow.space/api/v0.1/countries/state/cities"
    getCities(cityAPIURL,country,state)
 
})

let urlCountry="https://countriesnow.space/api/v0.1/countries/states"
fetch(urlCountry)
.then(response => response.json())
.then(data=>country(data.data))
.catch(error=>console.log("Error",error))




