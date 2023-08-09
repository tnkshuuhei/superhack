const formatDecodedData = (item) => {
  if (!item || !item.decodedDataJson) return null;

  const decoded = JSON.parse(item.decodedDataJson);
  const formatted = {};

  decoded.forEach((entry) => {
    formatted[entry.name] = entry.value.value;
  });

  return {
    ...item,
    ...formatted,
  };
};

export default formatDecodedData;
