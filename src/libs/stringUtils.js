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
