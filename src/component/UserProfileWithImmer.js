import { useImmer } from 'use-immer';
/**
 * UseImmer makes it simpler to manipulate multiple states without having to worry about immutability. 
 * Its really easy to use and simplified the workflow in updating the profile object. 
 */

export default function UserProfileWithImmer() {
    const [profile,setProfile] = useImmer({name:"isaac",email:"example@gmail.com",contactDetails:{address:"",phone:""},preference:{newsletter:true,notifications:""}})
    // Change phone number and address
    const updateContactDetails = (e) => {
        const {name,value} = e.target
        setProfile(draft => {
            draft.contactDetails[name] = value
        })
    }
    // Switch Newsletter preference
    const toggleNewsletterSubscription = () => {
        setProfile(draft => {
            draft.preference.newsletter = !draft.preference.newsletter
        })
    }

    return (
        <>
        <label htmlFor='address'>Address</label>
            <input type='text' name='address' onChange={updateContactDetails}></input>
        <label htmlFor='phone'>Phone</label>
            <input type='text' name='phone' onChange={updateContactDetails}></input>
            <button onClick={toggleNewsletterSubscription}>Toggle Newsletter</button>
        
        <pre>{JSON.stringify(profile)}</pre>
        </>
        
    )
}