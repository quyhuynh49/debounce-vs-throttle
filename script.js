let timeout = null;

const debounce = (callback, deplay) => {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args); // spread operator
    }, deplay);
  };
};
const handleInputChange = (event) => {
  fetch(
    "https://dummyjson.com/users/search?" +
      new URLSearchParams({
        q: event.target.value,
      })
  )
    .then((resp) => resp.json())
    .then((resp) => {
      document.getElementById("result_box").innerHTML = "";
      if (resp?.users?.length) {
        resp.users.forEach((user) => {
          const textElement = document.createElement("p");
          const userName = document.createTextNode(
            `${user.firstName} ${user.lastName}`
          );
          textElement.appendChild(userName);

          document.getElementById("result_box").appendChild(textElement);
        });
      }
    })
    .catch((err) => {
      console.error("ERROR", err);
    });
};

document
  .getElementById("search_field")
  .addEventListener("input", debounce(handleInputChange, 1000));
