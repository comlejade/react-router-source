export let UserApi = {
  list() {
    let userList = localStorage.getItem("users");
    let users = userList ? JSON.parse(userList) : [];
    return users;
  },
  add(user) {
    let users = UserApi.list();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  },
  find(id) {
    let users = UserApi.list();
    return users.find((user) => user.id === id);
  },
};
