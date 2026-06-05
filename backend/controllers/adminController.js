const User =
require("../models/User");

const Report =
require("../models/Report");

const getAllUsers =
async (req,res) => {

  const users =
  await User.find()
  .sort({
    createdAt:-1
  });

  res.json(users);
};

const updateUserRole =
async (req,res) => {

  const user =
  await User.findByIdAndUpdate(

    req.params.id,

    {
      role:req.body.role
    },

    {
      new:true
    }
  );

  res.json(user);
};

const getAdminStats =
async (req,res) => {

  const totalUsers =
  await User.countDocuments();

  const totalReports =
  await Report.countDocuments({
    isDeleted:false
  });

  const pendingReports =
  await Report.countDocuments({
    status:"pending"
  });

  const resolvedReports =
  await Report.countDocuments({
    status:"resolved"
  });

  res.json({

    totalUsers,

    totalReports,

    pendingReports,

    resolvedReports

  });

};
const getAllReports =
async(req,res)=>{

const reports =
await Report.find({
isDeleted:false
})
.sort({
createdAt:-1
});

res.json(reports);

};

const deleteUser =
async(req,res)=>{

await User.findByIdAndDelete(

req.params.id

);

res.json({

message:
"User deleted"

});

};

module.exports = {

  getAllUsers,

  updateUserRole,

  getAdminStats,

  getAllReports,

  deleteUser

};