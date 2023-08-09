import React from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import './style.css'
import { msg3s } from "../../util/util";
import { UserForm, UserValidator } from './valid';

export default ()=> {
  const intl = useIntl();
  const [form, setForm] = React.useState<UserForm>({username:'', password: ''}); 
  return(
    <div className="user-view">
      {/* <p>After login, your data can be shared with azure</p> */}
      <div className='line'>
        <img className='logo' alt="logo" src='/vcluster.png'></img>  
      </div>
      <div className='line'>
        <h1 className='h1'>Sign in to VCluster</h1>
      </div>
      <form className='form'
      onSubmit={(e)=>{
        e.preventDefault();
        let valid_result = UserValidator.safeParse(form);
        if (!valid_result.success){
          const firsetError: VCluster.ZodErrorMessage = JSON.parse(valid_result.error.message)[0];
          console.error(firsetError.message);
          return msg3s(intl.formatMessage({
            id: firsetError.message,
          }), "warning");
        }
      }}>
        <label className='label'>
          username
        </label>
        <div className='line'>
          <input value={form.username}
          onChange={(e)=>setForm(pre=>{return{...pre,username: e.target.value}})} className='input' placeholder='username...'></input>
        </div>
        <label className='label'>
          password
        </label>
        <div className='line'>
          <input value={form.password}
          onChange={(e)=>setForm(pre=>{return{...pre,password: e.target.value}})}  className='input' placeholder='password...'></input>
        </div>
        <button className='button' type='submit'>submit</button>
      </form>
      <div className='go-create'>
        <div>No account? Create now!</div>
      </div>
    </div>
  )
}