export const getData = async (data: string) => {
  try {
    const response = await fetch(`http://localhost:3100/${data}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
