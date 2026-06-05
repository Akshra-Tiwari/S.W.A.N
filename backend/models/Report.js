const mongoose = require("mongoose");

const reportSchema =
new mongoose.Schema(

{

title:{

type:String,

required:true,

trim:true,

maxlength:120,

},

description:{

type:String,

required:true,

trim:true,

maxlength:2000,

},

category:{

type:String,

enum:[

"Sewage",

"Garbage",

"Chemical",

"Algae",

"Dead Fish",

"Other"

],

default:"Other"

},

imageUrl:{

type:String,

default:""

},

location:{

type:{

type:String,

enum:["Point"],

default:"Point"

},

coordinates:{

type:[Number],

default:[0,0]

},

address:String

},

severity:{

type:String,

enum:[

"Low",

"Medium",

"High"

],

default:"Low"

},

status:{

type:String,

enum:[

"Pending",

"Investigating",

"Resolved"

],

default:"Pending"

},

reportedBy:{

type:

mongoose.Schema.Types.ObjectId,

ref:"User"

},

aiSummary:{

type:String,

default:""

},

aiSolution:{

type:String,

default:""

},

verified:{

type:Boolean,

default:false

},

isDeleted:{

type:Boolean,

default:false

}

},

{

timestamps:true

}

)

reportSchema.index({

location:"2dsphere"

})

module.exports=

mongoose.model(

"Report",

reportSchema

)