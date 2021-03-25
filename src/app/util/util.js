import { format, formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale';

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const debounce = (fn, ms, forceNow = true) => {
  let interval;
  return () => {
    if (interval && !forceNow) clearTimeout(interval);

    interval = setTimeout(() => {
      fn();
      if (forceNow) interval = null;
    }, ms);

    if (forceNow && !interval) fn();
  };
};

export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export default function formatDate(date, formatStr = 'yyyy년 MM월 dd일, hh:mm aaa') {
  if (!date) return;
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

export const matchURLRegex = (value) => {
  // eslint-disable-next-line no-useless-escape
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  return value.match(regex);
};

export function extractURL(url) {
  if (!url) return;

  const http = url.indexOf('www');
  const com = url.lastIndexOf('com');

  return url
    .slice(http + 3, com)
    .split('.')
    .filter((url) => url)
    .map((url) => url.slice(0, 1).toUpperCase() + url.slice(1))[0];
}
