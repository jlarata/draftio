import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/* 
const MySwal = withReactContent(Swal);
 */

export function showSwal(text: string) {
  withReactContent(Swal).fire({
    text: `${text}`
    })
}