import axios from 'axios';
import { db} from '../assets/Constants'



const sendVerificationEmail = (email, subject, text, from, UserName) => {
    axios.post(`${db}/verifyEmail.php/` ,{
        to: email,
        subject: subject,
        text: text,
        from: from,
        userName: UserName,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => console.log(response.data))
        .catch(error => console.error('Error:', error));

      
  }

const notifyAdminEmail = (email, subject, organizationName, link ) => {
    axios.post(`${db}/notifyAdmin.php/` ,{
        to: email,
        subject: subject,
        text: organizationName,
        link: link,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => console.log(response.data))
        .catch(error => console.error('Error:', error));

      
  }


  export { sendVerificationEmail, notifyAdminEmail }
