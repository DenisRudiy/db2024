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

export const delData = async (data: string, id: number) => {
  try {
    const response = await fetch(`http://localhost:3100/${data}/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
