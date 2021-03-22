import { format, formatDistance } from 'date-fns';
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

export function formatDateDistance(date) {
  return formatDistance(date, new Date(), { locale: ko });
}

export function makeChatTree(sort = 'recent', chat) {
  const hashTable = {};
  chat.forEach((item) => (hashTable[item.id] = { ...item, childNodes: [] }));

  const dataTree = [];

  chat.forEach((item) => {
    if (item.parentId === 0) {
      dataTree.push(hashTable[item.id]);
    } else {
      const child = hashTable[item.id];
      hashTable[item.parentId]['childNodes'].push(child);
    }
  });

  if (sort === 'recent') {
    return dataTree.reverse();
  } else if (sort === 'oldest') {
    return dataTree;
  }
}

export function extractURL(url) {
  const lastI = url.lastIndexOf('com');
  return url.slice(0, lastI + 3);
}
