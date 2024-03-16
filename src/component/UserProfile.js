import { useState } from 'react';

/* 
I made a shallow copy of the profile object and the nested address object to ensure immutability . Creating a new object and spreading old
properties and values allow for a new object memory location that triggers useState to rerender the application with new values.

*/

export default function UserProfile() {
    const [profile, setProfile] = useState({ name: "Isaac", email: "example@google.com", address: { street: "", city: "", country: "" } });
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
   
    const handleStreet = (e) => {
        //console.log(e.target.value);
        setStreet(e.target.value);
    };
    const handleCity = (e) => {
        //console.log(e.target.value);
        setCity(e.target.value);
    };
    const handleCountry = (e) => {
        //console.log(e.target.value);
        setCountry(e.target.value);
    };
    const handleUpdate = () => {
        setProfile( {...profile, address : {...profile.address,street:street,city:city,country:country}})
    }

    return (<>
        <div>
            <label HTMLFor="street">Street</label>
            <input type="text" name="street" onChange={handleStreet}></input>
            <label HTMLFor="city">City</label>
            <input type="text" name="city" onChange={handleCity}></input>
            <label HTMLFor="country" onChange={handleCountry}>Country</label>
            <input type="text" name="country" onChange={handleCountry}></input><button onClick={handleUpdate}>Update</button>
            <pre>{JSON.stringify(profile)}</pre>
        </div>

    </>);
}