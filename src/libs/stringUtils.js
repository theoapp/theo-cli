import Table from 'cli-table';

const maxLineLength = lines => {
  let max = 0;
  lines.split('\n').forEach(line => {
    if (line.length > max) {
      max = line.length;
    }
  });
  return max;
};

const getStripedLine = len => {
  let str = '+';
  for (let i = 0; i < len; i++) {
    str += '-';
  }
  return str + '+';
};

const dateKeys = ['expire_at', 'created_at', 'updated_at', 'last_used_at'];

export const outputVerticalTable = (obj, formatter) => {
  const table = new Table();
  Object.keys(obj).forEach(k => {
    let v = '';
    if (typeof obj[k] === 'object') {
      if (formatter && formatter[k]) {
        v = formatter[k](obj[k]);
      } else {
        v = JSON.stringify(obj[k]);
      }
    } else {
      if (dateKeys.includes(k)) {
        if (obj[k] > 0) {
          const date = new Date(obj[k]);
          v = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } else {
          v = '';
        }
      } else {
        v = obj[k];
      }
    }

    table.push({ [k]: v });
  });
  console.log(table.toString());
};

const parseTableRow = function(table, o) {
  const row = [];
  Object.keys(o).forEach(k => {
    if (dateKeys.includes(k)) {
      if (o[k] > 0) {
        const date = new Date(o[k]);
        row.push(date.toLocaleDateString() + ' ' + date.toLocaleTimeString());
      } else {
        row.push('');
      }
    } else {
      row.push(o[k]);
    }
  });
  table.push(row);
};

export const buildTable = obj => {
  if (obj.length > 0) {
    const first = obj[0];
    const head = Object.keys(first);
    const table = new Table({
      head
    });
    obj.forEach(o => {
      parseTableRow(table, o);
    });
    return table.toString();
  } else {
    return 'No items found';
  }
};

export const outputTable = obj => {
  console.log(buildTable(obj));
};

export const outputPaginableTable = obj => {
  if (obj.rows.length > 0) {
    const first = obj.rows[0];
    const head = Object.keys(first);
    const table = new Table({
      head
    });
    obj.rows.forEach(o => {
      parseTableRow(table, o);
    });
    console.log(table.toString());
  }
  const l = obj.rows.length;
  if (obj.total > 0) {
    console.log('Showing %s %s to %s of %s', l === 1 ? 'row' : 'rows', obj.offset + 1, obj.offset + l, obj.total);
  } else {
    console.log('No items found');
  }
};

export const outputJson = obj => {
  const s_obj = JSON.stringify(obj, null, 3);
  const lineLength = maxLineLength(s_obj);
  const sep = getStripedLine(lineLength);
  console.log(sep);
  console.log(s_obj);
  console.log(sep);
};

export const outputError = async err => {
  if (err.http_response) {
    try {
      const res = await err.http_response.json();
      outputJson(res);
    } catch (ex2) {
      console.error(err);
    }
  } else {
    console.error(err);
  }
};
