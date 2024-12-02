import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './alerts.css'

/* 
const MySwal = withReactContent(Swal);
 */

export function successShowSwal(text: string) {
  withReactContent(Swal).fire({
    
    icon: 'success',
    title: 'Success!',
    text: `${text}`,
    backdrop: `
    rgba(134, 239, 172,0.4)
    no-repeat`,
    customClass: {
      popup : 'custom-class',
    },
    }
  )
}