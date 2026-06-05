const Report =
require("../models/Report")

const getDashboardStats =
async(req,res)=>{

try{

const totalReports=
await Report.countDocuments()

const pendingReports=
await Report.countDocuments({

status:"Pending"

})

const investigatingReports=
await Report.countDocuments({

status:"Investigating"

})

const resolvedReports=
await Report.countDocuments({

status:"Resolved"

})

const highSeverityReports=
await Report.countDocuments({

severity:"High"

})

const recentReports=

await Report.find()

.sort({

createdAt:-1

})

.limit(5)

const reports=

await Report.find()

const grouped={}

reports.forEach((report)=>{

const date=

new Date(

report.createdAt

).toLocaleDateString()

grouped[date]=

(grouped[date]||0)+1

})

const reportsOverTime=

Object.entries(

grouped

).map(

([date,reports])=>({

date,

reports

})

)

res.json({

totalReports,

pendingReports,

investigatingReports,

resolvedReports,

highSeverityReports,

recentReports,

reportsOverTime

})

}catch(error){

res.status(500).json({

message:error.message

})

}

}

module.exports={

getDashboardStats

}