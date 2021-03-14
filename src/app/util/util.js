import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export default function formatDate(date, formatStr = 'yyyy년 MM월 dd일, hh:mm aaa') {
  return format(date, formatStr, { locale: ko });
}
