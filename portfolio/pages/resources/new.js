import 'bulma/css/bulma.css'
import axios from 'axios';
import { useState } from 'react';

const DEFAULT_DATA = {
    Name: "alex",
    password: "1234",
    email: "laxmikantswain93@gmail.com",
    country: "india",
    address: "Delhi hfxdhhhfgtjgyjgyh hfcfjgj"
 
}


const ResourceCreate = () => {
    const [form,setForm] = useState(DEFAULT_DATA);

const submitform = () => {
    axios.post("/api/resources",form)}

const reset = () => setForm(DEFAULT_DATA)
const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }


    return (
       <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="resource-form">
              <h1 className="title">Sign Up</h1>
              <form>
                <div className="field">
                  <label className="label">form</label>
                  <div className="control">
                    <input className="input" name="Name" value={form.Name} onChange={handleChange} type="text" placeholder="your name" />
                  </div>
                </div>
                <div className="field">
                 <input className="input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password"/>
                <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
                </span>
                </div>
                <div className="field">
                <label className="label">Email</label>
                <div className="control">
                <input className="input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="e.g. alexsmith@gmail.com"/>
                </div>
                </div>
                <div className="field">
                  <label className="label">country</label>
                  <div className="control">
                    <input className="input" name="country" value={form.country} onChange={handleChange} type="text" placeholder="origin" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">address</label>
                  <div className="control">
                    <textarea className="textarea" name="address" value={form.address} onChange={handleChange} placeholder="Textarea"></textarea>
                    </div>
                </div>
                <div className="field">
                <label className="label">Sex</label>
                <div className="control">
                <div className="select">
                <select>
                <option>Male</option>
                <option>Female</option>
                </select>
                </div>
                </div>
                </div>
                <div className="field">
                <div className="control">
                <label className="checkbox">
                <input type="checkbox"/>
                I agree to the <a href="#">terms and conditions</a>
                </label>
                </div>
                </div>
                <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={submitform}>Submit</button>
                 </div>
                 <div className="control">
                     <button className="button is-link is-light" onClick={reset}>
                        Reset</button>
                 </div>
                </div>
              </form>
            </div>
          </div>
        </div>  
        </div>
    )
}

export default ResourceCreate;