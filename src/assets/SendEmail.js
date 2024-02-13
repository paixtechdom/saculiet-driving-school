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

const notifyAdminEmail = (email, subject, organizationName, link, firstname, lastname ) => {
    axios.post(`${db}/notifyAdmin.php/` ,{
        to: email,
        subject: subject,
        firstName: firstname,
        lastName: lastname,
        organizationName: organizationName,
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
