import { ToastContainer, toast } from 'react-toastify';

const Validation = (user,email,message) =>{
    const notify = (data) => toast(data);
    if(user && email && message){        
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat)){
            return true
        }else{
            notify('Email id is not correct!')    
        }
    }else{
        notify('Please filled all the field!')        
        return false
    }
}

export default Validation