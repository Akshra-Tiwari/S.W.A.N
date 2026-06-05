const User = require("../models/User");

const getMe = async (req, res) => {
try {
const user = await User.findOne({
uid: req.user.uid,
});

```
if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

res.json(user);
```

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

const syncUser = async (req, res) => {
try {
const {
uid,
name,
email,
} = req.user;

```
let user = await User.findOne({
  uid,
});

if (!user) {
  user = await User.create({
    uid,
    name: name || "",
    email,
  });
}

res.status(200).json(user);
```

} catch (error) {
res.status(500).json({
message: "Failed to sync user",
});
}
};

module.exports = {
syncUser,
getMe,
};
