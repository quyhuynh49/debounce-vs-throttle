let timeout = null;

document.getElementById("search_field").addEventListener("input", (event) => {

  clearTimeout(timeout);

  timeout = setTimeout(() => {
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
  }, 1000);
  
});
