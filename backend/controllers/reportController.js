const Report = require(
  "../models/Report"
);

const {
  analyzeReport,
} = require(
  "../services/aiService"
);

const createReport = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      address,
      latitude,
      longitude,
      reportedBy,
    } = req.body;

    const ai =
      await analyzeReport(
        title,
        description
      );

    const report =
      await Report.create({
        title,
        description,

        imageUrl:
          req.file?.path || "",

        location: {
          type: "Point",
          coordinates: [
            Number(longitude),
            Number(latitude),
          ],
          address,
        },

        status: "pending",

        severity:
          ai.severity,

        reportedBy,

        aiSummary:
          ai.summary,

        aiSolution:
          ai.solution,
      });

    const io =
      req.app.get("io");

    io.emit(
      "reportCreated",
      report
    );

    res.status(201).json(
      report
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

const getReports = async (
  req,
  res
) => {
  try {
    const page =
      Number(
        req.query.page
      ) || 1;

    const limit =
      Number(
        req.query.limit
      ) || 10;

    const search =
      req.query.search ||
      "";

    const status =
      req.query.status;

    const severity =
      req.query.severity;

    const query = {
      isDeleted: false,
    };

    if (search) {
      query.$or = [
        {
          title: {
            $regex:
              search,
            $options:
              "i",
          },
        },
        {
          description: {
            $regex:
              search,
            $options:
              "i",
          },
        },
      ];
    }

    if (status) {
      query.status =
        status;
    }

    if (severity) {
      query.severity =
        severity;
    }

    const reports =
      await Report.find(
        query
      )
        .sort({
          createdAt: -1,
        })
        .skip(
          (page - 1) *
            limit
        )
        .limit(limit);

    const total =
      await Report.countDocuments(
        query
      );

    res.json({
      reports,
      currentPage:
        page,
      totalPages:
        Math.ceil(
          total / limit
        ),
      total,
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message,
    });
  }
};

const getSingleReport =
  async (
    req,
    res
  ) => {
    try {
      const report =
        await Report.findById(
          req.params.id
        );

      if (!report) {
        return res
          .status(404)
          .json({
            message:
              "Report not found",
          });
      }

      res.json(report);
    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };

const updateReportStatus =
async(req,res)=>{

try{

const report =

await Report.findByIdAndUpdate(

req.params.id,

{
status:
req.body.status
},

{
new:true
}

)

const io =
req.app.get("io")

io.emit(

"reportStatusUpdated",

report

)

res.json(report)

}catch(error){

res.status(500)

.json({

message:
error.message

})

}

}

const deleteReport =
async(req,res)=>{

try{

await Report.findByIdAndUpdate(

req.params.id,

{
isDeleted:true
}

)

const io =
req.app.get("io")

io.emit(

"reportDeleted",

req.params.id

)

res.json({

message:
"Deleted"

})

}catch(err){

res.status(500)

.json({

message:
err.message

})

}

}

module.exports = {
  createReport,
  getReports,
  getSingleReport,
  updateReportStatus,
  deleteReport,
};